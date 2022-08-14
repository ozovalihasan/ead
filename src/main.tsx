import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'
import App from './App'
import './reset.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if (process.env.NODE_ENV === "production"){
  const head = document.getElementsByTagName("head")[0]
  const links = head.querySelectorAll('[rel="stylesheet"]')
  Object.values(links).forEach((link) =>  head.append(link))
}