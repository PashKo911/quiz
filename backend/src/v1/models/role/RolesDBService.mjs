import Role from './Role.mjs'
import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class RolesDBService extends MongooseCRUDManager {}

export default new RolesDBService(Role)
