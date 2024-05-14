
import { Outlet, useNavigate } from 'react-router-dom'
import Heading from '../components/Heading'
import "./style/layout.css"
import { useEffect } from 'react';
import useAuthContext from '../api/auth';
export const StyleToast = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export default function Layout() {
  const navigate = useNavigate();
  const { importUser } = useAuthContext();
  useEffect(() => {
    const userTest = importUser();
    if (userTest) {
        if (userTest.role === 'admin') {
            navigate('/admin');
        } else if (userTest.role === 'student') {
            navigate('/student');
        } else if (userTest.role === 'teacher') {
            navigate('/teacher');
        } else if (userTest.role === 'parent') {
            navigate('/parent');
        }
    }
}, []);


  return (
    <div>
      <header>
        <Heading></Heading>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      {/* <footer>
        Footer
      </footer> */}
    </div>
  )
}
