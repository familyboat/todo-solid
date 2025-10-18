import { A } from '@solidjs/router'
import { routerConfig } from '../../configs'

export default function Home() {
  return (
    <>
      <section>
        <header>
          我在做一个 todo 相关的应用，计划使用以下六款前端 UI 框架分别搭建一次：
          <ul>
            <li>
              <a href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
                vue js
              </a>
            </li>
            <li>
              <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer">
                angular
              </a>
            </li>
            <li>
              <a href="https://preactjs.com/" target="_blank" rel="noopener noreferrer">
                preact
              </a>
            </li>
            <li>
              <a href="https://svelte.dev/" target="_blank" rel="noopener noreferrer">
                svelte
              </a>
            </li>
            <li>
              <a href="https://www.solidjs.com/" target="_blank" rel="noopener noreferrer">
                solid js
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
                react
              </a>
            </li>
          </ul>
        </header>

        <main>
          <p>本应用采用的 UI 框架是 solid js；外加 vite + @solidjs/router + indexed db。</p>
          <p>
            本应用采用 indexed db
            作为数据存储方案，既数据保存在用户侧；本应用没有对用户的任何行为做任何形式的记录。
          </p>
          <p>
            免责声明：编写本应用只是为了学习 solid js
            及其生态，不保证本应用在任何情况下均能正常运行。
          </p>
          <p>
            <A href={routerConfig.ToDoPath}>前往 to-do 应用</A>
          </p>
          <p>
            本应用的源码托管在 Github 上，前往
            <a
              href="https://github.com/familyboat/todo-solid/"
              target="_blank"
              rel="noopener noreferrer"
            >
              仓库地址
            </a>
            ，本应用的源码采用的是 MIT 开源协议。
          </p>
        </main>
      </section>
    </>
  )
}
