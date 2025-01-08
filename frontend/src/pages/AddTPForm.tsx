import React, { useState } from "react";
import { Container, Paper, Box, Button, CircularProgress } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import { TPInterface } from "../interface/tp";
import { AddTP } from "../services/tp";
import { TextField } from "@mui/material";

const AddTPForm: React.FC = () => {
  const { lineNumber, cmlNumber } = useParams<{
    lineNumber: string;
    cmlNumber: string;
  }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit, control } = useForm<TPInterface>({
    defaultValues: {
      tp_number: undefined,
      cml_number: Number(cmlNumber),
      line_number: lineNumber || "",
      tp_description: undefined,
      note: "",
    },
  });

  const onSubmit = async (data: TPInterface) => {
    setIsSubmitting(true);
    try {
      const response = await AddTP(data);
      if (response.status) {
        Swal.fire({
          title: "เพิ่มข้อมูลสำเร็จ",
          text: "Test Point ได้ถูกบันทึกแล้ว",
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
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={{ mb: 4 }}>
            <h2 style={{ textAlign: "center" }}>Add Test Point</h2>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <Controller
              name="tp_number"
              control={control}
              rules={{ required: "กรุณากรอก TP Number" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="number"
                  label="TP Number"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="tp_description"
              control={control}
              rules={{ required: "กรุณากรอก TP Description" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="TP Description"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Note"
                  variant="outlined"
                  fullWidth
                />
              )}
            />
          </Box>
          <Box mt={4}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isSubmitting}
              sx={{
                height: "56px",
                borderRadius: 2,
                fontWeight: "bold",
                fontSize: "1rem",
                backgroundColor: "primary.main",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Add Test Point"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddTPForm;
