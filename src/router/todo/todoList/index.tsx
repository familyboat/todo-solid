import styles from './index.module.css'
import { For, onMount } from 'solid-js'
import { isCreated, isDeleted, isDone, loadFromDb, todosStore } from '@/stores/todo'
import TodoItem from '../todoItem'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

export default function TodoList() {
  onMount(() => {
    loadFromDb()
  })

  const createdTodos = () => {
    return todosStore.todos.filter((todo) => isCreated(todo))
  }

  const doneTodos = () => {
    return todosStore.todos.filter((todo) => isDone(todo))
  }

  const deletedTodos = () => {
    return todosStore.todos.filter((todo) => isDeleted(todo))
  }

  const [parent] = createAutoAnimate()

  return (
    <>
      <ul class={styles.list} ref={parent}>
        <header>已创建：</header>
        <For each={createdTodos()}>{(todo, index) => <TodoItem index={index()} todo={todo} />}</For>
        <hr />

        <header>已完成：</header>
        <For each={doneTodos()}>{(todo, index) => <TodoItem index={index()} todo={todo} />}</For>
        <hr />

        <header>已删除：</header>
        <For each={deletedTodos()}>{(todo, index) => <TodoItem index={index()} todo={todo} />}</For>
        <hr />
      </ul>
    </>
  )
}
