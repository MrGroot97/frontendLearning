import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// add portal div also to the body
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
const portalRoot = document.createElement('div');
portalRoot.id = 'portal';
document.body.appendChild(portalRoot);


