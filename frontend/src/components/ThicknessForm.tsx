import React from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ThicknessInterface } from "../interface/thickness";

interface ThicknessFormProps {
  onSubmit: (data: ThicknessInterface) => Promise<void>;
  defaultValues?: Partial<ThicknessInterface>;
  buttonLabel: string;
  isSubmitting: boolean;
}

const ThicknessForm: React.FC<ThicknessFormProps> = ({
  onSubmit,
  defaultValues,
  buttonLabel,
  isSubmitting,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ThicknessInterface>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h5" fontWeight="bold" align="center" mb={4}>
        Thickness Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="inspection_date"
            control={control}
            rules={{ required: "กรุณากรอกวันที่ตรวจสอบ" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Inspection Date"
                type="date"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.inspection_date}
                helperText={errors.inspection_date?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="actual_thickness"
            control={control}
            rules={{ required: "กรุณากรอก Actual Thickness" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Actual Thickness (mm)"
                type="number"
                fullWidth
                variant="outlined"
                error={!!errors.actual_thickness}
                helperText={errors.actual_thickness?.message}
              />
            )}
          />
        </Grid>
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
  );
};

export default ThicknessForm;
