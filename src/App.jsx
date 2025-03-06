import React from 'react'
import AppRoutes from './routing/Routes'
import { Flip, ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className='flex w-full min-h-screen text-foreground bg-secondary' >
      <AppRoutes />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Flip}
      />
    </div>
  )
}

export default App
