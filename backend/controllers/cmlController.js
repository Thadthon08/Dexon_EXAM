const pool = require("../db/db");

// Get CML by line number
exports.getCMLByLineNumber = async (req, res) => {
  const { line_number } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM CML WHERE line_number = $1",
      [line_number]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const pipeSizeToOutsideDiameter = {
  0.125: 10.3,
  0.25: 13.7,
  0.357: 17.1,
  0.5: 21.3,
  0.75: 26.7,
  1.0: 33.4,
  1.25: 42.2,
  1.5: 48.3,
  2.0: 60.3,
  2.5: 73.0,
  3.0: 88.9,
  3.5: 101.6,
  4.0: 114.3,
  5.0: 141.3,
  6.0: 168.3,
  8.0: 219.1,
  10.0: 273.0,
  12.0: 323.8,
  14.0: 355.6,
  16.0: 406.4,
  18.0: 457.0,
  20.0: 508.0,
};

const structuralThicknessByPipeSize = (pipe_size) => {
  if (pipe_size <= 2) return 1.8;
  if (pipe_size === 3) return 2.0;
  if (pipe_size === 4) return 2.3;
  if (pipe_size >= 6 && pipe_size <= 18) return 2.8;
  if (pipe_size >= 20) return 3.1;
  return null;
};

exports.addCML = async (req, res) => {
  let { cml_number, line_number, cml_description } = req.body;

  cml_number = Number(cml_number);
  if (isNaN(cml_number)) {
    return res
      .status(400)
      .json({ message: "CML Number must be a valid number" });
  }

  try {
    const infoResult = await pool.query(
      "SELECT pipe_size, stress, joint_efficiency, design_pressure FROM INFO WHERE line_number = $1",
      [line_number]
    );

    if (infoResult.rows.length === 0) {
      return res.status(404).json({ message: "Line number not found in INFO" });
    }

    const { pipe_size, stress, joint_efficiency, design_pressure } =
      infoResult.rows[0];

    const actual_outside_diameter = pipeSizeToOutsideDiameter[pipe_size];
    if (!actual_outside_diameter) {
      return res.status(400).json({ message: "Invalid pipe size" });
    }

    const design_thickness =
      (design_pressure * actual_outside_diameter) /
      (2 * stress * joint_efficiency + 2 * design_pressure * 0.4);

    const structural_thickness = structuralThicknessByPipeSize(pipe_size);
    if (structural_thickness === null) {
      return res
        .status(400)
        .json({ message: "Invalid pipe size for structural thickness" });
    }

    const required_thickness = Math.max(design_thickness, structural_thickness);

    await pool.query(
      `INSERT INTO CML 
      (cml_number, line_number, cml_description, actual_outside_diameter, design_thickness, structural_thickness, required_thickness) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        cml_number,
        line_number,
        cml_description,
        actual_outside_diameter.toFixed(2),
        design_thickness.toFixed(2),
        structural_thickness.toFixed(2),
        required_thickness.toFixed(2),
      ]
    );

    res.status(201).json({ message: "CML added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCML = async (req, res) => {
  const { lineNumber, cmlNumber } = req.params;
  const { cml_description } = req.body;

  if (!cml_description) {
    return res.status(400).json({ message: "CML description is required" });
  }

  try {
    const existingCML = await pool.query(
      "SELECT * FROM CML WHERE line_number = $1 AND cml_number = $2",
      [lineNumber, cmlNumber]
    );

    if (existingCML.rows.length === 0) {
      return res.status(404).json({ message: "CML not found" });
    }

    await pool.query(
      `UPDATE CML SET cml_description = $1 WHERE line_number = $2 AND cml_number = $3`,
      [cml_description, lineNumber, cmlNumber]
    );

    res.status(200).json({ message: "CML updated successfully" });
  } catch (error) {
    console.error("Error updating CML:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete CML
exports.deleteCML = async (req, res) => {
  const { lineNumber, cmlNumber } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM CML WHERE line_number = $1 AND cml_number = $2",
      [lineNumber, cmlNumber]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "CML not found" });
    }

    res.status(200).json({ message: "CML deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
