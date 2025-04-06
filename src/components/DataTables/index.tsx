import { Spinner } from "@heroui/react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { TbError404 } from "react-icons/tb";

interface TableProps<TData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: ColumnDef<TData, any>[]; // Menggunakan any agar fleksibel
  data: TData[];
  isLoading: boolean;
}

const DataTables = <TData,>({
  columns,
  data,
  isLoading,
}: TableProps<TData>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto relative rounded-md">
      {isLoading ? (
        <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
          <Spinner
            color="primary"
            size="lg"
            variant="wave"
            className="scale-150"
          />
        </div>
      ) : null}
      <table className="w-full border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const meta = header.column.columnDef.meta as {
                  align?: string;
                  colSpan?: number;
                  rowSpan?: number;
                };
                return (
                  <th
                    key={header.id}
                    colSpan={meta?.colSpan || 1}
                    rowSpan={meta?.rowSpan || 1}
                    className={`border-b-2 border-accent-gray p-2 text-${meta?.align || "left"} text-sm`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        {table.getRowModel().rows.length > 0 ? (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // Ambil meta align untuk body atau default ke 'left'
                  const align =
                    (cell.column.columnDef.meta as { align: string })?.align ||
                    "left";
                  const cellWidth =
                    (cell.column.columnDef.meta as { cellWidth: string })
                      ?.cellWidth || "auto";
                  return (
                    <td
                      key={cell.id}
                      className={`px-2 py-4 text-xs max-w-72 border-b-2 border-accent-gray text-${align} w-${cellWidth}`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan={columns.length} className="py-4">
                <div className="w-full flex items-center justify-center flex-col text-primary opacity-20">
                  <TbError404 size={120} />
                  <span className="italic text-xl font-semibold">
                    No Data Found
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
  );
};

export default DataTables;
