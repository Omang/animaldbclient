import React from 'react'

const ResetPage = () => {
  return (

      <div className='mt-4 grow flex items-center justify-around'>
    
    <div className='mb-64'>
    <h1 className="text-4xl text-center mb-4">Reset Password</h1>
     <form className='max-w-md mx-auto '>
        <input type="email" placeholder='your@email.com' />
        <button className='primary'>Send</button>
     </form>
    </div>
    
    </div>
    
  )
}

export default ResetPage
