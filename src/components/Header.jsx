import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { FaHeartbeat, FaUserMd, FaPaw, FaHorse, FaChevronRight } from 'react-icons/fa';
import VetBadge3D from './VetBadge3D';

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <header className="flex items-center justify-between gap-4">
      {/* Brand & Logo */}
      <Link
        to={user ? '/account' : '/'}
        className="flex items-center gap-3 group transition-transform active:scale-[0.98]"
      >
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-600/30 group-hover:shadow-teal-600/50 transition-all duration-300">
            <FaPaw className="text-xl" />
          </div>
          <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
        </div>
        <div>
          <div className="flex items-center gap-1.5 font-extrabold text-lg sm:text-xl tracking-tight text-slate-900">
            <span>Animal<span className="text-teal-600">DB</span></span>
            <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-teal-50 text-teal-700 border border-teal-200">
              VET EHR
            </span>
          </div>
          <p className="hidden sm:block text-[11px] font-medium text-slate-400 -mt-0.5">
            Clinical Health & Registry
          </p>
        </div>
      </Link>

      {/* Center Category Filter Badge / Quick Selector */}
      <div className="hidden md:flex items-center bg-slate-100/90 p-1 rounded-full border border-slate-200/80 shadow-inner text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-teal-800 shadow-sm transition-all cursor-pointer">
          <FaPaw className="text-teal-600 text-xs" />
          <span>Pets & Canines</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:text-slate-900 transition-colors cursor-pointer">
          <FaHorse className="text-slate-400 text-xs" />
          <span>Livestock & Equine</span>
        </div>
        <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full hover:text-slate-900 transition-colors cursor-pointer">
          <span>Others & Exotics</span>
        </div>
      </div>

      {/* Right User / Account Profile */}
      <div className="flex items-center gap-2">
        <Link
          to={user ? '/account' : '/login'}
          className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-white border border-slate-200 shadow-sm hover:border-teal-400 hover:shadow-md hover:shadow-teal-900/5 transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm group-hover:bg-teal-600 group-hover:text-white transition-colors">
            {user ? (
              user.lastname ? user.lastname.charAt(0).toUpperCase() : 'U'
            ) : (
              <FaUserMd className="text-sm" />
            )}
          </div>
          <div className="text-left">
            {user ? (
              <>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span>{user.lastname}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                </div>
                <div className="text-[10px] font-medium text-slate-400 capitalize">
                  {user.role || 'Practitioner'}
                </div>
              </>
            ) : (
              <>
                <div className="text-xs font-semibold text-slate-800">
                  Staff Login
                </div>
                <div className="text-[10px] text-slate-400">
                  Access Portal
                </div>
              </>
            )}
          </div>
          <FaChevronRight className="text-slate-400 text-xs ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
