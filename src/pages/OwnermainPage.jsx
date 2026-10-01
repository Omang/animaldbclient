import { Link, useParams } from "react-router-dom";
import UsernavPage from "./UsernavPage";
import { useContext, useEffect, useState } from "react";
import GridLoader from "react-spinners/GridLoader";
import axios from "axios";
import {
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
  FaPaw,
  FaPlus,
  FaChevronRight,
  FaExclamationCircle
} from "react-icons/fa";
import { UserContext } from "../UserContext";

const OwnermainPage = () => {
  const { id } = useParams();

  const [owner, setOwner] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);
  const { refreshToken } = user;

  const getowneris = () => {
    setLoading(true);
    axios
      .get('/api/owner/owner/' + id, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${refreshToken}`,
        },
      })
      .then(({ data }) => {
        setLoading(false);
        setOwner(data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  useEffect(() => {
    if (!id) return;
    getowneris();
  }, [id]);

  return (
    <div className="py-2">
      <UsernavPage />

      {error && (
        <div className="my-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-3">
          <FaExclamationCircle className="text-rose-500 text-base shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <GridLoader color={'#0d9488'} loading={loading} size={15} />
          <p className="text-xs font-semibold text-teal-800 mt-4 animate-pulse">
            Fetching client & patient records...
          </p>
        </div>
      ) : (
        owner && (
          <div className="my-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Client Record Card */}
              <div className="lg:col-span-4">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 relative overflow-hidden">
                  <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                    <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl font-black border border-teal-100">
                      {owner.first_name ? owner.first_name.charAt(0).toUpperCase() : 'O'}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                        Client Record
                      </span>
                      <h2 className="text-xl font-black text-slate-900 mt-1">
                        {owner.first_name} {owner.last_name}
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3.5 my-6 text-xs">
                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <FaEnvelope className="text-teal-600 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Email Address</span>
                        <span className="font-semibold text-slate-800">{owner.email || '—'}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <FaPhoneAlt className="text-teal-600 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Primary Phone</span>
                        <span className="font-semibold text-slate-800">{owner.mobile || '—'}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                      <FaMapMarkerAlt className="text-teal-600 mt-0.5" />
                      <div>
                        <span className="text-slate-400 block text-[10px] uppercase font-bold">Physical Location</span>
                        <span className="font-semibold text-slate-800">
                          {owner.address?.plot_num ? `Plot ${owner.address.plot_num}, ` : ''}
                          {owner.address?.street_map || 'Not specified'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={'/account/owners/updateowner/' + owner._id}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-teal-50 hover:text-teal-700 border border-slate-200 text-slate-700 font-bold text-xs transition-colors"
                  >
                    <FaEdit />
                    <span>Edit Client Details</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: Registered Animals / Patients */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                          <FaPaw className="text-sm" />
                        </span>
                        <h3 className="font-black text-lg text-slate-900">Registered Animal Patients</h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Animals under this client's medical ownership
                      </p>
                    </div>

                    <Link
                      to={'/account/owners/addanimal/' + owner._id}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-teal-600/20 active:scale-[0.98] transition-all"
                    >
                      <FaPlus className="text-xs" />
                      <span>Register New Animal</span>
                    </Link>
                  </div>

                  {/* Animals List / Cards */}
                  <div className="mt-6">
                    {owner.owner_animals && owner.owner_animals.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {owner.owner_animals.map((animal) => (
                          <Link
                            key={animal._id}
                            to={`/account/owners/getanimal/${animal._id}/${owner._id}`}
                            className="p-4 rounded-2xl bg-slate-50/60 border border-slate-200/80 hover:border-teal-400 hover:bg-teal-50/20 shadow-sm hover:shadow-md transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-700 flex items-center justify-center text-base group-hover:bg-teal-600 group-hover:text-white transition-colors">
                                <FaPaw />
                              </div>
                              <div>
                                <h4 className="font-black text-slate-900 text-sm group-hover:text-teal-700 transition-colors">
                                  {animal.animal_name}
                                </h4>
                                <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                                  <span>{animal.animal_breed || 'Breed Unspecified'}</span>
                                  {animal.animal_color && (
                                    <>
                                      <span className="text-slate-300">•</span>
                                      <span>{animal.animal_color}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <FaChevronRight className="text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all text-xs" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl">
                        <FaPaw className="mx-auto text-3xl text-slate-300 mb-2" />
                        <p className="font-bold text-slate-600 text-sm">No animals registered yet</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Click "Register New Animal" above to add their first patient record
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

export default OwnermainPage;
