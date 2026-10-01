import axios from "axios";
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../UserContext";
import GridLoader from "react-spinners/GridLoader";
import { Link, useParams } from "react-router-dom";
import { FaUserTie, FaEnvelope, FaPhoneAlt, FaArrowLeft, FaPaw, FaIdCard } from "react-icons/fa";

const AnimalownerPage = () => {
  const { id } = useParams();

  const [owner, setOwner] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { ready, user } = useContext(UserContext);

  const getowner = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/animal/getanimalowner/' + id);
      setLoading(false);
      setOwner(data);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (!id) return;
    getowner();
  }, [id]);

  const backLink = user?.role === "admin" ? '/account/animals' : '/account/organimals';

  return (
    <div className="py-6 max-w-xl mx-auto">
      {/* Return button */}
      <div className="mb-6">
        <Link
          to={backLink}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-teal-700 transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>Return to Animals Registry</span>
        </Link>
      </div>

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <GridLoader color={'#0d9488'} loading={loading} size={15} />
          <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
            Locating registered owner profile...
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {owner && Array.isArray(owner) && owner.length > 0 ? (
            owner.map((ownerx) => (
              <div
                key={ownerx._id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 relative overflow-hidden"
              >
                <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-black border border-teal-100">
                    {ownerx.first_name ? ownerx.first_name.charAt(0).toUpperCase() : 'O'}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                      Verified Pet Owner
                    </span>
                    <h2 className="text-xl font-black text-slate-900 mt-1">
                      {ownerx.first_name} {ownerx.last_name}
                    </h2>
                  </div>
                </div>

                <div className="space-y-3.5 my-6 text-xs">
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <FaEnvelope className="text-teal-600 text-sm" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Email</span>
                      <span className="font-semibold text-slate-800">{ownerx.email || '—'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                    <FaPhoneAlt className="text-teal-600 text-sm" />
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Mobile Phone</span>
                      <span className="font-semibold text-slate-800">{ownerx.mobile || '—'}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    to={backLink}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
                  >
                    <FaArrowLeft className="text-xs" />
                    <span>Return to Animal Registry</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center text-slate-400">
              <FaIdCard className="mx-auto text-3xl text-slate-300 mb-2" />
              <p className="font-bold text-slate-600 text-sm">No owner found for this animal</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AnimalownerPage;
