import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class TodosService {
  async getAllTodos(query = {}) {
    const todos = await dbContext.Todos.find(query).populate('creator', 'name')
    if (!todos) {
      throw new BadRequest('[GETTODOS] Invalid todos')
    }
    return todos
  }

  async createTodo(body) {
    const todo = await dbContext.Todos.create(body)
    if (!todo) {
      throw new BadRequest('[CreateTODO] Invalid')
    }
    return todo
  }

  async delete(id, userId) {
    // REVIEW FindOneAndDelete and delete allows us to delete by multiple properties while findByIdAndDelete does not
    const todo = await dbContext.Todos.findOneAndDelete({ id: id, creatorId: userId })
    if (!todo) {
      throw new BadRequest('[DeleteTODO] Invalid')
    }
    return 'Deleted'
  }
}

export const todosService = new TodosService()
