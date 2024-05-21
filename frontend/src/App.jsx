import { RouterProvider } from 'react-router-dom'; 
import { router } from './router/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <div style={{overflow:"hidden"}}>
      <RouterProvider router={router}/>
        <ToastContainer />
    </div>
  );
}

export default App;
