import styles from './index.module.css'
import { For, onMount, Show } from 'solid-js'
import { isCreated, isDeleted, isDone, loadFromDb, todosStore } from '@/stores/todo'
import TodoItem from '../todoItem'
import { createAutoAnimate } from '@formkit/auto-animate/solid'

export default function TodoList() {
  onMount(() => {
    // 0.3 秒的转场动画会影响这里的列表动画，因此延迟加载数据
    setTimeout(loadFromDb, 350)
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
        <Show when={todosStore.todos.length > 0}>
          <header>已创建：</header>
          <For each={createdTodos()}>
            {(todo, index) => <TodoItem index={index()} todo={todo} />}
          </For>
          <hr />

          <header>已完成：</header>
          <For each={doneTodos()}>{(todo, index) => <TodoItem index={index()} todo={todo} />}</For>
          <hr />

          <header>已删除：</header>
          <For each={deletedTodos()}>
            {(todo, index) => <TodoItem index={index()} todo={todo} />}
          </For>
          <hr />
        </Show>
      </ul>
    </>
  )
}
