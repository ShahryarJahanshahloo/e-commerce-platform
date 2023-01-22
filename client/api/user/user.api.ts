import { RequestReturnType } from '../../hooks/useRequest'
import request from '../axios'
import { ApiUser } from '../entities'
import { FormSignUpCreds } from '../forms'

export const Login = (creds: FormSignUpCreds): RequestReturnType<ApiUser> => {
  return request.post('/user/login', { ...creds })
}

export const Logout = (): RequestReturnType<ApiUser> => {
  return request.post('/user/logout')
}

export const LogoutAll = (): RequestReturnType<ApiUser> => {
  return request.post('/user/logout/all')
}
