import User from '../../models/user/user.model'

export const login = async (body: any) => {
  const user = await User.findByCredentials(body.email, body.password)
  if (!user) throw new Error()
  const token = await user.generateAccessToken()
  return { user, token }
}

export const authenticate = async (userId: any) => {
  const user = await User.findById(userId)
  if (user === null) throw new Error()
  return user
}

export const logout = async (userId: any, currentToken: any) => {
  const user = await User.findById(userId)
  if (user == null) throw new Error()
  user.tokens = user.tokens.filter(token => {
    return token.token != currentToken
  })
  await user.save()
  return user
}

export const logoutAll = async (userId: any) => {
  const user = await User.findById(userId)
  if (user == null) throw new Error()
  user.tokens = []
  await user.save()
  return user
}
