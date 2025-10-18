import { A, useIsRouting, type RouteSectionProps } from '@solidjs/router'
import './App.css'
import { routerConfig } from './configs'
import { Show, type Component } from 'solid-js'
import { Transition } from 'solid-transition-group'

const App: Component<RouteSectionProps> = (props) => {
  const isRouting = useIsRouting()

  return (
    <>
      <main class="app">
        <nav class="nav">
          <A href={routerConfig.HomePath}> home </A>
          <A href={routerConfig.ToDoPath}> to-do </A>
        </nav>

        <article class="article">
          <Transition name="fade" mode="outin">
            <Show when={isRouting() ? null : true}>
              <div>{props.children}</div>
            </Show>
          </Transition>
        </article>
      </main>
    </>
  )
}

export default App
