import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/fonts.css'
import {HomePage,NotFoundPage,Projects} from './pages'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/projects",
    element:<Projects/>
  },

  {
    path:"*",
    element:<NotFoundPage/>
  }
])


createRoot(document.getElementById('root')).render(
  <RouterProvider  router={router}/>
)
