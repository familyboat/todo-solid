import {
  addTodoToDb,
  editTaskInTodoInDb,
  getAllTodosFromDb,
  markTodoAsCreatedInDb,
  markTodoAsDeletedInDb,
  markTodoAsDoneInDb,
} from '@/db/todo'
import { createStore, produce } from 'solid-js/store'

/**
 * 日期的字符串形式，时区用 UTC。
 */
type DateString = string

export enum TodoStatus {
  /**
   * 已创建
   */
  'created',
  /**
   * 已完成
   */
  'done',
  /**
   * 已删除
   */
  'deleted',
}

/**
 * 对 UTC 值序列化
 */
export function serializeUTC(utc: string) {
  return new Date(utc).toLocaleString()
}

/**
 * 标明 todo 的状态是否为：已完成
 */
export function isDone(todo: Todo) {
  return todo.status === TodoStatus.done
}

/**
 * 标明 todo 的状态是否为：已删除
 */
export function isDeleted(todo: Todo) {
  return todo.status === TodoStatus.deleted
}

/**
 * 标明 todo 的状态是否为：已创建
 */
export function isCreated(todo: Todo) {
  return todo.status === TodoStatus.created
}

/**
 * 描述 todo 的属性结构
 */
export interface Todo {
  /**
   * 待处理的任务
   */
  task: string
  /**
   * 标明该任务的状态：已创建、已完成、已删除
   *
   * 以下状态变化是合理的：
   * 1. 已创建 -> 已完成
   * 2. 已创建 -> 已删除
   * 3. 已完成 -> 已删除
   */
  status: TodoStatus
  /**
   * 任务创建的时间
   */
  createdAt: DateString
  /**
   * 任务修改的时间
   *
   * 已完成或已删除的任务不可修改
   */
  modifiedAt: DateString
  /**
   * 任务的唯一编号
   */
  uuid: string
}

const [todosStore, setTodosStore] = createStore<{
  todos: Array<Todo>
}>({
  todos: [],
})

/**
 * 从指派的 task 创建一个新的 todo
 */
function createTodoFrom(task: string) {
  if (task === '') return

  const now = new Date()

  const todo: Todo = {
    task,
    status: TodoStatus.created,
    createdAt: now.toUTCString(),
    modifiedAt: now.toUTCString(),
    uuid: crypto.randomUUID(),
  }

  setTodosStore('todos', (current) => {
    return [...current, todo]
  })

  addTodoToDb(todo)
}

let hasLoaded = false
/**
 * 从数据库中加载 todo 列表
 */
async function loadFromDb() {
  if (hasLoaded) return

  const _todoList = await getAllTodosFromDb()
  hasLoaded = true
  setTodosStore('todos', () => {
    return _todoList
  })
}

/**
 * 将已完成的 todo 的状态修改为 done
 */
function markTodoAsDone(uuid: string) {
  const index = todosStore.todos.findIndex((todo) => todo.uuid === uuid)
  if (index !== -1) {
    setTodosStore(
      'todos',
      index,
      produce((todo) => {
        todo.status = TodoStatus.done
      })
    )
    markTodoAsDoneInDb(uuid)
  }
}

/**
 * 将已删除的 todo 的状态修改为 deleted
 */
function markTodoAsDeleted(uuid: string) {
  const index = todosStore.todos.findIndex((todo) => todo.uuid === uuid)
  if (index !== -1) {
    setTodosStore(
      'todos',
      index,
      produce((todo) => {
        todo.status = TodoStatus.deleted
      })
    )
    markTodoAsDeletedInDb(uuid)
  }
}

/**
 * 将回退为已创建的 todo 的状态修改为 created
 */
function markTodoAsCreated(uuid: string) {
  const index = todosStore.todos.findIndex((todo) => todo.uuid === uuid)
  if (index !== -1) {
    setTodosStore(
      'todos',
      index,
      produce((todo) => {
        todo.status = TodoStatus.created
      })
    )
    markTodoAsCreatedInDb(uuid)
  }
}

/**
 * 对 todo 的 task 进行编辑
 */
function editTaskInTodo(uuid: string, task: string) {
  const index = todosStore.todos.findIndex((todo) => todo.uuid === uuid)
  const target = { ...todosStore.todos[index] }
  if (target && target.task !== task) {
    const now = new Date()
    target.task = task
    target.modifiedAt = now.toUTCString()
    setTodosStore(
      'todos',
      index,
      produce((todo) => {
        todo.task = task
        todo.modifiedAt = now.toUTCString()
      })
    )
    editTaskInTodoInDb(target)
  }
}

export {
  todosStore,
  createTodoFrom,
  loadFromDb,
  markTodoAsCreated,
  markTodoAsDeleted,
  markTodoAsDone,
  editTaskInTodo,
}
