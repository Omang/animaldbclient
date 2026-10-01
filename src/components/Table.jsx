import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { FaSort, FaSortUp, FaSortDown, FaUserCheck, FaMicrochip, FaPaw, FaVenusMars } from "react-icons/fa";
import Searchdb from "./Searchdb";

function Table({ datax = [] }) {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Patient Name",
        accessor: "animal_name",
        Cell: ({ value }) => (
          <div className="flex items-center gap-2.5 font-bold text-slate-900">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600 border border-teal-100">
              <FaPaw className="text-xs" />
            </span>
            <span>{value || "—"}</span>
          </div>
        ),
      },
      {
        Header: "Microchip ID",
        accessor: "animal_chip",
        Cell: ({ value }) => (
          <div className="inline-flex items-center gap-1.5 font-mono text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
            <FaMicrochip className="text-slate-400 text-[10px]" />
            <span>{value || "NO CHIP"}</span>
          </div>
        ),
      },
      {
        Header: "Breed / Specie",
        accessor: "animal_breed",
        Cell: ({ value }) => (
          <span className="text-slate-600 font-medium">{value || "Mixed / Unspecified"}</span>
        ),
      },
      {
        Header: "Sex",
        accessor: "animal_sex",
        Cell: ({ value }) => {
          const isFemale = String(value).toLowerCase().startsWith("f");
          return (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                isFemale
                  ? "bg-rose-50 text-rose-700 border border-rose-200"
                  : "bg-sky-50 text-sky-700 border border-sky-200"
              }`}
            >
              <FaVenusMars className="text-[10px]" />
              {value || "Unknown"}
            </span>
          );
        },
      },
    ],
    []
  );

  const animalsdata = useMemo(() => (Array.isArray(datax) ? [...datax] : []), [datax]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((cols) => [
      ...cols,
      {
        id: "Edit",
        Header: "Owner & History",
        Cell: ({ row }) => (
          <Link
            to={`/account/getanimalowner/${row.values._id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:border-teal-500 hover:text-teal-700 hover:bg-teal-50/50 shadow-sm transition-all"
          >
            <FaUserCheck className="text-teal-600" />
            <span>View Owner</span>
          </Link>
        ),
      },
    ]);
  };

  const initialState = { hiddenColumns: ["_id"] };

  const tableInstance = useTable(
    {
      columns,
      data: animalsdata,
      initialState,
    },
    tableHooks,
    useGlobalFilter,
    useSortBy
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    preGlobalFilteredRows,
    setGlobalFilter,
    state,
  } = tableInstance;

  return (
    <div className="flex flex-col mt-4">
      {/* Search Header */}
      <Searchdb
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}
      />

      {/* Modern EHR Card Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50/90 text-slate-500 uppercase text-[11px] font-bold tracking-wider">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className="px-6 py-4 select-none cursor-pointer hover:text-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{column.render("Header")}</span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <FaSortDown className="text-teal-600 text-xs" />
                          ) : (
                            <FaSortUp className="text-teal-600 text-xs" />
                          )
                        ) : (
                          <FaSort className="text-slate-300 text-[10px]" />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="divide-y divide-slate-100 bg-white">
              {rows.length > 0 ? (
                rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      className="hover:bg-teal-50/30 transition-colors duration-150 group"
                    >
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="px-6 py-3.5 whitespace-nowrap">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-slate-400">
                    <FaPaw className="mx-auto text-3xl text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No animal records found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try refining your search query</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Table;
