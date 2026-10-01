import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useGlobalFilter, useSortBy, useTable } from "react-table";
import { FaSort, FaSortUp, FaSortDown, FaUserTie, FaPhoneAlt, FaFolderOpen } from "react-icons/fa";
import Searchdb from "./Searchdb";

const OwnerTable = ({ owners = [] }) => {
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Client / Owner Name",
        accessor: "first_name",
        Cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center border border-teal-100">
              {row.original.first_name ? row.original.first_name.charAt(0).toUpperCase() : "O"}
            </div>
            <div>
              <div className="font-bold text-slate-900">
                {row.original.first_name} {row.original.last_name}
              </div>
              <div className="text-[11px] text-slate-400">Registered Pet Parent</div>
            </div>
          </div>
        ),
      },
      {
        Header: "Last Name",
        accessor: "last_name",
      },
      {
        Header: "Contact Information",
        accessor: "mobile",
        Cell: ({ value }) => (
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-xs font-medium text-slate-700">
            <FaPhoneAlt className="text-teal-600 text-[10px]" />
            <span>{value || "No phone listed"}</span>
          </div>
        ),
      },
    ],
    []
  );

  const animalsdata = useMemo(() => (Array.isArray(owners) ? [...owners] : []), [owners]);

  const tableHooks = (hooks) => {
    hooks.visibleColumns.push((cols) => [
      ...cols,
      {
        id: "Edit",
        Header: "Manage Client",
        Cell: ({ row }) => (
          <Link
            to={`/account/owners/owner/${row.values._id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white shadow-sm shadow-teal-600/20 transition-all"
          >
            <FaFolderOpen />
            <span>Manage Profile</span>
          </Link>
        ),
      },
    ]);
  };

  const initialState = { hiddenColumns: ["_id", "last_name"] };

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
        placeholder="Search client by first name, last name, phone..."
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
                      className="hover:bg-teal-50/30 transition-colors duration-150"
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
                    <FaUserTie className="mx-auto text-3xl text-slate-300 mb-2" />
                    <p className="font-semibold text-slate-600">No client records found</p>
                    <p className="text-xs text-slate-400 mt-0.5">Try searching by a different name or phone</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerTable;