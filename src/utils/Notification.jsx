import {useContext} from 'react'
import NotificationContext from '../NotificationContext'

const Notification = () => {
    const {showNotification, type, message} = useContext(NotificationContext)
  return (
    <div>
        {showNotification && (
            <div className='fixed top-0 right-4 bg-blue-100 p-2 m-4 '>
              {type === 'success' && <p className='text-green-500'>{message}</p>}
              {type === 'error' && <p className='text-red-500'>{message}</p>}
              {type === 'warning' && <p className='text-yellow-500'>{message}</p>}
            </div>
        )}
    </div>
  )
}

export default Notification