import {Routes, Route, Navigate} from 'react-router-dom'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import Dashboard from '../pages/Dashboard'
import Profile from '../pages/Profile'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import Customers from '../pages/Customers'
import New from '../pages/New'

function RoutesApp(){
    const { signed } = useContext(AuthContext)

    return(
        <Routes>
            <Route path="/" element={!signed ? <SignIn /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!signed ? <SignUp /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={signed ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/profile" element={signed ? <Profile /> : <Navigate to="/" />} />
            <Route path="/customers" element={signed ? <Customers /> : <Navigate to="/" />} />
            <Route path="/new" element={signed ? <New /> : <Navigate to="/" />} />
            <Route path="/new/:id" element={signed ? <New /> : <Navigate to="/" />} />
        </Routes>
    )
}

export default RoutesApp