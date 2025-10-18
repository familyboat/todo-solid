import { createTodoFrom } from '@/stores/todo'
import { createSignal } from 'solid-js'
import styles from './index.module.css'

export default function TodoForm() {
  const [task, setTask] = createSignal('')

  function createTodo() {
    if (task()) {
      createTodoFrom(task())
      setTask('')
    }
  }

  return (
    <>
      <div class={styles.form}>
        <input
          type="text"
          placeholder="请输入任务内容"
          value={task()}
          onInput={(e) => {
            setTask(e.target.value)
          }}
        />
        <button type="button" onClick={createTodo}>
          创建
        </button>
      </div>
    </>
  )
}
