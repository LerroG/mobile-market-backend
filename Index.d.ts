import * as express from 'express-serve-static-core'
import * as jwt from 'jsonwebtoken'

declare global {
	namespace Express {
		interface Request {
			userId: string
		}
	}
}

declare module 'jsonwebtoken' {
  export interface UserIDJwtPayload extends jwt.JwtPayload {
      id: string
  }
}
