import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaEnvelope, FaLock, FaArrowLeft, FaPaw } from 'react-icons/fa';

const RegisterPage = () => {
  return (
    <div className="py-12 sm:py-20 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-teal-950/5 p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-600/30 text-2xl">
              <FaUserPlus />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Register Clinical Account
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Join the veterinary network & animal records system
            </p>
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Practice / Doctor Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaEnvelope className="text-xs" />
                </div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Set Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <FaLock className="text-xs" />
                </div>
                <input
                  type="password"
                  placeholder="Create strong password"
                  className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 text-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-teal-600/25 active:scale-[0.98] transition-all duration-200 mt-6 cursor-pointer"
            >
              <FaPaw />
              <span>Create Account</span>
            </button>

            <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-teal-600 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
