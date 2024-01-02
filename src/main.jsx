import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Admin from './companents/admin/Admin'
import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Services from './companents/services1/Services'
import Meeting from './companents/meeting/Meeting.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <div>error try again</div>

  },
  {
    path: '/admin',
    element: <Admin />,
    errorElement: <div>opps' you cant arived this area</div>,
    children: [
      {
        path: '',
        element: <div>empty</div>,
      },
      {
        path: 'services',
        element: <Services/>,
        errorElement: <div>error contant not found</div>
      },
      {
        path: 'meetings',
        element: <Meeting/>,
        errorElement: <div>error contant not found</div>
      }
    ]
  }
])
// DetailsStore.initDetails()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)