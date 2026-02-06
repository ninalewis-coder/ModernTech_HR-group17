import db from "../config/db.js";

// Submit leave request (multiple days)
export const submitLeave = async (req, res) => {
  const { employee_id, start_date, end_date, reason } = req.body;
  if (!employee_id || !start_date || !end_date || !reason) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const start = new Date(start_date);
    const end = new Date(end_date);

    // Generate all dates in the range
    let current = new Date(start);
    const promises = [];
    while (current <= end) {
      const leaveDate = current.toISOString().split("T")[0];
      promises.push(
        db.query(
          "INSERT INTO leave_request (employee_id, leave_date, reason, status) VALUES (?, ?, ?, 'Pending')",
          [employee_id, leaveDate, reason]
        )
      );
      current.setDate(current.getDate() + 1);
    }

    await Promise.all(promises);
    res.status(201).json({ message: "Leave request submitted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to submit leave request" });
  }
};

// Get all leave requests
export const getLeaveRequests = async (req, res) => {
  const [rows] = await db.query(
    `SELECT l.leave_id, l.employee_id, e.name AS employee_name, l.leave_date, l.reason, l.status
     FROM leave_request l
     JOIN employee e ON l.employee_id = e.employee_id
     ORDER BY l.leave_date DESC`
  );
  res.json(rows);
};

// Get leave by employee
export const getLeaveByEmployee = async (req, res) => {
  const { employee_id } = req.params;
  const [rows] = await db.query(
    "SELECT * FROM leave_request WHERE employee_id = ? ORDER BY leave_date DESC",
    [employee_id]
  );
  res.json(rows);
};

// Update leave status
export const updateLeaveStatus = async (req, res) => {
  const { leave_id } = req.params;
  const { status } = req.body;

  try {
    await db.query(
      "UPDATE leave_request SET status = ? WHERE leave_id = ?",
      [status, leave_id]
    );
    res.json({ message: "Leave status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update leave status" });
  }
};

// Delete leave request
export const deleteLeaveRequest = async (req, res) => {
  const { leave_id } = req.params;
  await db.query("DELETE FROM leave_request WHERE leave_id = ?", [leave_id]);
  res.json({ message: "Leave request deleted" });
};
