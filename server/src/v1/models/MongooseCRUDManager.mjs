class MongooseCRUDManager {
	constructor(model) {
		this.model = model
	}

	addPopulationOptions(query, populateFields) {
		populateFields.forEach((field) => {
			if (typeof field === 'string') {
				query = query.populate(field)
			} else if (typeof field === 'object' && field.fieldForPopulation) {
				if (typeof field.fieldForPopulation === 'object') query = query.populate(field.fieldForPopulation)
				else query = query.populate(field.fieldForPopulation, field.requiredFieldsFromTargetObject)
			}
		})
	}

	async getList(filters = {}, projection = null, populateFields = []) {
		try {
			let query = this.model.find(filters, projection)
			this.addPopulationOptions(query, populateFields)
			const results = await query.exec()
			return results.map((doc) => doc.toObject())
		} catch (error) {
			throw new Error('Error retrieving data: ' + error.message)
		}
	}

	async create(data) {
		try {
			const newItem = new this.model(data)
			return await newItem.save()
		} catch (error) {
			throw new Error('Error creating data: ' + error.message)
		}
	}

	async getById(id, projection = null, populateFields = []) {
		try {
			let query = this.model.findById(id, projection)
			populateFields.forEach((field) => {
				query = query.populate(field)
			})
			const res = await query.exec()
			return res
		} catch (error) {
			throw new Error('Error finding data by id: ' + error.message)
		}
	}

	async findOne(filters = {}, projection = null, populateFields = []) {
		try {
			let query = this.model.findOne(filters, projection)
			populateFields.forEach((field) => {
				if (typeof field === 'string') {
					query = query.populate(field)
				} else if (
					typeof field === 'object' &&
					field.fieldForPopulation &&
					field.requiredFieldsFromTargetObject
				) {
					query = query.populate(field.fieldForPopulation, field.requiredFieldsFromTargetObject)
				}
			})
			return await query.exec()
		} catch (error) {
			throw new Error('Error finding data by id: ' + error.message)
		}
	}
	async update(id, data) {
		try {
			return await this.model.findByIdAndUpdate(id, data, { new: true, runValidators: true }).exec()
		} catch (error) {
			throw new Error('Error updating data: ' + error.message)
		}
	}

	async deleteById(id) {
		try {
			return await this.model.findByIdAndDelete(id).exec()
		} catch (error) {
			throw new Error('Error deleting data: ' + error.message)
		}
	}

	async getRandomDocuments(count = 5, filters = {}, populateFields = []) {
		try {
			let query = this.model.aggregate([
				{ $match: filters },
				{ $sample: { size: count } },
				// { $project: projection },
			])

			this.addPopulationOptions(query, populateFields)

			const results = await query.exec()

			return results
		} catch (error) {
			throw new Error('Error retrieving random data: ' + error.message)
		}
	}
}

export default MongooseCRUDManager
