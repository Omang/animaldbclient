import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import UsernavPage from "./UsernavPage";
import { UserContext } from "../UserContext";
import axios from "axios";
import { Navigate, useParams, Link } from "react-router-dom";
import NotificationContext from "../NotificationContext";
import {
  FaUserTie,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaHome,
  FaArrowLeft,
  FaSave,
  FaUserPlus,
  FaExclamationCircle
} from "react-icons/fa";

const OwnerformPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [plotnum, setPlotnum] = useState('');
  const [town, setTown] = useState('');

  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { notificationHandler } = useContext(NotificationContext);

  const { refreshToken } = user;

  const getstuffy = () => {
    setLoading(true);
    axios
      .get('/api/owner/owner/' + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          setLoading(false);
          setFirstname(data.first_name || '');
          setLastname(data.last_name || '');
          setEmail(data.email || '');
          setMobile(data.mobile || '');
          setPlotnum(data.address?.plot_num || '');
          setTown(data.address?.street_map || '');
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (!id) return;
    getstuffy();
  }, [id]);

  async function addNewowner(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await axios.put(
          '/api/owner/updateowner',
          {
            owner_id: id,
            first_name: firstname,
            last_name: lastname,
            email: email,
            mobile: mobile,
            plot_num: plotnum,
            street_map: town,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        setLoading(false);
        notificationHandler({ type: 'warning', message: 'Owner updated successfully...Thanks' });
        setRedirect(<Navigate to={'/account/owners/owner/' + id} />);
      } else {
        const { data } = await axios.post(
          '/api/owner/createowner',
          {
            first_name: firstname,
            last_name: lastname,
            email: email,
            mobile: mobile,
            plot_num: plotnum,
            street_map: town,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        setLoading(false);
        notificationHandler({ type: 'success', message: 'New Owner Created successfully...Thanks' });
        setRedirect(<Navigate to={'/account/owners/owner/' + data._id} />);
      }
    } catch (e) {
      setLoading(false);
      notificationHandler({ type: 'error', message: 'Oops!. Something wrong happened..Try again' });
      setError(e.message);
    }
  }

  if (redirect) {
    return redirect;
  }

  return (
    <div className="py-2">
      <UsernavPage />

      <div className="max-w-2xl mx-auto my-6">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to={id ? `/account/owners/owner/${id}` : '/account/owners'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to Client Directory</span>
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
              <FaUserTie />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {id ? 'Update Client Record' : 'Register New Pet Parent / Client'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Maintain verified ownership contact and residential information
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <GridLoader color={'#0d9488'} loading={loading} size={15} />
              <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
                Saving client profile...
              </p>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={addNewowner}>
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
                    placeholder="First Name"
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
                    placeholder="Last Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaEnvelope className="text-teal-600 text-xs" />
                    <span>Email Address</span>
                  </label>
                  <input
                    required
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    type="email"
                    placeholder="owner@domain.com"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaPhoneAlt className="text-teal-600 text-xs" />
                    <span>Mobile Phone</span>
                  </label>
                  <input
                    required
                    value={mobile}
                    onChange={(ev) => setMobile(ev.target.value)}
                    type="text"
                    placeholder="+267 7X XXX XXX"
                  />
                </div>

                {/* Plot Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaHome className="text-teal-600 text-xs" />
                    <span>Plot / House Number</span>
                  </label>
                  <input
                    required
                    value={plotnum}
                    onChange={(ev) => setPlotnum(ev.target.value)}
                    type="text"
                    placeholder="Plot 1234"
                  />
                </div>

                {/* Town */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                    <FaMapMarkerAlt className="text-teal-600 text-xs" />
                    <span>Village / Town / City</span>
                  </label>
                  <input
                    required
                    value={town}
                    onChange={(ev) => setTown(ev.target.value)}
                    type="text"
                    placeholder="Gaborone, Francistown"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Link
                  to={id ? `/account/owners/owner/${id}` : '/account/owners'}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {id ? <FaSave /> : <FaUserPlus />}
                  <span>{id ? 'Save Client Updates' : 'Register Client'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerformPage;
