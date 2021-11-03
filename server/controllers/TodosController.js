import { todosService } from '../services/TodosService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TodosController extends BaseController {
  constructor() {
    super('api/todos')
    this.router
      .get('', this.getAllTodos)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTodo)
      .delete('/:id', this.deleteTodo)
  }

  async getAllTodos(req, res, next) {
    try {
      res.send(await todosService.getAllTodos(req.query))
    } catch (error) {
      next(error)
    }
  }

  async createTodo(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      res.send(await todosService.createTodo(req.body))
    } catch (error) {
      next(error)
    }
  }

  async deleteTodo(req, res, next) {
    try {
      res.send(await todosService.delete(req.params.id, req.userInfo.id))
    } catch (error) {
      next(error)
    }
  }
}
