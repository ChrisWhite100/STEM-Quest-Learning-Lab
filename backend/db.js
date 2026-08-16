const { Sequelize, DataTypes } = require('sequelize')
const path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'data', 'database.sqlite'),
  logging: false
})

const User = sequelize.define('User', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'student' },
  studentEmail: { type: DataTypes.STRING, allowNull: true },
  xp: { type: DataTypes.INTEGER, defaultValue: 0 },
  level: { type: DataTypes.STRING, defaultValue: 'Explorer' }
})

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.STRING, primaryKey: true },
  parentName: { type: DataTypes.STRING },
  parentEmail: { type: DataTypes.STRING },
  parentPhone: { type: DataTypes.STRING },
  learnerName: { type: DataTypes.STRING },
  learnerGrade: { type: DataTypes.STRING },
  programme: { type: DataTypes.STRING },
  packageInterest: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }
})

const Contact = sequelize.define('Contact', {
  id: { type: DataTypes.STRING, primaryKey: true },
  name: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  organisation: { type: DataTypes.STRING },
  interest: { type: DataTypes.STRING },
  message: { type: DataTypes.TEXT }
})

const Resource = sequelize.define('Resource', {
  id: { type: DataTypes.STRING, primaryKey: true },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  filename: { type: DataTypes.STRING },
  originalName: { type: DataTypes.STRING },
  mimetype: { type: DataTypes.STRING },
  size: { type: DataTypes.INTEGER },
  url: { type: DataTypes.STRING }
})

const Gallery = sequelize.define('Gallery', {
  id: { type: DataTypes.STRING, primaryKey: true },
  caption: { type: DataTypes.STRING },
  filename: { type: DataTypes.STRING },
  originalName: { type: DataTypes.STRING },
  mimetype: { type: DataTypes.STRING },
  type: { type: DataTypes.STRING },
  size: { type: DataTypes.INTEGER },
  url: { type: DataTypes.STRING }
})

const Payment = sequelize.define('Payment', {
  id: { type: DataTypes.STRING, primaryKey: true },
  userEmail: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.STRING },
  reference: { type: DataTypes.STRING },
  status: { type: DataTypes.STRING, defaultValue: 'pending' }, // pending, verified, rejected
  proofUrl: { type: DataTypes.STRING }
})

module.exports = {
  sequelize,
  User,
  Enrollment,
  Contact,
  Resource,
  Gallery,
  Payment
}
