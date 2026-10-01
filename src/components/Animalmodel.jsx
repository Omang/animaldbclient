import React from "react";
import { FaTimes, FaPaw } from "react-icons/fa";

const Animalmodel = ({ open, onClose, title = "Patient Record", children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all animate-scaleUp">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <FaPaw className="text-sm" />
            </span>
            <h3 className="font-bold text-slate-800 text-base">{title}</h3>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <FaTimes className="text-sm" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6">{children || <p className="text-slate-600 text-sm">Patient details</p>}</div>
      </div>
    </div>
  );
};

export default Animalmodel;
