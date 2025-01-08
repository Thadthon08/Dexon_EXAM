const pool = require("../db/db");

exports.getTestPointsByCML = async (req, res) => {
  const { line_number, cml_number } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM TEST_POINT WHERE line_number = $1 AND cml_number = $2",
      [line_number, cml_number]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addTestPoint = async (req, res) => {
  const { tp_number, cml_number, line_number, tp_description, note } = req.body;
  try {
    await pool.query(
      "INSERT INTO TEST_POINT (tp_number, cml_number, line_number, tp_description, note) VALUES ($1, $2, $3, $4, $5)",
      [tp_number, cml_number, line_number, tp_description, note]
    );
    res.status(201).json({ message: "Test Point added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTestPoint = async (req, res) => {
  const { line_number, cml_number, tp_number } = req.params;
  const { tp_description, note } = req.body;

  try {
    const result = await pool.query(
      "UPDATE TEST_POINT SET tp_description = $1, note = $2 WHERE line_number = $3 AND cml_number = $4 AND tp_number = $5",
      [tp_description, note, line_number, cml_number, tp_number]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Test Point not found" });
    }

    res.status(200).json({ message: "Test Point updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTestPoint = async (req, res) => {
  const { line_number, cml_number, tp_number } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM TEST_POINT WHERE line_number = $1 AND cml_number = $2 AND tp_number = $3",
      [line_number, cml_number, tp_number]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Test Point not found" }); // ไม่มี Test Point ให้ลบ
    }

    res.status(200).json({ message: "Test Point deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
