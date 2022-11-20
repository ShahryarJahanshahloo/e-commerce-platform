import { Schema } from 'mongoose'

import User from './user'
import { discriminatorKey } from './user'

const Seller = User.discriminator(
  'Seller',
  new Schema({}, { discriminatorKey })
)

export default Seller
