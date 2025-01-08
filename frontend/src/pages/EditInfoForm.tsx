import React, { useState, useEffect } from "react";
import { Container, Paper, Box, Button } from "@mui/material";
import { InfoInterface } from "../interface/Info";
import { GetInfoByLineNumber, UpdateInfo, DeleteInfo } from "../services/Info";
import Swal from "sweetalert2";
import InfoForm from "../components/InfoForm";
import { useParams, useNavigate } from "react-router-dom";

const EditInfoForm: React.FC = () => {
  const { lineNumber } = useParams<{ lineNumber: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [defaultValues, setDefaultValues] = useState<
    InfoInterface | undefined
  >();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await GetInfoByLineNumber(lineNumber!);
        if (res.status && res.data) {
          setDefaultValues(res.data);
        } else {
          Swal.fire({
            title: "ไม่พบข้อมูล",
            text: "กรุณาตรวจสอบ Line Number",
            icon: "error",
            confirmButtonText: "OK",
          });
          navigate("/index");
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถดึงข้อมูลได้",
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate("/index");
      }
    };
    fetchInfo();
  }, [lineNumber, navigate]);

  const onSubmit = async (data: InfoInterface) => {
    setIsSubmitting(true);

    try {
      const response = await UpdateInfo(lineNumber!, data);
      if (response.status) {
        Swal.fire({
          title: "แก้ไขข้อมูลสำเร็จ",
          text: "ข้อมูลได้ถูกบันทึกแล้ว",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/index");
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

  const onDelete = async () => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "การลบนี้จะไม่สามารถกู้คืนข้อมูลได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "ใช่, ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsSubmitting(true);
        try {
          const response = await DeleteInfo(lineNumber!);
          if (response.status) {
            Swal.fire({
              title: "ลบข้อมูลสำเร็จ",
              text: "ข้อมูลได้ถูกลบเรียบร้อย",
              icon: "success",
              confirmButtonText: "OK",
            });
            navigate("/index");
          } else {
            throw new Error(response.message || "เกิดข้อผิดพลาด");
          }
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถลบข้อมูลได้",
            icon: "error",
            confirmButtonText: "OK",
          });
        } finally {
          setIsSubmitting(false);
        }
      }
    });
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
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 55,
            right: 50,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            onClick={onDelete}
            disabled={isSubmitting}
            sx={{ fontWeight: "bold" }}
          >
            {isSubmitting ? "Deleting..." : "Delete Info"}
          </Button>
        </Box>

        {defaultValues ? (
          <>
            <InfoForm
              onSubmit={onSubmit}
              defaultValues={defaultValues}
              buttonLabel="Edit Info"
              isSubmitting={isSubmitting}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </Paper>
    </Container>
  );
};

export default EditInfoForm;
