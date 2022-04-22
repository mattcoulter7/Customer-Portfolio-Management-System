import React from "react"
import { Column, useSortBy, useTable } from "react-table"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  TableCaption,
} from "@chakra-ui/react"
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons"
import { Customer } from "../types/types"

interface Props {
  customers: Array<Customer>
}

const CustomTable: React.FC<Props> = ({ customers }) => {
  const range: number = 20
  const data: Array<Customer> = React.useMemo(
    () => customers.slice(0, range),
    [customers],
  )
  const columns: Column<Customer>[] = React.useMemo(
    () => [
      {
        Header: "first name",
        accessor: "firstName",
      },
      {
        Header: "last name",
        accessor: "lastName",
      },
      {
        Header: "city",
        accessor: (row) => row.address.city,
      },
      {
        Header: "joined at",
        accessor: (row) => row.createdAt.slice(0, 10),
      },
    ],
    [],
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy)

  return (
    <>
      <Table {...getTableProps()}>
        <TableCaption>
          Showing {customers.length > range ? range : customers.length} of{" "}
          {customers.length} customers
        </TableCaption>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                ))}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </>
  )
}

export default CustomTable
