import { useContext } from 'react';
import NotificationContext from '../NotificationContext';
import { FaCheckCircle, FaExclamationCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const Notification = () => {
  const { showNotification, type, message } = useContext(NotificationContext);

  if (!showNotification) return null;

  const styles = {
    success: {
      bg: 'bg-emerald-50/95 border-emerald-200 text-emerald-900',
      icon: <FaCheckCircle className="text-emerald-600 text-base shrink-0" />,
      dot: 'bg-emerald-500',
    },
    error: {
      bg: 'bg-rose-50/95 border-rose-200 text-rose-900',
      icon: <FaExclamationCircle className="text-rose-600 text-base shrink-0" />,
      dot: 'bg-rose-500',
    },
    warning: {
      bg: 'bg-amber-50/95 border-amber-200 text-amber-900',
      icon: <FaExclamationTriangle className="text-amber-600 text-base shrink-0" />,
      dot: 'bg-amber-500',
    },
    info: {
      bg: 'bg-teal-50/95 border-teal-200 text-teal-900',
      icon: <FaInfoCircle className="text-teal-600 text-base shrink-0" />,
      dot: 'bg-teal-500',
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div className="fixed top-5 right-5 z-50 max-w-sm w-full animate-slideIn">
      <div
        className={`flex items-center gap-3 p-4 rounded-2xl border shadow-xl shadow-slate-900/10 backdrop-blur-md transition-all ${currentStyle.bg}`}
      >
        {currentStyle.icon}
        <div className="flex-grow text-xs font-semibold leading-relaxed">
          {message}
        </div>
        <span className={`w-2 h-2 rounded-full ${currentStyle.dot} animate-pulse shrink-0`} />
      </div>
    </div>
  );
};

export default Notification;