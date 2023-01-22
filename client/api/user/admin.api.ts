import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiAdmin, ApiProduct } from '../entities'
import { FormAdmin } from '../forms'

export const CreateAdmin = (admin: FormAdmin): RequestReturnType<ApiAdmin> => {
  return request.post('/user/admin', { ...admin })
}

export const GetMeAdmin = (): RequestReturnType<ApiAdmin> => {
  return request.get('/user/admin/me')
}

export const UpdateMeAdmin = (
  adminId: string,
  updates: {
    name: string
    lastName: string
    phoneNumber: number
  }
): RequestReturnType<ApiAdmin> => {
  return request.patch('/user/admin/' + adminId, { ...updates })
}
