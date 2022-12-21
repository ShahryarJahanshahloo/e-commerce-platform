import { Schema, Model } from 'mongoose'

import User, { discriminatorKey, IUser, IUserMethods, ADMIN_ROLE } from './user'

interface IAdmin extends IUser {}
interface IAdminMethods extends IUserMethods {}
interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {}

const AdminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {},
  { discriminatorKey }
)

const Admin = User.discriminator(ADMIN_ROLE, AdminSchema)

export default Admin
