import { Link } from "react-router-dom";
import UsernavPage from "./UsernavPage";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import GridLoader from "react-spinners/GridLoader";
import { UserContext } from "../UserContext";
import OwnerTable from "../components/OwnerTable";
import { FaUserFriends, FaUserPlus, FaExclamationCircle } from "react-icons/fa";

const OwnersPage = () => {
  const [owner, setOwner] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  const allowners = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/owner/allowners', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.refreshToken}`,
        },
      });
      setLoading(false);
      setOwner(data || []);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  useEffect(() => {
    allowners();
  }, []);

  return (
    <div className="py-2">
      <UsernavPage />

      {/* Header and Add Action */}
      <div className="my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
              <FaUserFriends className="text-lg" />
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Client & Pet Owner Directory
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Registered animal owners, contact information, and linked patient profiles
          </p>
        </div>

        <Link
          to={'/account/owners/new'}
          className="inline-flex items-center gap-2 self-start sm:self-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
        >
          <FaUserPlus />
          <span>Register New Owner</span>
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
            Loading client directory...
          </p>
        </div>
      ) : (
        <OwnerTable owners={owner} />
      )}
    </div>
  );
};

export default OwnersPage;
