import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {

    return (
        <div className='flex w-full flex-col min-h-screen bg-secondary items-center justify-center' >
            <div className='flex w-full justify-center' >
                <Link to='/login' className='mt-6 flex items-center justify-center rounded-custom bg-white text-black p-3 w-40 text-xs font-semibold mr-5'>LOG IN</Link>
                <Link to='/signup' className='mt-6 flex items-center justify-center rounded-custom bg-white text-black p-3 w-40 text-xs font-semibold '>SIGN UP</Link>
            </div>
            <br />
            <div className='flex w-full justify-center' >
                <a href="https://github.com/shivam-puri/user-reg-backend/tree/main?tab=readme-ov-file#api-documentation" target="_blank" rel="noopener noreferrer" className='text-center'>CLICK HERE TO GO TO THE REST API DOCUMENTATION</a>
            </div>
        </div>
    )
}

export default Landing
