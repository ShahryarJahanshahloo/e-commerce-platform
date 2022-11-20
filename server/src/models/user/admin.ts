import { Schema } from 'mongoose'

import User from './user'
import { discriminatorKey } from './user'

const Admin = User.discriminator('Admin', new Schema({}, { discriminatorKey }))

export default Admin
