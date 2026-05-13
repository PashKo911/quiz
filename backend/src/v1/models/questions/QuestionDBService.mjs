import Question from './Question.mjs'

import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class QuestionDBService extends MongooseCRUDManager {}

export default new QuestionDBService(Question)
