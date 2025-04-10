import UsersDBService from '../models/user/UsersDBService.mjs'
import RolesDBService from '../models/role/RolesDBService.mjs'

class UserController {
	static async getUsersWithAttempts(req, res) {
		try {
			const usersList = await UsersDBService.getUsersWithCompletedAttempts()
			res.status(200).json({
				usersList,
			})
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: error.message })
		}
	}

	static async deleteUser(req, res) {
		try {
			await UsersDBService.deleteById(req.params.id)
			res.status(200).json({ success: true })
		} catch (error) {
			console.error(error)
			res.status(500).json({ success: false, message: 'Failed to delete user' })
		}
	}
}

export default UserController
