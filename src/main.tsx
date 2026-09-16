import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router'
import { DATA } from './helper.tsx'
import App from './App.tsx'

const router = createBrowserRouter([{
  index: true,
  element: <App />,
}, ...DATA] as RouteObject[])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
