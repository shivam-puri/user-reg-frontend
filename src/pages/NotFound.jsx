import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {

    return (
        <div className='flex w-full min-h-screen bg-secondary items-center justify-center' >
            <Link to='/' className='mt-6 flex items-center justify-center rounded-custom bg-white text-black p-3 px-6 text-xs font-semibold mr-5'>PAGE NOT FOUND, GO BACK HOME</Link>
        </div>
    )
}

export default NotFound
