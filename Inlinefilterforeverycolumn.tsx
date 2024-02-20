import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

const DataGridComponent: React.FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

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

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ ...filters, [field]: value });
  };

  useEffect(() => {
    const filteredData = rows.filter(row => {
      return Object.entries(filters).every(([field, value]) => {
        const cellValue = row[field] as string;
        return cellValue.toLowerCase().includes(value.toLowerCase());
      });
    });
    setFilteredRows(filteredData);
  }, [filters, rows]);

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
      <div style={{ marginBottom: '8px' }}>
        {columns.map(column => (
          <input
            key={column.field}
            type="text"
            placeholder={`Filter ${column.headerName}`}
            onChange={(e) => handleFilterChange(column.field, e.target.value)}
            style={{ marginRight: '8px', padding: '4px' }}
          />
        ))}
      </div>
      <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
    </div>
  );
};

export default DataGridComponent;
