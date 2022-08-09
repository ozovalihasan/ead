import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const head = document.getElementsByTagName("head")[0]
const links = head.querySelectorAll('[rel="stylesheet"]')
Object.values(links).forEach((link) =>  head.append(link))