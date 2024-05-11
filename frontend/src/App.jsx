// import { RouterProvider } from 'react-router-dom'
// import { router } from './router/index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer/>
    </>
  )
}

export default App
