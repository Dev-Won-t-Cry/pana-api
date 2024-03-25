/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload, decode } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import generateToken from '../../helpers/generateToken'
import UserService from '../user/user.service'

class AuthController {
	private userService: UserService

	constructor() {
		this.userService = new UserService()
	}

	async login(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body

			const user = await this.userService.findByEmail(email)

			if (user) {
				if (!(await bcrypt.compare(password, user.password)))
					return res.status(400).json({ message: 'Credenciais inválidas.' })

				const newUser = {
					id: user.id,
					email: user.email,
				}

				return res.status(200).json({
					message: 'Login realizado.',
					user,
					token: generateToken(newUser),
				})
			}

			return res.status(200).json({ user })
		} catch (e) {
			console.log(e)

			return res
				.status(500)
				.json({ message: 'Erro ao realizar login na aplicação.' })
		}
	}

	async getUserByToken(req: Request, res: Response): Promise<Response> {
		try {
			const { token } = req.params

			const userInfo = decode(token) as JwtPayload
			const exp = userInfo.exp || 0
			const current = new Date().getTime() / 1000

			if (exp < current)
				return res.status(401).json({ message: 'Token expirado.' })

			const user = await this.userService.findByPk(userInfo.id)

			if (!user)
				return res.status(401).json({ message: 'Erro ao encontrar usuário.' })

			return res.status(200).json({ token, user })
		} catch (e: Error | any) {
			return res
				.status(500)
				.json({ message: 'Erro ao receber dados do usuário.' })
		}
	}
}

export default AuthController
