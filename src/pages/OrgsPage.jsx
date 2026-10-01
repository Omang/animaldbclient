import { Link } from "react-router-dom";
import AccountnavPage from "./AccountnavPage";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import { FaHospital, FaPlus, FaChevronRight, FaClinicMedical, FaExclamationCircle } from "react-icons/fa";
import { UserContext } from "../UserContext";
import axios from "axios";

const OrgsPage = () => {
  const { user } = useContext(UserContext);

  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { refreshToken } = user;

  const getstuff = () => {
    setLoading(true);
    axios
      .get('/api/org/getallorgs', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setOrgs(data || []);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    getstuff();
  }, []);

  return (
    <div className="py-2">
      <AccountnavPage />

      {/* Header and Add Button */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
              <FaClinicMedical className="text-lg" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Veterinary Organizations & Clinics
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered veterinary hospital practices, clinical branches, and staff networks
          </p>
        </div>

        <Link
          to={'/account/org/new'}
          className="inline-flex items-center gap-2 self-start sm:self-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
        >
          <FaPlus />
          <span>Add New Practice</span>
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
            Loading veterinary organizations...
          </p>
        </div>
      ) : (
        <div>
          {orgs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {orgs.map((org) => (
                <Link
                  key={org._id}
                  to={'/account/org/' + org._id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:border-teal-400 hover:shadow-lg hover:shadow-teal-950/5 p-6 transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl group-hover:bg-teal-600 group-hover:text-white transition-colors border border-teal-100">
                        <FaHospital />
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        ACTIVE CLINIC
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-700 transition-colors">
                      {org.org_name}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                      {org.org_description || 'Licensed veterinary medical practice and diagnostic center.'}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
                    <span>Manage Staff & Facility</span>
                    <FaChevronRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-400">
              <FaHospital className="mx-auto text-4xl text-slate-300 mb-3" />
              <p className="font-bold text-slate-700 text-base">No veterinary organizations registered</p>
              <p className="text-xs text-slate-400 mt-1">
                Click "Add New Practice" above to register your first veterinary hospital.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrgsPage;