import bcrypt from 'bcryptjs'
import prismaClient from '../src/database'
	; (async function main() {
		try {
			const defaultPassword = '12345678aA'

			try {
				const user = await prismaClient.user.create({
					data: {
						name: 'Pana Admin',
						email: 'admin@pana.com',
						password: bcrypt.hashSync(defaultPassword, 10),
					},
				})

				if (user) console.log('Admin created successfully!')
			} catch (e) {
				console.log('Admin already exists!')
			}
		} catch (e) {
			console.log(e)
			process.exit(1)
		} finally {
			await prismaClient.$disconnect()
		}
	})()
