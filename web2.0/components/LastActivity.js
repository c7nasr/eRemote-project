import React from "react";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
// A great library for fuzzy filtering/sorting items

import makeData from "./makeData";

// Our table component
function Table({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useFilters, // useFilters!
      useGlobalFilter // useGlobalFilter!
    );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table
        {...getTableProps()}
        className="table table-auto w-full bg-purple-700 text-white rounded mb-2 shadow-md"
      >
        <thead className="p-8 table-header-group">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="py-4 border-t border-purple-600 items-center"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="p-5 text-center" {...getTableBodyProps()}>
          {firstPageRows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="p-2 border-b border-purple-600 "
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function LastActivity() {
  const columns = React.useMemo(
    () => [
      {
        id: "l10",
        Header: "Last 10 Requests",
        columns: [
          {
            id: "request",
            Header: "Request",
            accessor: "request",
          },
          {
            Header: "Date",
            id: "checkbox-table-column2",
            accessor: "date",
          },
          {
            Header: "Time",
            accessor: "time",
            id: "checkbox-table-column24",
          },
          {
            Header: "Category",
            accessor: "category",
            id: "checkbox-table-column244",
          },
          {
            Header: "Status",
            accessor: "status",
            id: "checkbox-ta3ble-column24",
          },
        ],
      },
    ],
    []
  );

  const data = React.useMemo(() => makeData(100000), []);

  return (
    <>
      <Table columns={columns} data={data} />
    </>
  );
}

export default LastActivity;
