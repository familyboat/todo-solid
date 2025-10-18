import { TransitionGroup } from 'solid-transition-group'
import styles from './index.module.css'
import './index.css'
import { For, onMount } from 'solid-js'
import { isCreated, isDeleted, isDone, loadFromDb, todosStore } from '@/stores/todo'
import TodoItem from '../todoItem'

export default function TodoList() {
  onMount(() => {
    loadFromDb()
  })

  return (
    <>
      <ul class={styles.list}>
        <TransitionGroup name="fade-todo">
          <header>已创建：</header>
          <For each={todosStore.todos.filter((todo) => isCreated(todo))}>
            {(todo, index) => <TodoItem index={index()} todo={todo} />}
          </For>
          <hr />

          <header>已完成：</header>
          <For each={todosStore.todos.filter((todo) => isDone(todo))}>
            {(todo, index) => <TodoItem index={index()} todo={todo} />}
          </For>
          <hr />

          <header>已删除：</header>
          <For each={todosStore.todos.filter((todo) => isDeleted(todo))}>
            {(todo, index) => <TodoItem index={index()} todo={todo} />}
          </For>
          <hr />
        </TransitionGroup>{' '}
      </ul>
    </>
  )
}
