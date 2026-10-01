import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaHospitalSymbol, FaPaw } from "react-icons/fa";

const AccountnavPage = () => {
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];
  if (subpage === undefined) {
    subpage = 'profile';
  }

  function linkClasses(type = null) {
    const isActive = type === subpage;
    return `inline-flex items-center gap-2 py-2 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/20'
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    }`;
  }

  return (
    <nav className="my-4 flex justify-center">
      <div className="inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm backdrop-blur-md">
        <Link className={linkClasses('profile')} to={'/account'}>
          <FaUserCircle className="text-sm" />
          <span>Staff Profile</span>
        </Link>
        <Link className={linkClasses('org')} to={'/account/org'}>
          <FaHospitalSymbol className="text-sm" />
          <span>Clinical Organizations</span>
        </Link>
        <Link className={linkClasses('animals')} to={'/account/animals'}>
          <FaPaw className="text-sm" />
          <span>Animal Registry</span>
        </Link>
      </div>
    </nav>
  );
};

export default AccountnavPage;
