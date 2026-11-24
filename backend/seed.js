require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const { hashPassword } = require('./routes/auth');

const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to DB');

  await User.deleteMany({});

  const users = [
    {
      name: 'Super Admin',
      email: 'admin@company.com',
      password: hashPassword('admin123'),
      role: 'superadmin',
      department: 'Executive',
      phone: '123'
    },
    {
      name: 'Jhon',
      email: 'jhon@company.com',
      password: hashPassword('user123'),
      role: 'employee',
      department: 'Engineering',
      phone: '456'
    },
    {
      name: 'smith',
      email: 'smith@company.com',
      password: hashPassword('user123'),
      role: 'employee',
      department: 'Marketing',
      phone: '789'
    }
  ];

  await User.insertMany(users);
  console.log('Database seeded successfully:');
  console.log('- admin@company.com / admin123 (superadmin)');
  console.log('- a@company.com / user123 (employee)');
  console.log('- b@company.com   / user123 (employee)');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
