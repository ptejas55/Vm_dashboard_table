import React from 'react';
import { GridFilterItem } from '@mui/x-data-grid';

interface FilterRowProps {
  columns: any[];
  onFilterChange: (filter: GridFilterItem) => void;
}

const FilterRow: React.FC<FilterRowProps> = ({ columns, onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>, column: any) => {
    const filter: GridFilterItem = {
      columnField: column.field,
      operatorValue: 'contains',
      value: e.target.value.trim(),
    };
    onFilterChange(filter);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '8px' }}>
      {columns.map(column => (
        <div key={column.field} style={{ marginRight: '8px' }}>
          <input
            type="text"
            placeholder={`Filter ${column.headerName}`}
            onChange={(e) => handleFilterChange(e, column)}
            style={{ padding: '4px' }}
          />
        </div>
      ))}
    </div>
  );
};

export default FilterRow;


---------------------------------------
  import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridFilterItem } from '@mui/x-data-grid';
import axios from 'axios';
import FilterRow from './FilterRow';

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

  const handleFilterChange = (filter: GridFilterItem) => {
    const filteredData = rows.filter(row => {
      if (!filter.value) return true;
      const cellValue = row[filter.columnField] as string;
      return cellValue.toLowerCase().includes(filter.value.toLowerCase());
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
      <FilterRow columns={columns} onFilterChange={handleFilterChange} />
      <DataGrid rows={filteredRows} columns={columns} pageSize={5} />
    </div>
  );
};

export default DataGridComponent;

