import QuizAttempt from './QuizAttempt.mjs'

import MongooseCRUDManager from '../MongooseCRUDManager.mjs'

class QuestionDBService extends MongooseCRUDManager {}

export default new QuestionDBService(QuizAttempt)
