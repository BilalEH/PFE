import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <header>
        Header
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
