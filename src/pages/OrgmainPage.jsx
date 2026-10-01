import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import {
  FaHospital,
  FaUserMd,
  FaEdit,
  FaUserPlus,
  FaArrowLeft,
  FaClinicMedical,
  FaExclamationCircle
} from "react-icons/fa";
import { UserContext } from "../UserContext";
import AccountnavPage from "./AccountnavPage";

const OrgmainPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const [org, setOrg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshToken } = user;

  const getmain = () => {
    setLoading(true);
    axios
      .get('/api/org/getorg/' + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setOrg(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (!id) return;
    getmain();
  }, [id]);

  return (
    <div className="py-2">
      <AccountnavPage />

      {/* Return button */}
      <div className="my-4">
        <Link
          to="/account/org"
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

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <GridLoader color={'#0d9488'} loading={loading} size={15} />
          <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
            Loading clinic practice & staff roster...
          </p>
        </div>
      ) : (
        org && (
          <div className="my-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Organization Profile Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 relative overflow-hidden">
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-black border border-teal-100">
                      <FaHospital />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        Licensed Clinic
                      </span>
                      <h2 className="text-xl font-black text-slate-900 mt-1">
                        {org.org_name}
                      </h2>
                    </div>
                  </div>

                  <div className="my-6">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold mb-1">
                      Practice Description
                    </span>
                    <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      {org.org_description || 'No description provided.'}
                    </p>
                  </div>

                  <Link
                    to={'/account/org/editorg/' + org._id}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    <FaEdit />
                    <span>Edit Clinic Details</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Medical Staff & Practitioners */}
              <div className="lg:col-span-7">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                          <FaUserMd className="text-sm" />
                        </span>
                        <h3 className="font-black text-lg text-slate-900">
                          Clinical Staff & Practitioners
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Veterinary doctors, nurses, and technicians registered to this facility
                      </p>
                    </div>

                    <Link
                      to={'/account/org/adduser/' + org._id}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
                    >
                      <FaUserPlus className="text-xs" />
                      <span>Add Medical Staff</span>
                    </Link>
                  </div>

                  {/* Staff List */}
                  <div className="mt-6 space-y-3">
                    {org.org_users && org.org_users.length > 0 ? (
                      org.org_users.map((staff) => (
                        <div
                          key={staff._id}
                          className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-200 flex items-center justify-between hover:bg-teal-50/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                              {staff.firstname ? staff.firstname.charAt(0).toUpperCase() : 'D'}
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-sm">
                                {staff.firstname} {staff.lastname}
                              </h4>
                              <span className="text-[11px] text-slate-400">
                                Staff ID: {staff._id.slice(-6)}
                              </span>
                            </div>
                          </div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200 text-teal-700 shadow-sm">
                            {staff.occupation || 'Practitioner'}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                        <FaUserMd className="mx-auto text-3xl text-slate-300 mb-2" />
                        <p className="font-bold text-slate-600 text-sm">No medical staff registered</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Click "Add Medical Staff" above to register doctors or clinical technicians.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default OrgmainPage;
