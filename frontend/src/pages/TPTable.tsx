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
  IconButton,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { TPInterface } from "../interface/tp";
import { DeleteTP, GetTPByLineAndCMLNumber } from "../services/tp";

export default function TPTable() {
  const { lineNumber, cmlNumber } = useParams<{
    lineNumber: string;
    cmlNumber: string;
  }>(); // ดึงค่า lineNumber และ cmlNumber จาก URL
  const [tpData, setTPData] = useState<TPInterface[]>([]);
  const navigate = useNavigate();

  const getTPData = async () => {
    let res = await GetTPByLineAndCMLNumber(lineNumber!, Number(cmlNumber));
    if (res.status && res.data) {
      setTPData(res.data);
    } else {
      setTPData([]);
    }
  };

  const handleDeleteTP = async (tpNumber: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การลบนี้จะไม่สามารถกู้คืนได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await DeleteTP(lineNumber!, Number(cmlNumber), tpNumber);
        if (res.status) {
          Swal.fire("ลบข้อมูลสำเร็จ!", res.message, "success");
          getTPData(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
        } else {
          Swal.fire("เกิดข้อผิดพลาด", res.message, "error");
        }
      }
    });
  };

  useEffect(() => {
    getTPData();
  }, [lineNumber, cmlNumber]);

  const columns = [
    { id: "tp_number", label: "Test Point Number" },
    { id: "tp_description", label: "Test Point Description" },
    { id: "note", label: "Note" },
    { id: "actions", label: "Actions" },
  ];

  const handleViewDetail = (tpNumber: number) => {
    navigate(`/view-thickness/${lineNumber}/${cmlNumber}/${tpNumber}`);
  };

  const handleEditTP = (tpNumber: number) => {
    navigate(`/edit-tp/${lineNumber}/${cmlNumber}/${tpNumber}`);
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
          onClick={() => navigate(`/add-tp/${lineNumber}/${cmlNumber}`)}
        >
          Add Test Point
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
              {tpData.length > 0 ? (
                tpData.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) =>
                      column.id === "actions" ? (
                        <TableCell key={column.id}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleViewDetail(row.tp_number || 0)}
                            title="View"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleEditTP(row.tp_number || 0)}
                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteTP(row.tp_number || 0)}
                            title="Delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id}>
                          {row[column.id as keyof TPInterface]}
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
