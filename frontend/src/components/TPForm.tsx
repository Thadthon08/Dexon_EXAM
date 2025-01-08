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
import { TPInterface } from "../interface/tp";

interface TPFormProps {
  onSubmit: (data: TPInterface) => Promise<void>;
  defaultValues?: TPInterface;
  buttonLabel: string;
  isSubmitting: boolean;
}

const TPForm: React.FC<TPFormProps> = ({
  onSubmit,
  defaultValues,
  buttonLabel,
  isSubmitting,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TPInterface>({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Typography variant="h5" fontWeight="bold" align="center" mb={4}>
        Test Point Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="tp_description"
            control={control}
            rules={{ required: "กรุณากรอก Test Point Description" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Test Point Description"
                fullWidth
                variant="outlined"
                error={!!errors.tp_description}
                helperText={errors.tp_description?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="note"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Note" fullWidth variant="outlined" />
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

export default TPForm;
