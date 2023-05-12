import Auth from './Page/Auth/Auth'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Page/Home/Home'

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/auth' element={<Auth />} />
					<Route path='/' element={<Home />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
