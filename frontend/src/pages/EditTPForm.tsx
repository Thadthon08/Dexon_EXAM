import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import { TPInterface } from "../interface/tp";
import { GetTPByLineAndCMLNumber, UpdateTP } from "../services/tp";
import Swal from "sweetalert2";
import TPForm from "../components/TPForm";
import { useParams, useNavigate } from "react-router-dom";

const EditTPForm: React.FC = () => {
  const { lineNumber, cmlNumber, tpNumber } = useParams<{
    lineNumber: string;
    cmlNumber: string;
    tpNumber: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultValues, setDefaultValues] = useState<TPInterface | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTP = async () => {
      try {
        const res = await GetTPByLineAndCMLNumber(
          lineNumber!,
          Number(cmlNumber)
        );
        if (res.status && res.data) {
          const tp = res.data.find((tp) => tp.tp_number === Number(tpNumber));
          if (tp) {
            setDefaultValues(tp);
          } else {
            Swal.fire({
              title: "ไม่พบข้อมูล",
              text: "กรุณาตรวจสอบ Test Point Number",
              icon: "error",
              confirmButtonText: "OK",
            });
            navigate(-1);
          }
        } else {
          Swal.fire({
            title: "ไม่พบข้อมูล",
            text: "กรุณาตรวจสอบ Line Number และ CML Number",
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
    fetchTP();
  }, [lineNumber, cmlNumber, tpNumber, navigate]);

  const onSubmit = async (data: TPInterface) => {
    setIsSubmitting(true);
    try {
      const response = await UpdateTP(
        lineNumber!,
        Number(cmlNumber),
        Number(tpNumber),
        data
      );
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
          <TPForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            buttonLabel="Edit Test Point"
            isSubmitting={isSubmitting}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Paper>
    </Container>
  );
};

export default EditTPForm;
