import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { App } from '@/components'
import './index.css';
import { setColorVariants } from '@/helpers';

const container = document.getElementById('root');
const root = createRoot(container!)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

if (process.env.NODE_ENV === "production"){
  const head = document.getElementsByTagName("head")[0]
  const links = head.querySelectorAll('[rel="stylesheet"]')
  Object.values(links).forEach((link) =>  head.append(link))
}

setColorVariants()