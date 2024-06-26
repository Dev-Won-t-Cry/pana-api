import { sign } from 'jsonwebtoken'
import authConfig from '../config/authConfig'

const generateToken = (params = {}) =>
	sign(params, String(authConfig.secret), {
		expiresIn: authConfig.expiresIn,
		algorithm: 'HS512',
	})

export default generateToken
