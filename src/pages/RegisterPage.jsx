import React from 'react'

const RegisterPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-around'>
    
    <div className='mb-64'>
    <h1 className="text-4xl text-center mb-4">Register Page</h1>
     <form className='max-w-md mx-auto '>
        <input type="email" placeholder='your@email.com' />
        <input type="password" placeholder='your password' />
        <button className='primary'>login</button>
        
     </form>
    </div>
    
    </div>
  )
}

export default RegisterPage
