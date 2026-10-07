import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import BarLoader from 'react-spinners/BarLoader';
import { FaUserMd, FaLock, FaEnvelope, FaExclamationCircle, FaTimes, FaSignInAlt, FaPaw } from 'react-icons/fa';
import { UserContext } from '../UserContext';
import NotificationContext from '../NotificationContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [handlerror, setHandlerror] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const { setUser, setReady } = useContext(UserContext);
  const { notificationHandler } = useContext(NotificationContext);

  function closeerror(ev) {
    ev.preventDefault();
    setHandlerror('');
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/user/login', { email, password });
      setUser(data);
      setReady(true);
      setLoading(false);
      notificationHandler({ type: 'success', message: 'Login success...Welcome to AnimalDB' });
      setRedirect(true);
    } catch (e) {
      setLoading(false);
      setHandlerror(e.response?.data?.message || 'Invalid credentials. Please verify your details.');
      notificationHandler({ type: 'error', message: 'Authentication failed. Please try again.' });
    }
  }

  if (redirect) {
    return <Navigate to={'/account'} />;
  }

  return (
    <div className="py-12 sm:py-20 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Medical Card Container */}
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-teal-950/5 p-8 relative overflow-hidden">
          {/* Top Decorative Glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-teal-200/40 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-600/30 text-2xl">
              <FaUserMd />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Veterinary Portal Sign In
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Access clinical records, microchip registry & patient charts
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <BarLoader color={'#0d9488'} loading={loading} width={160} />
              <p className="text-xs font-semibold text-teal-700 animate-pulse">
                Authenticating practitioner credentials...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Error Banner */}
              {!!handlerror && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs animate-shake">
                  <div className="flex items-center gap-2">
                    <FaExclamationCircle className="text-rose-500 shrink-0 text-sm" />
                    <span>{handlerror}</span>
                  </div>
                  <button
                    onClick={closeerror}
                    className="p-1 text-rose-500 hover:text-rose-700 rounded-md transition-colors"
                    type="button"
                  >
                    <FaTimes />
                  </button>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                  Practitioner Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaEnvelope className="text-xs" />
                  </div>
                  <input
                    required
                    type="email"
                    placeholder="doctor@clinic.com"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                    Secure Password
                  </label>
                  <Link
                    to="/passwordreset"
                    className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <FaLock className="text-xs" />
                  </div>
                  <input
                    required
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-teal-600/25 active:scale-[0.98] transition-all duration-200 mt-6 cursor-pointer"
              >
                <FaSignInAlt />
                <span>Access Clinical Workspace</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
