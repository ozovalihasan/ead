import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import style from 'react-flow-renderer/dist/style.css';
import style2 from 'react-flow-renderer/dist/theme-default.css';
import './reset.css';
import './index.css';

style
style2
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
