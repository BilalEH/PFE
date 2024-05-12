
import { Outlet } from 'react-router-dom'
import Heading from '../components/Heading'
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
