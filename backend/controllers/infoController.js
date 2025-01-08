const pool = require("../db/db");

// Get all line numbers
exports.getAllInfo = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM INFO");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specific line number details
exports.getInfoByLineNumber = async (req, res) => {
  const { line_number } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM INFO WHERE line_number = $1",
      [line_number]
    );
    if (result.rows.length === 0) {
      res
        .status(404)
        .json({ message: `No data found for line_number ${line_number}` });
    } else {
      res.status(200).json(result.rows[0]);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addInfo = async (req, res) => {
  const {
    line_number,
    location,
    from,
    to,
    drawing_number,
    service,
    material,
    inservice_date,
    pipe_size,
    original_thickness,
    stress,
    joint_efficiency,
    ca,
    design_life,
    design_pressure,
    operating_pressure,
    design_temperature,
    operating_temperature,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO INFO 
      (line_number, location, "from", "to", drawing_number, service, material, inservice_date, 
      pipe_size, original_thickness, stress, joint_efficiency, ca, design_life, 
      design_pressure, operating_pressure, design_temperature, operating_temperature) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)`,
      [
        line_number,
        location,
        from,
        to,
        drawing_number,
        service,
        material,
        inservice_date,
        pipe_size,
        original_thickness,
        stress,
        joint_efficiency,
        ca,
        design_life,
        design_pressure,
        operating_pressure,
        design_temperature,
        operating_temperature,
      ]
    );

    res.status(201).json({ message: "Info added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInfo = async (req, res) => {
  const { line_number } = req.params;
  const {
    location,
    from,
    to,
    drawing_number,
    service,
    material,
    inservice_date,
    pipe_size,
    original_thickness,
    stress,
    joint_efficiency,
    ca,
    design_life,
    design_pressure,
    operating_pressure,
    design_temperature,
    operating_temperature,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE INFO 
       SET location = $1, "from" = $2, "to" = $3, drawing_number = $4, 
           service = $5, material = $6, inservice_date = $7, pipe_size = $8, 
           original_thickness = $9, stress = $10, joint_efficiency = $11, ca = $12, 
           design_life = $13, design_pressure = $14, operating_pressure = $15, 
           design_temperature = $16, operating_temperature = $17 
       WHERE line_number = $18`,
      [
        location,
        from,
        to,
        drawing_number,
        service,
        material,
        inservice_date,
        pipe_size,
        original_thickness,
        stress,
        joint_efficiency,
        ca,
        design_life,
        design_pressure,
        operating_pressure,
        design_temperature,
        operating_temperature,
        line_number,
      ]
    );

    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ message: `No info found for line_number ${line_number}` });
    } else {
      res.status(200).json({ message: "Info updated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete info by line number
exports.deleteInfo = async (req, res) => {
  const { line_number } = req.params;

  try {
    const result = await pool.query("DELETE FROM INFO WHERE line_number = $1", [
      line_number,
    ]);

    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ message: `No info found for line_number ${line_number}` });
    } else {
      res
        .status(200)
        .json({
          message: `Info with line_number ${line_number} deleted successfully`,
        });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
