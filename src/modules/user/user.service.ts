/* eslint-disable camelcase */
/* eslint-disable prefer-destructuring */
import { User } from '@prisma/client'
import { decode } from 'jsonwebtoken'
import prismaClient from '../../database/index'

interface headersToken {
	id: string
}

class UserService {
	async findByPk(id: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({
			where: {
				id,
			}
		})

		return user
	}

	async findUser(authorization: string | undefined): Promise<User | null> {
		const [, headers] = authorization?.split(' ') || ''
		const token = decode(headers) as headersToken

		const user = await this.findByPk(token.id)

		return user
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({
			where: { email }
		})

		return user
	}

	async findByToken(token: string): Promise<User | null> {
		const user = await prismaClient.user.findUnique({
			where: { password_reset_token: token },
		})

		return user
	}
}

export default UserService
