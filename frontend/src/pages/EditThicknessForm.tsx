import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import ThicknessForm from "../components/ThicknessForm";
import { ThicknessInterface } from "../interface/thickness";
import { GetThicknessById, UpdateThickness } from "../services/thickness";

const EditThicknessForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultValues, setDefaultValues] = useState<
    ThicknessInterface | undefined
  >();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThickness = async () => {
      try {
        const res = await GetThicknessById(Number(id));
        if (res.status && res.data) {
          setDefaultValues(res.data);
        } else {
          Swal.fire({
            title: "ไม่พบข้อมูล",
            text: "กรุณาตรวจสอบข้อมูล",
            icon: "error",
            confirmButtonText: "OK",
          });
          navigate(-1);
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถดึงข้อมูลได้",
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate(-1);
      }
    };
    fetchThickness();
  }, [id, navigate]);

  const onSubmit = async (data: ThicknessInterface) => {
    setIsSubmitting(true);
    try {
      const response = await UpdateThickness(Number(id), {
        inspection_date: data.inspection_date,
        actual_thickness: data.actual_thickness,
      });
      if (response.status) {
        Swal.fire({
          title: "แก้ไขข้อมูลสำเร็จ",
          text: "ข้อมูลได้ถูกบันทึกแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(-1);
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

  console.log(defaultValues);

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
        {defaultValues ? (
          <ThicknessForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            buttonLabel="Edit Thickness"
            isSubmitting={isSubmitting}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Paper>
    </Container>
  );
};

export default EditThicknessForm;
