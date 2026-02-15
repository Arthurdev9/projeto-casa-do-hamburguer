import type { UserPayload } from './types/UserPayload.ts'

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload
    }
  }
}
