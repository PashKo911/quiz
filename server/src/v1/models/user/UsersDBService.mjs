import User from './User.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'
import RolesDBService from '../role/RolesDBService.mjs'

class UsersDBService extends MongooseCRUDManager {
	async getUsersWithCompletedAttempts() {
		try {
			return await User.aggregate([
				{
					$lookup: {
						from: 'quizattempts',
						let: { userId: '$_id' },
						pipeline: [
							{
								$match: {
									$expr: {
										$and: [{ $eq: ['$userId', '$$userId'] }, { $eq: ['$status', 'completed'] }],
									},
								},
							},
							{ $unwind: '$answers' },
							{
								$lookup: {
									from: 'questions',
									let: { qid: '$answers.question' },
									pipeline: [
										{
											$match: {
												$expr: { $eq: ['$_id', '$$qid'] },
											},
										},
										{
											$project: {
												text: 1,
												_id: 0,
											},
										},
									],
									as: 'questionData',
								},
							},
							{
								$addFields: {
									'answers.question': { $arrayElemAt: ['$questionData.text', 0] },
								},
							},
							{
								$addFields: {
									answers: {
										$mergeObjects: ['$$ROOT.answers', { question: '$answers.question' }],
									},
								},
							},
							{
								$project: {
									questionData: 0,
									'answers.selectedOptionId': 0,
								},
							},
							{
								$group: {
									_id: '$_id',
									userId: { $first: '$userId' },
									startedAt: { $first: '$startedAt' },
									answers: { $push: '$answers' },
								},
							},
						],
						as: 'attempts',
					},
				},
				{
					$lookup: {
						from: 'roles',
						localField: 'role',
						foreignField: '_id',
						as: 'role',
					},
				},
				{ $unwind: { path: '$role', preserveNullAndEmptyArrays: true } },
				{
					$project: {
						password: 0,
					},
				},
			])
		} catch (err) {
			console.error('UsersDBService.getUsersWithCompletedAttempts:', err)
			throw err
		}
	}
	async findOne(filters) {
		try {
			const res = await super.findOne(filters, {}, ['role'])
			return res
		} catch (error) {
			throw new Error('Error finding data by id: ' + error.message)
		}
	}
	async createAndReturnUser(data) {
		try {
			const user = await super.create(data)
			const role = await RolesDBService.getById(user.role)
			user.role = role
			return user
		} catch (error) {
			throw new Error('Error create user: ' + error.message)
		}
	}
	async deleteById(id) {
		try {
			return await User.deleteOne({ _id: id }).exec()
		} catch (error) {
			throw new Error('Error deleting data: ' + error.message)
		}
	}
}

export default new UsersDBService(User)
