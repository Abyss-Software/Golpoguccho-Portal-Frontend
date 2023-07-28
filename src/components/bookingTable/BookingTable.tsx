import { ThemeContext } from '@/contexts/ThemeContext';
import { TextInput } from '@mantine/core';
import { useContext, useMemo, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';
import SearchEyeIcon from 'remixicon-react/SearchEyeLineIcon';

function BookingsTable({ data, columns }: { data: RowData[]; columns: any }) {
  const { darkMode } = useContext(ThemeContext);

  const [searchText, setSearchText] = useState('');
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  const customFilter = (rows: RowData[], searchValue: string) => {
    return rows.filter((row) =>
      Object.values(row).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  };
  const filteredData = customFilter(data, searchText);
  const navigate = useNavigate();
  const handleRowClick = (row: RowData) => {
    console.log(row);
    navigate(`/booking-details`);
  };

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

export default BookingsTable;

export interface RowData {
  id: number;
  title: string;
  clientName: string;
  contactNumber: string;
  email: string;
  eventCount: number;
  paymentStatus: string;
  bookingStatus: string;
}
