import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Landing from '../pages/Landing'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../routing/ProtectedRoute'

const AppRoutes = () => {

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Landing />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route element={<ProtectedRoute />} >
                    <Route path='/home' element={<Home />} />
                </Route>

                <Route path='/*' element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default AppRoutes