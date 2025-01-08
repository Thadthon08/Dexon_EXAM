import React, { useState } from "react";
import { Container, Paper } from "@mui/material";
import { InfoInterface } from "../interface/Info";
import { AddInfo } from "../services/Info";
import Swal from "sweetalert2";
import InfoForm from "../components/InfoForm";
import { useNavigate } from "react-router-dom";

const AddInfoForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: InfoInterface) => {
    setIsSubmitting(true);
    try {
      const response = await AddInfo(data);
      if (response.status) {
        Swal.fire({
          title: "เพิ่มข้อมูลสำเร็จ",
          text: "ข้อมูลได้ถูกบันทึกแล้ว",
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
      navigate("/index");
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
        <InfoForm
          onSubmit={onSubmit}
          buttonLabel="Add Info"
          isSubmitting={isSubmitting}
        />
      </Paper>
    </Container>
  );
};

export default AddInfoForm;
