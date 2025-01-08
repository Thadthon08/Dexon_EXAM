import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import Swal from "sweetalert2";
import CMLForm from "../components/CMLForm"; // ใช้ Component ฟอร์มของ CML
import { useNavigate } from "react-router-dom";
import { AddCMLInterface } from "../interface/cml";
import { AddCML } from "../services/cml";

const AddCMLForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: AddCMLInterface) => {
    setIsSubmitting(true);
    try {
      const response = await AddCML(data);
      if (response.status) {
        Swal.fire({
          title: "เพิ่มข้อมูล CML สำเร็จ",
          text: "ข้อมูล CML ได้ถูกบันทึกแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        });
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
      navigate(-1);
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
        <CMLForm
          onSubmit={onSubmit}
          buttonLabel="Add CML"
          isSubmitting={isSubmitting}
        />
      </Paper>
    </Container>
  );
};

export default AddCMLForm;
