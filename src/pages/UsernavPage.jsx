import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaUsers, FaPaw } from "react-icons/fa";

const UsernavPage = () => {
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
          <span>Profile</span>
        </Link>
        <Link className={linkClasses('owners')} to={'/account/owners'}>
          <FaUsers className="text-sm" />
          <span>Pet Parents / Owners</span>
        </Link>
        <Link className={linkClasses('organimals')} to={'/account/organimals'}>
          <FaPaw className="text-sm" />
          <span>Animal Patients</span>
        </Link>
      </div>
    </nav>
  );
};

export default UsernavPage;
