import "./App.css"
import Sidebar from "./component/Sidebar"
import { Outlet } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { showLoginModal } from "./action/modal"
import apiHandler from "./api/apiHandler"
import { setIsAuthenticated, setUser } from "./action/auth"
import { setSchedules } from "./action/exercise"
import ModalHandler from "./component/ModalHandler"

function App() {

  const state = useSelector((state) => state)
  const { auth } = state
  const dispatch = useDispatch()

  useEffect(() => {
    if (!auth.isAuthenticated) {
      const fetchAuthStatus = async () => {
        const authStats = await apiHandler('GET', '/auth/stats')
        if (!authStats.isAuthenticated) {
          dispatch(showLoginModal(true))
        } else {
          const { _id, name, email } = authStats.user
          dispatch(setIsAuthenticated(true))
          dispatch(setUser({ id: _id, name, email }))
          dispatch(setSchedules(authStats.schedules))
        }
      }
      fetchAuthStatus()
    }
  }, [auth.isAuthenticated, dispatch])

  return (
    <div className="App flex h-dvh overflow-hidden ">
      <Sidebar></Sidebar>
      <div className="w-full relative h-dvh overflow-auto">
        <Outlet />
      </div>
      <ModalHandler />
    </div>
  )
}

export default App
