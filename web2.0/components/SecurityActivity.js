import React from "react";

// A great library for fuzzy filtering/sorting items
import matchSorter from "match-sorter";

import makeData from "./makeData";
import {
  usePagination,
  useTable,
  defaultColumn,
  useFilters,
  useGlobalFilter,
} from "react-table";

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <select
      className="rounded-lg border w-full text-center border-blue-800 mt-3"
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option className="text-center" value="">
        All
      </option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const defaultColumn = React.useMemo(
    () => ({
      Filter: SelectColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of using 'rows', we'll use page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      initialState: { pageIndex: 0 },
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,

      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    usePagination
  );

  return (
    <table
      {...getTableProps()}
      className="table table-auto w-full mt-4 text-white bg-gray-900 rounded"
    >
      <thead className="p-8 table-header-group">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <>
                <th
                  className="pt-3 border-b border-r  border-gray-800 p-3"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                  <div className="text-black ">
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
                </th>
              </>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="pt-3" {...getTableBodyProps()}>
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className="text-center w-auto border-b border-1 border-gray-800  "
              {...row.getRowProps()}
            >
              {row.cells.map((cell) => {
                return (
                  <td className="text-white p-4" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <div className="pagination min-w-full  text-center px-2 py-2  justify-center">
        <div className="mx-auto p-2">
          <button
            className=" rounded-full p-2 items-center bg-green-600"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"Page 1"}
          </button>
          <button
            className=" rounded-full p-2 items-center bg-green-600 ml-2"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            {"Back"}
          </button>{" "}
          <button
            className=" rounded-full p-2 items-center bg-green-600 "
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {"Next"}
          </button>{" "}
          <button
            className=" rounded-full p-2 items-center bg-green-600 "
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {`Page ` + pageCount}
          </button>
          <span className="px-2 ">
            Page
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <select
            className="rounded-xl text-black shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option
                className="text-gray-700  px-4 py-2 text-sm"
                key={pageSize}
                value={pageSize}
              >
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </div>
    </table>
  );
}

function SecurityActivity() {
  const data = React.useMemo(() => makeData(7), []);

  return (
    <>
      <Table
        columns={[
          {
            Header: "Security Logs",
            columns: [
              {
                Header: "Date",
                accessor: "date",
                filterable: true,
              },
              {
                Header: "Time",
                accessor: "time",

                // Use our custom `fuzzyText` filter on this column
              },
              {
                Header: "Category",
                accessor: "category",
              },
              {
                Header: "Type",
                accessor: "type",

                Filter: SelectColumnFilter,
                filter: "includes",
              },
              {
                Header: "Retries",
                accessor: "retries",
              },
            ],
          },
        ]}
        data={data}
      />
    </>
  );
}

export default SecurityActivity;
