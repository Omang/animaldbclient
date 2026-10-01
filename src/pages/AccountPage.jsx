import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import OrgsPage from "./OrgsPage";
import AccountnavPage from "./AccountnavPage";
import UsernavPage from "./UsernavPage";
import NotificationContext from "../NotificationContext";
import { FaUserMd, FaSignOutAlt, FaShieldAlt, FaIdBadge, FaEnvelope, FaHospital } from "react-icons/fa";
import VetBadge3D from "../components/VetBadge3D";

const AccountPage = () => {
  const [redirect, setRedirect] = useState(null);
  const { ready, user, setUser } = useContext(UserContext);
  const { notificationHandler } = useContext(NotificationContext);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  async function Logout() {
    notificationHandler({ type: 'warning', message: 'Signed out successfully. Have a great day!' });
    setRedirect('/');
    setUser(null);
  }

  if (!ready) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-teal-600">
        <div className="w-10 h-10 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-semibold">Loading Practitioner Profile...</p>
      </div>
    );
  }

  if (ready && !user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  const isAdmin = user.role === "admin";

  return (
    <div className="py-4">
      {isAdmin ? <AccountnavPage /> : <UsernavPage />}

      {subpage === 'profile' && (
        <div className="max-w-xl mx-auto mt-6">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-slate-200/90 shadow-xl shadow-teal-950/5 p-8 relative overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600" />

            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
              {/* Doctor Avatar / 3D Badge */}
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-teal-600/30">
                  {user.lastname ? user.lastname.charAt(0).toUpperCase() : 'D'}
                </div>
                <div className="absolute -bottom-1 -right-1">
                  <VetBadge3D size={28} />
                </div>
              </div>

              <div className="text-center sm:text-left flex-grow">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200 uppercase mb-1">
                  <FaShieldAlt className="text-[10px]" />
                  <span>{user.role === 'admin' ? 'System Administrator' : 'Veterinary Practitioner'}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900">
                  {user.firstname ? `${user.firstname} ${user.lastname}` : user.lastname || 'Clinical User'}
                </h2>
                <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                  <FaEnvelope className="text-slate-400" />
                  <span>{user.email || 'Email not listed'}</span>
                </p>
              </div>
            </div>

            {/* Practitioner Details Grid */}
            <div className="grid grid-cols-2 gap-4 my-6 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">System Role</span>
                <span className="font-bold text-slate-800 capitalize">{user.role || 'Practitioner'}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block mb-1">Security Status</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Active Session
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <span className="text-xs text-slate-400">
                Connected to AnimalDB Veterinary EHR
              </span>
              <button
                onClick={Logout}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs transition-colors duration-200 cursor-pointer"
              >
                <FaSignOutAlt />
                <span>Log Out of Session</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {isAdmin && subpage === 'org' && <OrgsPage />}
    </div>
  );
};

export default AccountPage;
