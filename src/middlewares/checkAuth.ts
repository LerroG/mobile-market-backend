import { Request, Response, NextFunction } from 'express-serve-static-core'
import jwt from 'jsonwebtoken'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
      const decoded = <jwt.UserIDJwtPayload>jwt.verify(token, process.env.JWT_SECRET as string)

      req.userId = decoded.id

      next()
    } catch (error) {
      
    }
  }
}
