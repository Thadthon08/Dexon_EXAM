export interface CMLInterface {
  cml_number: number;
  line_number: string;
  cml_description: string;
  actual_outside_diameter: number | null;
  design_thickness: number | null;
  structural_thickness: number | null;
  required_thickness: number | null;
}

export interface AddCMLInterface {
  cml_number: number;
  line_number: string;
  cml_description: string;
}
