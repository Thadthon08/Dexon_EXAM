import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { GetInfo } from "../services/Info";
import { InfoInterface } from "../interface/Info";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const [info, setInfo] = useState<InfoInterface[]>([]);
  const navigate = useNavigate();

  const getInfo = async () => {
    let res = await GetInfo();
    if (res.status && res.data) {
      setInfo(res.data);
    } else {
      setInfo([]);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const columns = [
    { id: "line_number", label: "Line Number" },
    { id: "location", label: "Location" },
    { id: "from", label: "From" },
    { id: "to", label: "To" },
    { id: "pipe_size", label: "Pipe Size (in)" },
    { id: "material", label: "Material" },
    { id: "service", label: "service" },
    { id: "actions", label: "Actions" },
  ];

  const handleClickInfo = (lineNumber: string) => {
    console.log(`Editing line number: ${lineNumber}`);
    navigate(`/edit/${lineNumber}`);
  };

  const handleClickDetail = (lineNumber: string) => {
    console.log(`Viewing details for line number: ${lineNumber}`);
    navigate(`/detail/${lineNumber}`);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        p: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 4,
        }}
      >
        <Button
          variant="contained"
          sx={{ borderRadius: 1 }}
          onClick={() => navigate("/add-info")}
        >
          Add Piping
        </Button>
      </Box>

      <Box sx={{ bgcolor: "#fff", p: 2, borderRadius: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ fontWeight: "bold" }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {info.length > 0 ? (
                info.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) =>
                      column.id === "actions" ? (
                        <TableCell key={column.id}>
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{ m: 1 }}
                            onClick={() => handleClickInfo(row.line_number)}
                          >
                            Info
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            sx={{ m: 1 }}
                            onClick={() => handleClickDetail(row.line_number)}
                          >
                            Detail
                          </Button>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id}>
                          {row[column.id as keyof InfoInterface]}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}
