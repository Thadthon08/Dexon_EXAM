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
  Typography,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { GetCMLByLineNumber, DeleteCML } from "../services/cml";
import { CMLInterface } from "../interface/cml";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import TitleHeader from "../components/TitleHeader";

export default function CMLTable() {
  const { lineNumber } = useParams<{ lineNumber: string }>();
  const [cmlData, setCMLData] = useState<CMLInterface[]>([]);
  const navigate = useNavigate();

  const getCMLData = async () => {
    let res = await GetCMLByLineNumber(lineNumber!);
    if (res.status && res.data) {
      setCMLData(res.data);
    } else {
      setCMLData([]);
    }
  };

  const handleDelete = async (lineNumber: string, cmlNumber: number) => {
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
        const res = await DeleteCML(lineNumber, cmlNumber);
        if (res.status) {
          Swal.fire("ลบข้อมูลสำเร็จ!", res.message, "success");
          getCMLData(); // โหลดข้อมูลใหม่หลังจากลบสำเร็จ
        } else {
          Swal.fire("เกิดข้อผิดพลาด", res.message, "error");
        }
      }
    });
  };

  useEffect(() => {
    getCMLData();
  }, []);

  const columns = [
    { id: "cml_number", label: "CML Number" },
    { id: "cml_description", label: "CML Description" },
    { id: "actual_outside_diameter", label: "Actual Outside Diameter (mm)" },
    { id: "design_thickness", label: "Design Thickness (mm)" },
    { id: "structural_thickness", label: "Structural Thickness (mm)" },
    { id: "required_thickness", label: "Required Thickness (mm)" },
    { id: "actions", label: "Actions" },
  ];

  const handleViewDetail = (cmlNumber: number) => {
    navigate(`/view-tp/${lineNumber}/${cmlNumber}`);
  };

  const handleEditCML = (cmlNumber: number) => {
    navigate(`/edit-cml/${lineNumber}/${cmlNumber}`);
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
          onClick={() => navigate(`/add-cml/${lineNumber}`)}
        >
          Add CML
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
              {cmlData.length > 0 ? (
                cmlData.map((row, index) => (
                  <TableRow key={index}>
                    {columns.map((column) =>
                      column.id === "actions" ? (
                        <TableCell key={column.id}>
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => handleViewDetail(row.cml_number)}
                            title="View"
                          >
                            <ViewIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="secondary"
                            onClick={() => handleEditCML(row.cml_number)}
                            title="Edit"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() =>
                              handleDelete(row.line_number, row.cml_number)
                            }
                            title="Delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      ) : (
                        <TableCell key={column.id}>
                          {row[column.id as keyof CMLInterface] || "N/A"}
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
