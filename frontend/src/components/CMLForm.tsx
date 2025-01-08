import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  InputAdornment,
  CircularProgress,
  Grid,
  Paper,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { NumbersOutlined, DescriptionOutlined } from "@mui/icons-material";
import { AddCMLInterface } from "../interface/cml";
import { useParams } from "react-router-dom";

interface CMLFormProps {
  onSubmit: (data: AddCMLInterface) => Promise<void>;
  defaultValues?: AddCMLInterface;
  buttonLabel: string;
  isSubmitting: boolean;
}

const CMLForm: React.FC<CMLFormProps> = ({
  onSubmit,
  defaultValues,
  buttonLabel,
  isSubmitting,
}) => {
  const { lineNumber } = useParams<{ lineNumber: string }>();

  const {
    handleSubmit,
    control,
    setValue, // ให้สามารถตั้งค่า `line_number`
    formState: { errors },
  } = useForm<AddCMLInterface>({
    defaultValues: {
      ...defaultValues,
      line_number: lineNumber || "",
    },
  });

  React.useEffect(() => {
    if (lineNumber) {
      setValue("line_number", lineNumber);
    }
  }, [lineNumber, setValue]);

  const formFields = [
    {
      name: "cml_number",
      label: "CML Number",
      icon: <NumbersOutlined />,
    },
    {
      name: "cml_description",
      label: "CML Description",
      icon: <DescriptionOutlined />,
    },
  ];

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h5" fontWeight="bold" align="center" mb={4}>
          CML Information
        </Typography>

        <Grid container spacing={3}>
          {/* Line Number (Read-only) */}
          <Grid item xs={12}>
            <TextField
              label="Line Number"
              variant="outlined"
              fullWidth
              value={lineNumber || "N/A"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <NumbersOutlined />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
          </Grid>

          {/* Other Fields */}
          {formFields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Controller
                name={field.name as keyof AddCMLInterface}
                control={control}
                rules={{ required: `กรุณากรอก ${field.label}` }}
                render={({ field: controllerField }) => (
                  <TextField
                    {...controllerField}
                    label={field.label}
                    variant="outlined"
                    fullWidth
                    type={field.name === "cml_number" ? "number" : "text"} // Use type "number" for cml_number
                    error={!!errors[field.name as keyof AddCMLInterface]}
                    helperText={
                      errors[field.name as keyof AddCMLInterface]?.message
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {field.icon}
                        </InputAdornment>
                      ),
                    }}
                    onChange={(e) =>
                      controllerField.onChange(
                        field.name === "cml_number"
                          ? Number(e.target.value)
                          : e.target.value // Convert to Number if "cml_number"
                      )
                    }
                  />
                )}
              />
            </Grid>
          ))}
        </Grid>

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
              buttonLabel
            )}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default CMLForm;
