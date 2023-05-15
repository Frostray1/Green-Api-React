import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../Page/Home'
import Auth from '../Page/Auth'
import { routes } from './routes'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.auth} element={<Auth />} />
        <Route path={routes.home} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;