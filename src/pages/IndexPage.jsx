import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';
import VetHero3D from '../components/VetHero3D';
import {
  FaPaw,
  FaNotesMedical,
  FaHospitalSymbol,
  FaMicrochip,
  FaShieldAlt,
  FaArrowRight,
  FaUserMd
} from 'react-icons/fa';

const IndexPage = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="py-6 sm:py-10">
      {/* Hero Section with Interactive Three.js 3D Bio-Sphere */}
      <div className="relative rounded-3xl bg-gradient-to-b from-white/90 via-white/80 to-teal-50/40 border border-slate-200/80 shadow-xl shadow-teal-950/5 p-6 sm:p-12 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-teal-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-emerald-200/20 rounded-full blur-2xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold border border-teal-200">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span>Next-Gen Veterinary Health & Registry System</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-600">Animal Healthcare</span> & Records Database
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Centralized veterinary platform for patient histories, microchip tracking, vaccination cards, and clinical client management.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to={user ? '/account' : '/login'}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-teal-600/25 transition-all duration-200 active:scale-[0.98]"
              >
                <FaUserMd />
                <span>{user ? 'Enter Clinical Portal' : 'Veterinary Staff Login'}</span>
                <FaArrowRight className="text-xs ml-1" />
              </Link>
            </div>

            {/* Quick Micro-stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-100 max-w-lg mx-auto lg:mx-0">
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black text-slate-900">100%</div>
                <div className="text-xs font-medium text-slate-400">Digital EHR</div>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black text-teal-600">ISO</div>
                <div className="text-xs font-medium text-slate-400">Microchip Standard</div>
              </div>
              <div className="text-left">
                <div className="text-xl sm:text-2xl font-black text-emerald-600">24/7</div>
                <div className="text-xs font-medium text-slate-400">Health Ledger</div>
              </div>
            </div>
          </div>

          {/* Right Three.js 3D Scene */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-square bg-slate-900/5 rounded-3xl p-2 border border-slate-200/50 backdrop-blur-sm shadow-inner flex flex-col items-center justify-center">
              <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 text-[10px] font-bold text-teal-800 shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-ping"></span>
                <span>3D Interactive Bio-Model (Drag & Rotate)</span>
              </div>
              <VetHero3D className="w-full h-full min-h-[300px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Feature Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 group">
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center text-xl mb-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-200">
            <FaPaw />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Patient Registry</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Instant microchip lookup, breed categorization, species identification, and registered ownership details.
          </p>
          <Link
            to={user ? '/account/animals' : '/login'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700"
          >
            <span>Explore Registry</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200 group">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-200">
            <FaNotesMedical />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Vaccination & Health Cards</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Keep track of immunizations, doctor consultations, scheduled checkups, and diagnostic reports.
          </p>
          <Link
            to={user ? '/account' : '/login'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
          >
            <span>View Medical Logs</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 group">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center text-xl mb-4 group-hover:bg-sky-600 group-hover:text-white transition-colors duration-200">
            <FaHospitalSymbol />
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">Clinics & Organizations</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-4">
            Coordinate veterinary clinics, licensed practitioners, medical staff assignments, and client records.
          </p>
          <Link
            to={user ? '/account/org' : '/login'}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-700"
          >
            <span>Manage Clinics</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
