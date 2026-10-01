import axios from "axios";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { UserContext } from "../UserContext";
import AccountnavPage from "./AccountnavPage";
import { Navigate, useParams, Link } from "react-router-dom";
import NotificationContext from "../NotificationContext";
import {
  FaHospital,
  FaFileAlt,
  FaArrowLeft,
  FaSave,
  FaPlusCircle,
  FaExclamationCircle
} from "react-icons/fa";

const OrgformPage = () => {
  const { id } = useParams();
  const [orgname, setOrgname] = useState('');
  const [orgdis, setOrgdis] = useState('');
  const [redirect, setRedirect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(UserContext);
  const { notificationHandler } = useContext(NotificationContext);

  useEffect(() => {
    if (!id) return;
    const { refreshToken } = user;
    setLoading(true);
    axios
      .get('/api/org/getorg/' + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(({ data }) => {
        if (data) {
          setLoading(false);
          setOrgname(data.org_name || '');
          setOrgdis(data.org_description || '');
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [id]);

  async function addNeworg(ev) {
    ev.preventDefault();
    setLoading(true);
    const { refreshToken } = user;

    if (id) {
      axios
        .put(
          '/api/org/updateorg',
          {
            id: id,
            org_name: orgname,
            org_description: orgdis,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          notificationHandler({ type: 'warning', message: 'Organisation Updated successfully...' });
          setRedirect(<Navigate to={'/account/org/' + id} />);
        })
        .catch((err) => {
          setLoading(false);
          notificationHandler({ type: 'error', message: 'Update Failed..Try again.' });
        });
    } else {
      axios
        .post(
          '/api/org/createorg',
          {
            org_name: orgname,
            org_description: orgdis,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )
        .then((response) => {
          setLoading(false);
          notificationHandler({ type: 'success', message: 'Organisation created successfully.' });
          setRedirect(<Navigate to={'/account/org/' + response.data._id} />);
        })
        .catch((err) => {
          setLoading(false);
          notificationHandler({ type: 'error', message: 'Creation Failed..Try again.' });
        });
    }
  }

  if (redirect) {
    return redirect;
  }

  return (
    <div className="py-2">
      <AccountnavPage />

      <div className="max-w-2xl mx-auto my-6">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to={id ? `/account/org/${id}` : '/account/org'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-teal-700 transition-colors"
          >
            <FaArrowLeft className="text-[10px]" />
            <span>Return to Organizations</span>
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
              <FaHospital />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                {id ? 'Update Clinic Practice' : 'Register New Veterinary Clinic'}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Practice facility name and public clinical details
              </p>
            </div>
          </div>

          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center text-center">
              <GridLoader color={'#0d9488'} loading={loading} size={15} />
              <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
                Processing practice registration...
              </p>
            </div>
          ) : (
            <form className="mt-6 space-y-4" onSubmit={addNeworg}>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <FaHospital className="text-teal-600 text-xs" />
                  <span>Practice / Clinic Name</span>
                </label>
                <input
                  required
                  value={orgname}
                  onChange={(ev) => setOrgname(ev.target.value)}
                  type="text"
                  placeholder="e.g. Gaborone Animal Hospital"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <FaFileAlt className="text-teal-600 text-xs" />
                  <span>Practice Description</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={orgdis}
                  onChange={(ev) => setOrgdis(ev.target.value)}
                  placeholder="Provide details about veterinary services, emergency care, or facilities..."
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <Link
                  to={id ? `/account/org/${id}` : '/account/org'}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                  {id ? <FaSave /> : <FaPlusCircle />}
                  <span>{id ? 'Save Clinic Changes' : 'Register Clinic'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrgformPage;
