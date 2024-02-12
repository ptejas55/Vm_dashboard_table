import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, IconButton, TextField, InputAdornment, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import Pagination from '@mui/material/Pagination';

interface Row {
  id: number;
  name: string;
  data1: string;
  data2: string;
  // Add more data properties as needed
}

const rows: Row[] = [
  { id: 1, name: 'Row 1', data1: 'Data 1-1', data2: 'Data 2-1' },
  { id: 2, name: 'Row 2', data1: 'Data 1-2', data2: 'Data 2-2' },
  // Add more rows as needed
];

const DataTable: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Change as needed

  const handleChangePage = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setCurrentPage(newPage);
  };

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const paginatedRows = filteredRows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item>
          <TextField
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <ViewWeekIcon />
          </IconButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Data 1</TableCell>
              <TableCell>Data 2</TableCell>
              {/* Add more table headers as needed */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.data1}</TableCell>
                <TableCell>{row.data2}</TableCell>
                {/* Render more table cells for additional data properties */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredRows.length / itemsPerPage)}
        page={currentPage}
        onChange={handleChangePage}
      />
    </>
  );
};

export default DataTable;
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
