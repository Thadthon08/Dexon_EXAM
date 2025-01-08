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
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { ThicknessInterface } from "../interface/thickness";
import {
  DeleteThickness,
  GetThicknessByLineCMLAndTPNumber,
} from "../services/thickness";

export default function ThicknessTable() {
  const { lineNumber, cmlNumber, tpNumber } = useParams<{
    lineNumber: string;
    cmlNumber: string;
    tpNumber: string;
  }>(); // ดึงค่า lineNumber, cmlNumber, tpNumber จาก URL
  const [thicknessData, setThicknessData] = useState<ThicknessInterface[]>([]);
  const navigate = useNavigate();

  // ดึงข้อมูล Thickness จาก API
  const getThicknessData = async () => {
    const res = await GetThicknessByLineCMLAndTPNumber(
      lineNumber!,
      Number(cmlNumber),
      Number(tpNumber)
    );
    if (res.status && res.data) {
      setThicknessData(res.data);
    } else {
      setThicknessData([]);
    }
  };

  // ฟังก์ชันลบข้อมูล Thickness โดยใช้ id
  const handleDeleteThickness = async (id: number) => {
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
        const res = await DeleteThickness(id);
        if (res.status) {
          Swal.fire("ลบข้อมูลสำเร็จ!", res.message, "success");
          getThicknessData(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
        } else {
          Swal.fire("เกิดข้อผิดพลาด", res.message, "error");
        }
      }
    });
  };

  useEffect(() => {
    getThicknessData(); // ดึงข้อมูลเมื่อ component ถูก mount
  }, [lineNumber, cmlNumber, tpNumber]);

  const columns = [
    { id: "inspection_date", label: "Inspection Date" },
    { id: "actual_thickness", label: "Actual Thickness (mm)" },
    { id: "actions", label: "Actions" },
  ];

  const handleEditThickness = (id: number) => {
    navigate(`/edit-thickness/${id}`);
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
          onClick={() =>
            navigate(`/add-thickness/${lineNumber}/${cmlNumber}/${tpNumber}`)
          }
        >
          Add Thickness
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
              {thicknessData.length > 0 ? (
                thicknessData.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) =>
                      column.id === "actions" ? (
                        <TableCell key={column.id}>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleEditThickness(row.id)}
                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteThickness(row.id)}
                            title="Delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id}>
                          {column.id === "inspection_date"
                            ? format(
                                new Date(row.inspection_date),
                                "yyyy-MM-dd"
                              )
                            : row[column.id as keyof ThicknessInterface] ||
                              "N/A"}
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
