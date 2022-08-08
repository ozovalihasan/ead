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

const links = document.getElementsByTagName("link")
const link = links[links.length - 1]
const head = document.getElementsByTagName("head")[0]

head.append(link)