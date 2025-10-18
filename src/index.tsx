/* @refresh reload */
import { render } from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import { HashRouter } from '@solidjs/router'
import { routes } from './router/index.ts'

const root = document.getElementById('root')

render(() => <HashRouter root={App}>{routes}</HashRouter>, root!)
