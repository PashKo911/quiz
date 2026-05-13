import jwt from 'jsonwebtoken'
import config from '../config/default.mjs'

const expiresIn = config.expiredTime
const tokenKey = config.tokenKey

export function parseBearer(bearer, headers) {
	let token
	if (bearer.startsWith('Bearer ')) {
		token = bearer.slice(7)
	}
	try {
		const decoded = jwt.verify(token, prepareSecret(headers))
		return decoded
	} catch (err) {
		throw new Error('Invalid token')
	}
}

export function prepareToken(data, headers) {
	const token = jwt.sign(data, prepareSecret(headers), {
		expiresIn,
	})
	return {
		token,
	}
}

function prepareSecret(headers) {
	return tokenKey + headers['user-agent'] + headers['accept-language']
}
