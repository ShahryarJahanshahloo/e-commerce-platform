import { Schema } from 'mongoose'

import User from './user'
import { discriminatorKey } from './user'

const Customer = User.discriminator(
  'Customer',
  new Schema({}, { discriminatorKey })
)

export default Customer
