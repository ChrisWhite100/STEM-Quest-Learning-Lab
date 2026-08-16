const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const multer = require('multer')
const nodemailer = require('nodemailer')
const { sequelize, User, Enrollment, Contact, Resource, Gallery, Payment } = require('./db')

const app = express()
const PORT = process.env.PORT || 3001
const UPLOADS_DIR = path.join(__dirname, 'uploads')
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev'

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true })
}

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
})

async function sendEnrollmentNotification(parentEmail, parentName, learnerName, programme, studentEmail, studentPass, parentPass) {
  const mailOptions = {
    from: process.env.FROM_EMAIL || '"STEM Quest Learning Lab" <noreply@stemquest.co.za>',
    to: parentEmail,
    subject: `Enrollment Approved - Welcome to STEM Quest Learning Lab!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #4f46e5;">Welcome to STEM Quest Learning Lab!</h2>
        <p>Dear <strong>${parentName}</strong>,</p>
        <p>We are excited to inform you that your enrollment application for <strong>${learnerName}</strong> in the <strong>${programme}</strong> programme has been officially <strong style="color: #10b981;">APPROVED</strong>!</p>
        
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border: 1px solid #cbd5e1;">
          <h3 style="margin-top: 0; color: #1e293b;">Your Login Credentials</h3>
          
          <p style="margin-bottom: 5px;"><strong>Parent Account:</strong></p>
          <ul style="margin-top: 5px;">
            <li>Email: <code>${parentEmail}</code></li>
            <li>Temporary Password: <code>${parentPass}</code></li>
          </ul>

          <p style="margin-bottom: 5px;"><strong>Student Account (${learnerName}):</strong></p>
          <ul style="margin-top: 5px;">
            <li>Email: <code>${studentEmail}</code></li>
            <li>Temporary Password: <code>${studentPass}</code></li>
          </ul>
        </div>

        <p>You can now log in to the portal to monitor progress, access learning resources, and manage payments.</p>
        
        <br/>
        <p style="color: #64748b; font-size: 12px;">STEM Quest Learning Lab — Unlocking Potential Through STEM Education</p>
      </div>
    `
  }

  try {
    if (process.env.SMTP_USER) {
      await transporter.sendMail(mailOptions)
      console.log(`[EMAIL SENT] Notification delivered to ${parentEmail}`)
    } else {
      console.log(`[EMAIL NOTIFICATION LOGGED FOR ${parentEmail}]:\n`, mailOptions.html)
    }
  } catch (err) {
    console.error(`[EMAIL ERROR] Failed to send email to ${parentEmail}:`, err.message)
  }
}

// Initialize Sole Admin: thandolwethumagaya@gmail.com
async function initializeDefaultUsers() {
  const salt = bcrypt.genSaltSync(10)
  const adminEmail = 'thandolwethumagaya@gmail.com'

  // Clean legacy demo accounts
  await User.destroy({
    where: {
      email: ['admin@stemquest.com', 'learner@stemquest.com', 'parent@stemquest.com']
    }
  }).catch(() => {})

  const admin = await User.findOne({ where: { email: adminEmail } })
  if (!admin) {
    await User.create({
      id: uuidv4(),
      email: adminEmail,
      password: bcrypt.hashSync('ThandoAdmin2026!', salt),
      role: 'admin',
      name: 'Thandolwethu Magaya'
    })
    console.log(`Sole admin registered: ${adminEmail}`)
  } else if (admin.role !== 'admin') {
    admin.role = 'admin'
    await admin.save()
  }
}

// Setup Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${uuidv4()}${ext}`)
  }
})
const upload = multer({ storage })

app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(UPLOADS_DIR))

// Health
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'STEM Quest Learning Lab API', version: '1.0.0' })
})

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) return res.status(401).json({ error: 'Access denied' })
  
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })
    req.user = user
    next()
  })
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin' && req.user.email.toLowerCase() === 'thandolwethumagaya@gmail.com') {
    next()
  } else {
    res.status(403).json({ error: 'Admin access restricted to thandolwethumagaya@gmail.com' })
  }
}

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ where: { email } })
  
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name }, 
      JWT_SECRET, 
      { expiresIn: '24h' }
    )
    res.json({ 
      token, 
      user: { 
        id: user.id, email: user.email, role: user.role, name: user.name, 
        xp: user.xp, level: user.level 
      } 
    })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.id)
  if (!user) return res.status(404).json({ error: 'User not found' })
  res.json({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
    xp: user.xp,
    level: user.level
  })
})

// Student Gamification Route
app.post('/api/student/xp', authenticateToken, async (req, res) => {
  const { amount } = req.body
  if (req.user.role !== 'student') return res.status(403).json({ error: 'Only students can earn XP' })
  
  const user = await User.findByPk(req.user.id)
  user.xp += parseInt(amount)
  
  // Level calculation logic
  const levels = [
    { threshold: 0, name: 'Explorer' },
    { threshold: 100, name: 'Builder' },
    { threshold: 300, name: 'Inventor' },
    { threshold: 600, name: 'Engineer' },
    { threshold: 1000, name: 'Innovator' },
    { threshold: 2000, name: 'STEM Master' }
  ]
  
  let newLevel = 'Explorer'
  for (let l of levels) {
    if (user.xp >= l.threshold) newLevel = l.name
  }
  user.level = newLevel
  await user.save()
  
  res.json({ xp: user.xp, level: user.level })
})

// Parent Dashboard Route
app.get('/api/parent/child', authenticateToken, async (req, res) => {
  if (req.user.role !== 'parent') return res.status(403).json({ error: 'Access denied' })
  const parent = await User.findByPk(req.user.id)
  if (!parent || !parent.studentEmail) return res.status(404).json({ error: 'No linked child' })
  
  const child = await User.findOne({ 
    where: { email: parent.studentEmail, role: 'student' },
    attributes: ['id', 'name', 'email', 'xp', 'level']
  })
  if (!child) return res.status(404).json({ error: 'Child account not found' })
  
  res.json(child)
})

// Public Forms
app.post('/api/contact', async (req, res) => {
  const { name, email, organisation, interest, message } = req.body || {}
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' })
  }
  const entry = await Contact.create({
    id: uuidv4(),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    organisation: organisation ? String(organisation).trim() : '',
    interest: interest || 'other',
    message: String(message).trim()
  })
  res.status(201).json({ success: true, id: entry.id })
})

app.post('/api/enroll', async (req, res) => {
  const { parentName, parentEmail, parentPhone, learnerName, learnerGrade, programme, packageInterest, notes } = req.body || {}
  if (!parentName || !parentEmail || !parentPhone || !learnerName || !programme) {
    return res.status(400).json({ error: 'Required fields missing. Parent phone number is required.' })
  }

  // Validate 10-digit South African Phone Number
  const cleanedPhone = String(parentPhone).replace(/\s+/g, '')
  const saPhoneRegex = /^(0[1-9]\d{8}|\+27[1-9]\d{8})$/
  if (!saPhoneRegex.test(cleanedPhone)) {
    return res.status(400).json({ error: 'Invalid South African phone number. Must be a 10-digit number starting with 0 (e.g. 0821234567).' })
  }

  const entry = await Enrollment.create({
    id: uuidv4(),
    parentName: String(parentName).trim(),
    parentEmail: String(parentEmail).trim().toLowerCase(),
    parentPhone: cleanedPhone,
    learnerName: String(learnerName).trim(),
    learnerGrade: learnerGrade ? String(learnerGrade).trim() : '',
    programme: String(programme).trim(),
    packageInterest: packageInterest || '',
    notes: notes ? String(notes).trim() : ''
  })
  res.status(201).json({ success: true, id: entry.id })
})

// Admin Routes
app.get('/api/admin/contacts', authenticateToken, requireAdmin, async (_req, res) => {
  res.json(await Contact.findAll())
})

app.get('/api/admin/enrollments', authenticateToken, requireAdmin, async (_req, res) => {
  res.json(await Enrollment.findAll())
})

app.patch('/api/admin/enrollments/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const enrollment = await Enrollment.findByPk(id)
  if (enrollment) {
    const previousStatus = enrollment.status
    enrollment.status = status
    await enrollment.save()
    
    // Auto-create users and send notification on approval
    if (status === 'approved' && previousStatus !== 'approved') {
      const salt = bcrypt.genSaltSync(10)
      const studentEmail = `${enrollment.learnerName.replace(/\s+/g, '').toLowerCase()}@stemquest.co.za`
      const studentPass = 'learner123'
      const parentPass = 'parent123'

      // Create student
      await User.findOrCreate({
        where: { email: studentEmail },
        defaults: {
          id: uuidv4(),
          name: enrollment.learnerName,
          password: bcrypt.hashSync(studentPass, salt),
          role: 'student'
        }
      })
      
      // Create parent
      await User.findOrCreate({
        where: { email: enrollment.parentEmail },
        defaults: {
          id: uuidv4(),
          name: enrollment.parentName,
          password: bcrypt.hashSync(parentPass, salt),
          role: 'parent',
          studentEmail: studentEmail
        }
      })

      // Send email notification to confirmed parent email
      await sendEnrollmentNotification(
        enrollment.parentEmail,
        enrollment.parentName,
        enrollment.learnerName,
        enrollment.programme,
        studentEmail,
        studentPass,
        parentPass
      )
    }
    
    res.json(enrollment)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

app.get('/api/admin/users', authenticateToken, requireAdmin, async (_req, res) => {
  const users = await User.findAll({ 
    where: { role: ['student', 'parent'] },
    attributes: ['id', 'name', 'email', 'role', 'studentEmail', 'createdAt', 'xp', 'level']
  })
  res.json(users)
})

app.post('/api/admin/users', authenticateToken, requireAdmin, async (req, res) => {
  const { name, email, password, role = 'student', studentEmail } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
  
  const existing = await User.findOne({ where: { email } })
  if (existing) return res.status(400).json({ error: 'User already exists' })
  
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  
  const newUser = await User.create({
    id: uuidv4(),
    name,
    email,
    password: hash,
    role,
    studentEmail: role === 'parent' ? studentEmail : undefined
  })
  res.status(201).json({ id: newUser.id, name, email, role, studentEmail: newUser.studentEmail })
})

// Resources
app.post('/api/admin/resources', authenticateToken, requireAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  
  const { title, description } = req.body
  const resource = await Resource.create({
    id: uuidv4(),
    title: title || req.file.originalname,
    description: description || '',
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    size: req.file.size,
    url: `/uploads/${req.file.filename}`
  })
  res.status(201).json(resource)
})

app.get('/api/resources', authenticateToken, async (_req, res) => {
  res.json(await Resource.findAll())
})

app.delete('/api/admin/resources/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params
  const resource = await Resource.findByPk(id)
  if (resource) {
    // Delete file if exists
    const filePath = path.join(UPLOADS_DIR, resource.filename)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    await resource.destroy()
    res.json({ success: true })
  } else {
    res.status(404).json({ error: 'Resource not found' })
  }
})

// Gallery
app.post('/api/admin/gallery', authenticateToken, requireAdmin, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  
  const { caption } = req.body
  const isVideo = req.file.mimetype.startsWith('video/')
  
  const mediaItem = await Gallery.create({
    id: uuidv4(),
    caption: caption || '',
    filename: req.file.filename,
    originalName: req.file.originalname,
    mimetype: req.file.mimetype,
    type: isVideo ? 'video' : 'image',
    size: req.file.size,
    url: `/uploads/${req.file.filename}`
  })
  res.status(201).json(mediaItem)
})

app.get('/api/gallery', async (_req, res) => {
  res.json(await Gallery.findAll({ order: [['createdAt', 'DESC']] }))
})

app.delete('/api/admin/gallery/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params
  const media = await Gallery.findByPk(id)
  if (media) {
    // Delete file if exists
    const filePath = path.join(UPLOADS_DIR, media.filename)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
    await media.destroy()
    res.json({ success: true })
  } else {
    res.status(404).json({ error: 'Media not found' })
  }
})

// Payments
app.post('/api/parent/payments', authenticateToken, upload.single('file'), async (req, res) => {
  if (req.user.role !== 'parent') return res.status(403).json({ error: 'Access denied' })
  if (!req.file) return res.status(400).json({ error: 'Proof of payment required' })
  
  const { amount, reference } = req.body
  const payment = await Payment.create({
    id: uuidv4(),
    userEmail: req.user.email,
    amount,
    reference,
    proofUrl: `/uploads/${req.file.filename}`
  })
  res.status(201).json(payment)
})

app.get('/api/parent/payments', authenticateToken, async (req, res) => {
  if (req.user.role !== 'parent') return res.status(403).json({ error: 'Access denied' })
  const payments = await Payment.findAll({ where: { userEmail: req.user.email }, order: [['createdAt', 'DESC']] })
  res.json(payments)
})

app.get('/api/admin/payments', authenticateToken, requireAdmin, async (_req, res) => {
  const payments = await Payment.findAll({ order: [['createdAt', 'DESC']] })
  res.json(payments)
})

app.patch('/api/admin/payments/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params
  const { status } = req.body
  const payment = await Payment.findByPk(id)
  if (payment) {
    payment.status = status
    await payment.save()
    res.json(payment)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

// Static site data
app.get('/api/data/packages', (_req, res) => res.json(require('./data/packages.json')))
app.get('/api/data/services', (_req, res) => res.json(require('./data/services.json')))
app.get('/api/data/curriculum', (_req, res) => res.json(require('./data/curriculum.json')))
app.get('/api/data/team', (_req, res) => res.json(require('./data/team.json')))

// Start server
sequelize.sync().then(async () => {
  console.log('Database synced.')
  await initializeDefaultUsers()
  app.listen(PORT, () => {
    console.log(`STEM Quest API running on http://localhost:${PORT}`)
  })
}).catch(err => console.error('Database sync failed:', err))
