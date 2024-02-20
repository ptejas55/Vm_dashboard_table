import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setRows(response.data);
      setFilteredRows(response.data); // initially set filteredRows to all rows
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    const filteredData = rows.filter(row => {
      return Object.values(row).some((value: string) =>
        value.toLowerCase().includes(keyword)
      );
    });
    setFilteredRows(filteredData);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'username', headerName: 'Username', width: 150 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 150 },
    // Add more columns as needed
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <input
        type="text"
        placeholder="Search..."
        onChange={handleFilterChange}
        style={{ marginBottom: '1rem', padding: '0.5rem' }}
      />
      <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
    </div>
  );
};

export default DataGridComponent;
