import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { TodoSchema } from '../models/Todo'
import { ValueSchema } from '../models/Value'

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Todos = mongoose.model('Todo', TodoSchema)
}

export const dbContext = new DbContext()
