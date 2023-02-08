import Admin from '../../models/user/admin/admin.model'
import { updateByValidKeys } from '../../utils/common'

export const create = async (body: any) => {
  const admin = new Admin(body)
  await admin.save()
  await admin.generateAccessToken()
  return admin
}

export const findById = async (userId: any) => {
  const admin = await Admin.findById(userId)
  if (admin == null) throw new Error()
  return admin
}

export const findAndUpdate = async (adminId: any, updates: any) => {
  const admin = await Admin.findById(adminId)
  if (admin === null) throw new Error()
  await updateByValidKeys(admin, updates, ['name', 'lastName', 'phoneNumber'])
  return admin
}
