
import { Outlet } from 'react-router-dom'
import Heading from '../components/Heading'

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
