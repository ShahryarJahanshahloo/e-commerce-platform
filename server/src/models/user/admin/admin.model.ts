import { Model } from 'mongoose'
import User, { IUser, IUserMethods, userRoles } from '../user.model'
import AdminSchema from './admin.schema'

export interface IAdmin extends IUser {}
export interface IAdminMethods extends IUserMethods {}
export interface AdminModel extends Model<IAdmin, {}, IAdminMethods> {}

const Admin = User.discriminator(userRoles.Admin, AdminSchema)

export default Admin
