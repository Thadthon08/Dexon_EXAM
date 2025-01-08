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
import { InfoInterface } from "../interface/Info";
import {
  NumbersOutlined,
  PlaceOutlined,
  DescriptionOutlined,
  DateRangeOutlined,
  StraightenOutlined,
  SpeedOutlined,
  ThermostatOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

interface InfoFormProps {
  onSubmit: (data: InfoInterface) => Promise<void>;
  defaultValues?: InfoInterface;
  buttonLabel: string;
  isSubmitting: boolean;
}

const InfoForm: React.FC<InfoFormProps> = ({
  onSubmit,
  defaultValues,
  buttonLabel,
  isSubmitting,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InfoInterface>({
    defaultValues,
  });

  // Group fields by category for better organization
  const formFields = {
    identification: [
      {
        name: "line_number",
        label: "Line Number",
        icon: <NumbersOutlined />,
      },
      {
        name: "drawing_number",
        label: "Drawing Number",
        icon: <DescriptionOutlined />,
      },
    ],
    location: [
      { name: "location", label: "Location", icon: <PlaceOutlined /> },
      { name: "from", label: "From", icon: <DescriptionOutlined /> },
      { name: "to", label: "To", icon: <DescriptionOutlined /> },
    ],
    specifications: [
      { name: "service", label: "Service", icon: <DescriptionOutlined /> },
      { name: "material", label: "Material", icon: <DescriptionOutlined /> },
      {
        name: "inservice_date",
        label: "Inservice Date",
        type: "date",
        icon: <DateRangeOutlined />,
      },
    ],
    dimensions: [
      {
        name: "pipe_size",
        label: "Pipe Size (in)",
        type: "number",
        icon: <StraightenOutlined />,
      },
      {
        name: "original_thickness",
        label: "Original Thickness (mm)",
        type: "number",
        icon: <StraightenOutlined />,
      },
    ],
    technical: [
      {
        name: "stress",
        label: "Stress (psi)",
        type: "number",
        icon: <SettingsOutlined />,
      },
      {
        name: "joint_efficiency",
        label: "Joint Efficiency",
        type: "number",
        icon: <SettingsOutlined />,
      },
      {
        name: "ca",
        label: "CA",
        type: "number",
        icon: <SettingsOutlined />,
      },
      {
        name: "design_life",
        label: "Design Life (years)",
        type: "number",
        icon: <DateRangeOutlined />,
      },
    ],
    pressure: [
      {
        name: "design_pressure",
        label: "Design Pressure (psi)",
        type: "number",
        icon: <SpeedOutlined />,
      },
      {
        name: "operating_pressure",
        label: "Operating Pressure (psi)",
        type: "number",
        icon: <SpeedOutlined />,
      },
    ],
    temperature: [
      {
        name: "design_temperature",
        label: "Design Temperature (°C)",
        type: "number",
        icon: <ThermostatOutlined />,
      },
      {
        name: "operating_temperature",
        label: "Operating Temperature (°C)",
        type: "number",
        icon: <ThermostatOutlined />,
      },
    ],
  };

  const renderField = (field: any) => (
    <Controller
      name={field.name as keyof InfoInterface}
      control={control}
      rules={{ required: `กรุณากรอก ${field.label}` }}
      render={({ field: controllerField }) => (
        <TextField
          {...controllerField}
          label={field.label}
          variant="outlined"
          fullWidth
          type={field.type || "text"}
          error={!!errors[field.name as keyof InfoInterface]}
          helperText={errors[field.name as keyof InfoInterface]?.message}
          InputProps={{
            startAdornment: field.icon && (
              <InputAdornment position="start">{field.icon}</InputAdornment>
            ),
          }}
        />
      )}
    />
  );

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant="h5" fontWeight="bold" align="center" mb={4}>
          Piping Information
        </Typography>

        <Grid container spacing={4}>
          {Object.entries(formFields).map(([category, fields]) => (
            <Grid item xs={12} key={category}>
              <Typography
                variant="h6"
                sx={{ mb: 2, color: "primary.main", fontWeight: "medium" }}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Typography>
              <Grid container spacing={3}>
                {fields.map((field, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    {renderField(field)}
                  </Grid>
                ))}
              </Grid>
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

export default InfoForm;
