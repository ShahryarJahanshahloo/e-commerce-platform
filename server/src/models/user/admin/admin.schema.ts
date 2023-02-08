import { Schema } from 'mongoose'
import { discriminatorKey } from '../user.schema'
import { AdminModel, IAdmin, IAdminMethods } from './admin.model'

const AdminSchema = new Schema<IAdmin, AdminModel, IAdminMethods>(
  {},
  { discriminatorKey }
)

export default AdminSchema
