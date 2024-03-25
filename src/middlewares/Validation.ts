/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'

class Validation {
	validate =
		(schema: any) =>
		async (req: Request, res: Response, next: NextFunction) => {
			const { body } = req

			try {
				await schema.validate(body)
				return next()
			} catch (error) {
				console.log(error)
				return res.status(400).json({ error })
			}
		}

	validateSpecificField =
		(field: any, schema: any) =>
		async (req: Request, res: Response, next: NextFunction) => {
			const val = req.body[field]

			try {
				await schema.validate(val)
				return next()
			} catch (error) {
				console.log(error)
				return res.status(400).json({ error })
			}
		}
}

export default Validation
