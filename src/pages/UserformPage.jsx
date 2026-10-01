import { useContext, useState } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import AccountnavPage from "./AccountnavPage";
import axios from "axios";
import { UserContext } from "../UserContext";
import NotificationContext from "../NotificationContext";
import {
  FaUserMd,
  FaEnvelope,
  FaPhoneAlt,
  FaBriefcase,
  FaLock,
  FaArrowLeft,
  FaUserPlus,
  FaExclamationCircle
} from "react-icons/fa";

const UserformPage = () => {
  const { user } = useContext(UserContext);
  const { id } = useParams();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [occupation, setOccupation] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { notificationHandler } = useContext(NotificationContext);

  const { refreshToken } = user;

  async function addNewuser(ev) {
    ev.preventDefault();
    if (!id) return;
    setLoading(true);
    try {
      await axios.post(
        '/api/user/adduser',
        {
          org: id,
          firstname: firstname,
          lastname: lastname,
          email: email,
          occupation: occupation,
          password: password,
          mobile: mobile,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
        }
      );
      setLoading(false);
      notificationHandler({ type: 'success', message: 'Organisation User Created Successfully..' });
      setRedirect(true);
    } catch (e) {
      setLoading(false);
      notificationHandler({ type: 'error', message: 'Oops! Something bad happened..Try again' });
      setError(e.message);
    }
  }

  if (redirect) {
    return <Navigate to={'/account/org/' + id} />;
  }

  return (
    <div className="py-2">
      <AccountnavPage />

      <div className="max-w-2xl mx-auto my-6">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to={'/account/org/' + id}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to Clinic Practice</span>
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
            <FaExclamationCircle className="text-rose-500 text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl border border-teal-100">
              <FaUserMd />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Add Clinical Staff / Practitioner
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Register a new veterinarian, clinical nurse, or administrative staff
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <GridLoader color={'#0d9488'} loading={loading} size={15} />
              <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
                Creating practitioner profile...
              </p>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={addNewuser}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Firstname */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    First Name
                  </label>
                  <input
                    required
                    value={firstname}
                    onChange={(ev) => setFirstname(ev.target.value)}
                    type="text"
                    placeholder="Doctor First Name"
                  />
                </div>

                {/* Lastname */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Last Name
                  </label>
                  <input
                    required
                    value={lastname}
                    onChange={(ev) => setLastname(ev.target.value)}
                    type="text"
                    placeholder="Doctor Last Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaEnvelope className="text-teal-600 text-xs" />
                    <span>Staff Email</span>
                  </label>
                  <input
                    required
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    type="email"
                    placeholder="staff@clinic.com"
                  />
                </div>

                {/* Occupation */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaBriefcase className="text-teal-600 text-xs" />
                    <span>Role / Occupation</span>
                  </label>
                  <input
                    required
                    value={occupation}
                    onChange={(ev) => setOccupation(ev.target.value)}
                    type="text"
                    placeholder="e.g. Lead Veterinarian, Vet Surgeon"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaLock className="text-teal-600 text-xs" />
                    <span>Initial Password</span>
                  </label>
                  <input
                    required
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                    type="password"
                    placeholder="Temporary login password"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaPhoneAlt className="text-teal-600 text-xs" />
                    <span>Phone Contact</span>
                  </label>
                  <input
                    required
                    value={mobile}
                    onChange={(ev) => setMobile(ev.target.value)}
                    type="text"
                    placeholder="+267 7X XXX XXX"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Link
                  to={'/account/org/' + id}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  <FaUserPlus />
                  <span>Onboard Practitioner</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserformPage;
