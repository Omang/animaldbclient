import React, { useState } from "react";
import { FaSearch, FaTimes, FaFilter } from "react-icons/fa";

const Searchdb = ({
  preGlobalFilteredRows = [],
  globalFilter,
  setGlobalFilter,
  placeholder = "Search patient, microchip, breed, owner..."
}) => {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter || "");

  const onChange = (val) => {
    setGlobalFilter(val || undefined);
  };

  const handleClear = () => {
    setValue("");
    onChange("");
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
      {/* Input with clinical search icon */}
      <div className="relative flex-grow max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <FaSearch className="text-sm text-teal-600" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(e.target.value);
          }}
          placeholder={count ? `Filter ${count} records (e.g. Chip, Breed)...` : placeholder}
          className="w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-9 py-2.5 text-sm transition-all focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 shadow-sm"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
          >
            <FaTimes className="text-xs" />
          </button>
        )}
      </div>

      {/* Record Counter Badge */}
      <div className="flex items-center gap-2 self-start sm:self-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-semibold border border-teal-200/60 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
          <span>{count} Registered Records</span>
        </span>
      </div>
    </div>
  );
};

export default Searchdb;
