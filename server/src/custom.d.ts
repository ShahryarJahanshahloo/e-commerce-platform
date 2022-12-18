declare global {
  namespace Express {
    export interface Request {
      user?: any
      token?: string
    }
  }
}

export {}
