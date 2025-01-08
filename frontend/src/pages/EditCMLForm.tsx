import React, { useState, useEffect } from "react";
import { Container, Paper } from "@mui/material";
import { AddCMLInterface, CMLInterface } from "../interface/cml";
import { GetCMLByLineNumber, UpdateCML } from "../services/cml";
import Swal from "sweetalert2";
import CMLForm from "../components/CMLForm";
import { useParams, useNavigate } from "react-router-dom";

const EditCMLForm: React.FC = () => {
  const { lineNumber, cmlNumber } = useParams<{
    lineNumber: string;
    cmlNumber: string;
  }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultValues, setDefaultValues] = useState<
    CMLInterface | undefined
  >();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCML = async () => {
      try {
        const res = await GetCMLByLineNumber(lineNumber!); // เรียกข้อมูล CML ทั้งหมดของ lineNumber
        if (res.status && res.data) {
          const cml = res.data.find(
            (cml) => cml.cml_number === Number(cmlNumber)
          );
          if (cml) {
            setDefaultValues(cml);
          } else {
            Swal.fire({
              title: "ไม่พบข้อมูล",
              text: "กรุณาตรวจสอบ CML Number",
              icon: "error",
              confirmButtonText: "OK",
            });
            navigate(`/detail/${lineNumber}`);
          }
        } else {
          Swal.fire({
            title: "ไม่พบข้อมูล",
            text: "กรุณาตรวจสอบ Line Number",
            icon: "error",
            confirmButtonText: "OK",
          });
          navigate(`/detail/${lineNumber}`);
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถดึงข้อมูลได้",
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate(`/detail/${lineNumber}`);
      }
    };
    fetchCML();
  }, [lineNumber, cmlNumber, navigate]);

  const onSubmit = async (data: AddCMLInterface) => {
    setIsSubmitting(true);
    try {
      const response = await UpdateCML(lineNumber!, Number(cmlNumber), {
        cml_number: Number(cmlNumber), // ใส่ cml_number
        line_number: lineNumber!, // ใส่ line_number
        cml_description: data.cml_description, // ค่าที่แก้ไข
      });
      if (response.status) {
        Swal.fire({
          title: "แก้ไขข้อมูลสำเร็จ",
          text: "ข้อมูลได้ถูกบันทึกแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(`/detail/${lineNumber}`);
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
          <CMLForm
            onSubmit={onSubmit}
            defaultValues={defaultValues}
            buttonLabel="Edit CML"
            isSubmitting={isSubmitting}
          />
        ) : (
          <p>Loading...</p>
        )}
      </Paper>
    </Container>
  );
};

export default EditCMLForm;
