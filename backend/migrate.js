const fs = require('fs')
const path = require('path')
const { sequelize, User, Enrollment, Contact, Resource, Gallery } = require('./db')

const DATA_DIR = path.join(__dirname, 'data')
const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, file), 'utf8'))
  } catch (e) {
    return []
  }
}

async function migrate() {
  console.log('Starting migration to SQLite...')
  
  await sequelize.sync({ force: true }) // WARNING: Drops existing tables
  
  const users = readJson('users.json')
  for (const u of users) {
    await User.create({
      id: u.id,
      name: u.name,
      email: u.email,
      password: u.password,
      role: u.role,
      studentEmail: u.studentEmail,
      createdAt: u.createdAt
    })
  }
  console.log(`Migrated ${users.length} users.`)

  const enrollments = readJson('enrollments.json')
  for (const e of enrollments) {
    await Enrollment.create({
      id: e.id,
      parentName: e.parentName,
      parentEmail: e.parentEmail,
      parentPhone: e.parentPhone,
      learnerName: e.learnerName,
      learnerGrade: e.learnerGrade,
      programme: e.programme,
      packageInterest: e.packageInterest,
      notes: e.notes,
      status: e.status,
      createdAt: e.createdAt
    })
  }
  console.log(`Migrated ${enrollments.length} enrollments.`)

  const contacts = readJson('contacts.json')
  for (const c of contacts) {
    await Contact.create({
      id: c.id,
      name: c.name,
      email: c.email,
      organisation: c.organisation,
      interest: c.interest,
      message: c.message,
      createdAt: c.createdAt
    })
  }
  console.log(`Migrated ${contacts.length} contacts.`)

  const resources = readJson('resources.json')
  for (const r of resources) {
    await Resource.create({
      id: r.id,
      title: r.title,
      description: r.description,
      filename: r.filename,
      originalName: r.originalName,
      mimetype: r.mimetype,
      size: r.size,
      url: r.url,
      createdAt: r.createdAt
    })
  }
  console.log(`Migrated ${resources.length} resources.`)

  const gallery = readJson('gallery.json')
  for (const g of gallery) {
    await Gallery.create({
      id: g.id,
      caption: g.caption,
      filename: g.filename,
      originalName: g.originalName,
      mimetype: g.mimetype,
      type: g.type,
      size: g.size,
      url: g.url,
      createdAt: g.createdAt
    })
  }
  console.log(`Migrated ${gallery.length} gallery items.`)

  console.log('Migration complete!')
  process.exit(0)
}

migrate().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})
