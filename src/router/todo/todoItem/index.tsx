import {
  editTaskInTodo,
  isCreated,
  isDeleted,
  isDone,
  markTodoAsCreated,
  markTodoAsDeleted,
  markTodoAsDone,
  serializeUTC,
  type Todo,
} from '@/stores/todo'
import styles from './index.module.css'
import { createSignal, Show } from 'solid-js'

export default function TodoItem(props: { index: number; todo: Todo }) {
  const todo = props.todo

  const [isEditing, setEditing] = createSignal(false)
  const [task, setTask] = createSignal(todo.task)

  function done() {
    markTodoAsDone(todo.uuid)
  }

  function deleted() {
    markTodoAsDeleted(todo.uuid)
  }

  function undo() {
    markTodoAsCreated(todo.uuid)
  }

  function flipEditingStatus() {
    setEditing(!isEditing())

    if (isEditing() === false && task() !== todo.task) {
      editTaskInTodo(todo.uuid, task())
    }
  }

  return (
    <>
      <li class={styles.item}>
        <span>{props.index}</span>
        <Show when={!isEditing()}>
          <span
            classList={{
              [styles.done]: isDone(todo),
              [styles.deleted]: isDeleted(todo),
            }}
          >
            {todo.task}
          </span>
        </Show>
        <Show when={isEditing()}>
          <input
            type="text"
            value={task()}
            onInput={(e) => {
              setTask(e.target.value)
            }}
          />
        </Show>
        <span>创建于 {serializeUTC(todo.createdAt)}</span>
        <Show when={isCreated(todo) && !isEditing()}>
          <button type="button" onClick={done}>
            完成
          </button>
        </Show>
        <Show when={isCreated(todo) && !isEditing()}>
          <button type="button" onClick={deleted}>
            删除
          </button>
        </Show>
        <Show when={!isCreated(todo)}>
          <button type="button" onClick={undo}>
            回退
          </button>
        </Show>
        <Show when={isCreated(todo)}>
          <button type="button" onClick={flipEditingStatus}>
            {isEditing() ? '确认' : '编辑'}
          </button>
        </Show>
      </li>
    </>
  )
}
