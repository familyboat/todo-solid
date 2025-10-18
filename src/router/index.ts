import { routerConfig } from '../configs'
import Home from './home'
import type { RouteDefinition } from '@solidjs/router'
import Todo from './todo'

export const routes: Array<RouteDefinition> = [
  {
    path: routerConfig.HomePath,
    component: Home,
  },
  {
    path: routerConfig.ToDoPath,
    component: Todo,
  },
]
