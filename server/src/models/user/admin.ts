import { Schema, Model } from 'mongoose'

import User, { discriminatorKey, IUser, IUserMethods } from './user'

interface IAdmin {}
interface IAdminMethods extends IUserMethods {}
interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {}

const AdminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {},
  { discriminatorKey }
)

const Admin = User.discriminator('Admin', AdminSchema)

export default Admin
