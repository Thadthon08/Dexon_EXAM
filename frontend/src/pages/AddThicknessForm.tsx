import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { ThicknessInterface } from "../interface/thickness";
import { AddThickness } from "../services/thickness";
import ThicknessForm from "../components/ThicknessForm";

const AddThicknessForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { lineNumber, cmlNumber, tpNumber } = useParams<{
    lineNumber: string;
    cmlNumber: string;
    tpNumber: string;
  }>(); // ดึงค่า lineNumber, cmlNumber, tpNumber จาก URL

  const onSubmit = async (data: ThicknessInterface) => {
    setIsSubmitting(true);
    try {
      const thicknessData: ThicknessInterface = {
        ...data,
        line_number: lineNumber!,
        cml_number: Number(cmlNumber),
        tp_number: Number(tpNumber),
      };

      const response = await AddThickness(thicknessData);
      if (response.status) {
        Swal.fire({
          title: "เพิ่มข้อมูล Thickness สำเร็จ",
          text: "ข้อมูล Thickness ได้ถูกบันทึกแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(`/view-thickness/${lineNumber}/${cmlNumber}/${tpNumber}`); // กลับไปหน้าแสดงข้อมูล Thickness
      } else {
        throw new Error(response.message || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: "กรุณาลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: { xs: 2, sm: 4 },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
          backgroundColor: "#f5f5f5",
          maxHeight: "auto",
        }}
      >
        <ThicknessForm
          onSubmit={onSubmit}
          defaultValues={{
            line_number: lineNumber!,
            cml_number: Number(cmlNumber),
            tp_number: Number(tpNumber),
            inspection_date: "",
            actual_thickness: 0,
          }}
          buttonLabel="Add Thickness"
          isSubmitting={isSubmitting}
        />
      </Paper>
    </Container>
  );
};

export default AddThicknessForm;
