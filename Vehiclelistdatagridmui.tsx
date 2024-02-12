// UserTable.tsx

import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import axios from "axios";

interface UserData {
  id: number;
  name: string;
  age: number;
  email: string;
  // Add more fields as needed
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "age", headerName: "Age", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  // Add more columns as needed
];

const UserTable: React.FC = () => {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get<UserData[]>("/api/users"); // Adjust the API endpoint accordingly
      const userData = response.data.map((user) => ({
        id: user.id,
        name: user.name,
        age: user.age,
        email: user.email,
        // Map other fields as needed
      }));
      setRows(userData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSize={5} // Change as per your requirement
        rowsPerPageOptions={[5, 10, 20]} // Change as per your requirement
      />
    </div>
  );
};

export default UserTable;

npm install @mui/x-data-grid axios
