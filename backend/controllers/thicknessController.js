const pool = require("../db/db");

exports.getThicknessByLineCMLAndTPNumber = async (req, res) => {
  const { lineNumber, cmlNumber, tpNumber } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM THICKNESS WHERE line_number = $1 AND cml_number = $2 AND tp_number = $3 ORDER BY inspection_date DESC",
      [lineNumber, cmlNumber, tpNumber]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No thickness data found" });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// เพิ่มข้อมูล Thickness ใหม่
exports.addThickness = async (req, res) => {
  const {
    line_number,
    cml_number,
    tp_number,
    inspection_date,
    actual_thickness,
  } = req.body;

  try {
    await pool.query(
      "INSERT INTO THICKNESS (line_number, cml_number, tp_number, inspection_date, actual_thickness) VALUES ($1, $2, $3, $4, $5)",
      [line_number, cml_number, tp_number, inspection_date, actual_thickness]
    );
    res.status(201).json({ message: "Thickness added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // แก้ไขข้อมูล Thickness
// exports.updateThickness = async (req, res) => {
//   const { lineNumber, cmlNumber, tpNumber } = req.params;
//   const { inspection_date, actual_thickness } = req.body;

//   try {
//     const result = await pool.query(
//       "UPDATE THICKNESS SET actual_thickness = $1 WHERE line_number = $2 AND cml_number = $3 AND tp_number = $4 AND inspection_date = $5",
//       [actual_thickness, lineNumber, cmlNumber, tpNumber, inspection_date]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: "Thickness data not found" });
//     }

//     res.status(200).json({ message: "Thickness updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ลบข้อมูล Thickness
// exports.deleteThickness = async (req, res) => {
//   const { lineNumber, cmlNumber, tpNumber, inspectionDate } = req.params; // เพิ่ม inspectionDate

//   try {
//     const result = await pool.query(
//       "DELETE FROM THICKNESS WHERE line_number = $1 AND cml_number = $2 AND tp_number = $3 AND inspection_date = $4",
//       [lineNumber, cmlNumber, tpNumber, inspectionDate]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: "Thickness data not found" });
//     }

//     res.status(200).json({ message: "Thickness deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

exports.updateThickness = async (req, res) => {
  const { id } = req.params;
  const { inspection_date, actual_thickness } = req.body;

  try {
    const result = await pool.query(
      "UPDATE THICKNESS SET inspection_date = $1, actual_thickness = $2 WHERE id = $3",
      [inspection_date, actual_thickness, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Thickness data not found" });
    }

    res.status(200).json({ message: "Thickness updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ลบข้อมูล Thickness โดยใช้ id แทน
exports.deleteThickness = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM THICKNESS WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Thickness data not found" });
    }

    res.status(200).json({ message: "Thickness deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getThicknessById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM THICKNESS WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Thickness data not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
