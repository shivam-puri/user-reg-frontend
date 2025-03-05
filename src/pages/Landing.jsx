import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {

    return (
        <div className='flex w-full min-h-screen bg-secondary items-center justify-center' >
            <Link to='/login' className='mt-6 flex items-center justify-center rounded-custom bg-white text-black p-3 w-40 text-xs font-semibold mr-5'>LOG IN</Link>
            <Link to='/signup' className='mt-6 flex items-center justify-center rounded-custom bg-white text-black p-3 w-40 text-xs font-semibold '>SIGN UP</Link>

        </div>
    )
}

export default Landing
