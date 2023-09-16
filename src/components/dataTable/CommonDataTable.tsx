import { ThemeContext } from '@/contexts/ThemeContext';
import { TextInput } from '@mantine/core';
import { useContext, useMemo, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import SearchEyeIcon from 'remixicon-react/SearchEyeLineIcon';

function CommonDataTable<T>({
  data,
  columns,
  handleRowClick,
  title,
}: {
  data: T[];
  columns: any;
  handleRowClick?: (row: T) => void;
  title?: any;
}) {
  const { darkMode } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  // const customFilter = (rows: T[], searchValue: string) => {
  //   return rows.filter((row) =>
  //     Object.values(row as any).some(
  //       (value) =>
  //         value &&
  //         value.toString().toLowerCase().includes(searchValue.toLowerCase())
  //     )
  //   );
  // };

  //ts-ignore
  const customFilter = (rows: T[], searchValue: string) => {
    return rows.filter((row) => {
      return (Object.keys(row) as Array<keyof T>).some((key) => {
        const value = (row as any)[key];
        if (value && typeof value === 'object') {
          return Object.values(value).some((nestedValue) =>
            nestedValue
              ? nestedValue
                  .toString()
                  .toLowerCase()
                  .includes(searchValue.toLowerCase())
              : false
          );
        } else {
          return value
            ? value.toString().toLowerCase().includes(searchValue.toLowerCase())
            : false;
        }
      });
    });
  };

  const filteredData = customFilter(data, searchText);

  // Custom theme for the table
  useMemo(() => {
    createTheme('dark', {
      background: {
        default: 'transparent',
      },
    });
  }, []);

  const commonHeadCellStyles = useMemo(() => {
    const styles = {
      headCells: {
        style: {
          backgroundColor: darkMode ? 'black' : 'white',
          color: darkMode ? 'white' : 'black',
        },
      },
    };

    if (darkMode) {
      styles.headCells.style.color = 'white';
      styles.headCells.style.backgroundColor = '#1e1e1e';
    }

    return styles;
  }, [darkMode]);

  return (
    <div className="p-2  border-4 border-sky-500">
      <DataTable
        fixedHeader
        fixedHeaderScrollHeight="400px"
        subHeader
        title={title}
        subHeaderComponent={
          <TextInput
            className="w-full md:w-fit"
            size="md"
            type="text"
            placeholder="Search Keyword"
            value={searchText}
            onChange={handleSearch}
            icon={<SearchEyeIcon />}
          />
        }
        highlightOnHover
        pagination
        paginationPerPage={20}
        pointerOnHover
        responsive
        striped={!darkMode}
        columns={columns}
        data={filteredData}
        theme={darkMode ? 'dark' : 'light'}
        customStyles={commonHeadCellStyles}
        onRowClicked={handleRowClick}
      />
    </div>
  );
}

export default CommonDataTable;
