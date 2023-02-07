import mongoose from 'mongoose'

export default async function startDBConnection() {
  await mongoose.connect('mongodb://SE1-Shop-db/SE1')
  console.log('database connection ready')
}
