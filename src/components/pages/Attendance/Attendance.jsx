// src/pages/Attendance/Attendance.js
import React, { useState, useEffect } from "react";
import {
  attendanceService,
  studentsService,
  academicsService,
} from "../../../services";
import {
  PageHeader,
  PageTitle,
  PageActions,
  AttendanceControls,
  ControlGroup,
  AttendanceTable,
  TableHeader,
  StudentRow,
  StudentInfo,
  StudentAvatar,
  StudentDetails,
  StudentName,
  StudentId,
  AttendanceStatus,
  RemarksInput,
  BulkActions,
  StatsGrid,
  StatCard,
  StatValue,
  StatLabel,
  EmptyState,
} from "./Attendance.styles";
import {
  Heading1,
  Heading2,
  Button,
  PageContainer,
  Select,
  FormGroup,
  Label,
  DateInput,
} from "../../common";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    late: 0,
    total: 0,
  });

  useEffect(() => {
    fetchGrades();
  }, []);

  useEffect(() => {
    if (selectedGrade) {
      fetchStudentsByGrade();
    }
  }, [selectedGrade]);

  useEffect(() => {
    calculateStats();
  }, [attendanceRecords, students]);

  const fetchGrades = async () => {
    try {
      const data = await academicsService.getGrades();
      setGrades(data);
      if (data.length > 0) {
        setSelectedGrade(data[0].id);
      }
    } catch (error) {
      console.error("Error fetching grades:", error);
    }
  };

  const fetchStudentsByGrade = async () => {
    try {
      setLoading(true);
      const data = await studentsService.getStudents({
        grade_id: selectedGrade,
      });
      setStudents(data);

      // Initialize attendance records
      const initialRecords = {};
      data.forEach((student) => {
        initialRecords[student.id] = {
          status: "present",
          remarks: "",
        };
      });
      setAttendanceRecords(initialRecords);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const present = Object.values(attendanceRecords).filter(
      (record) => record.status === "present"
    ).length;
    const absent = Object.values(attendanceRecords).filter(
      (record) => record.status === "absent"
    ).length;
    const late = Object.values(attendanceRecords).filter(
      (record) => record.status === "late"
    ).length;

    setStats({
      present,
      absent,
      late,
      total: students.length,
    });
  };

  const handleAttendanceChange = (studentId, field, value) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: value,
      },
    }));
  };

  const handleBulkAction = (status) => {
    const updatedRecords = { ...attendanceRecords };
    Object.keys(updatedRecords).forEach((studentId) => {
      updatedRecords[studentId] = {
        ...updatedRecords[studentId],
        status: status,
      };
    });
    setAttendanceRecords(updatedRecords);
  };

  const handleSaveAttendance = async () => {
    try {
      setSaving(true);

      const attendanceData = {
        date: selectedDate,
        grade: selectedGrade,
        attendance_data: Object.entries(attendanceRecords).map(
          ([studentId, record]) => ({
            student_id: parseInt(studentId),
            status: record.status,
            remarks: record.remarks,
          })
        ),
      };

      await attendanceService.markBulkStudentAttendance(attendanceData);
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
      alert("Failed to save attendance. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "??"
    );
  };

  const getGradeName = (gradeId) => {
    const grade = grades.find((g) => g.id === gradeId);
    return grade ? grade.name : "";
  };

  return (
    <PageContainer>
      <PageHeader>
        <PageTitle>
          <Heading1>Attendance Management</Heading1>
        </PageTitle>
        <PageActions>
          <Button variant="secondary">View Reports</Button>
          <Button
            variant="primary"
            onClick={handleSaveAttendance}
            disabled={saving || students.length === 0}
          >
            {saving ? "Saving..." : "Save Attendance"}
          </Button>
        </PageActions>
      </PageHeader>

      <StatsGrid>
        <StatCard>
          <StatValue>{stats.present}</StatValue>
          <StatLabel>Present</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.absent}</StatValue>
          <StatLabel>Absent</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.late}</StatValue>
          <StatLabel>Late</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.total}</StatValue>
          <StatLabel>Total Students</StatLabel>
        </StatCard>
      </StatsGrid>

      <AttendanceControls>
        <ControlGroup>
          <Label htmlFor="grade">Select Grade</Label>
          <Select
            id="grade"
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
          >
            <option value="">Select Grade</option>
            {grades.map((grade) => (
              <option key={grade.id} value={grade.id}>
                {grade.name}
              </option>
            ))}
          </Select>
        </ControlGroup>

        <ControlGroup>
          <Label htmlFor="date">Date</Label>
          <DateInput
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </ControlGroup>

        <ControlGroup>
          <Label>Quick Actions</Label>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleBulkAction("present")}
            >
              Mark All Present
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleBulkAction("absent")}
            >
              Mark All Absent
            </Button>
          </div>
        </ControlGroup>
      </AttendanceControls>

      {loading ? (
        <EmptyState>Loading students...</EmptyState>
      ) : students.length === 0 ? (
        <EmptyState>
          <Heading2>No students found</Heading2>
          <p>Select a grade to view students and mark attendance.</p>
        </EmptyState>
      ) : (
        <AttendanceTable>
          <TableHeader>
            <div>Student</div>
            <div>Roll No</div>
            <div>Status</div>
            <div>Remarks</div>
          </TableHeader>

          {students.map((student) => (
            <StudentRow key={student.id}>
              <StudentInfo>
                <StudentAvatar>{getInitials(student.full_name)}</StudentAvatar>
                <StudentDetails>
                  <StudentName>{student.full_name}</StudentName>
                  <StudentId>ID: {student.student_id}</StudentId>
                </StudentDetails>
              </StudentInfo>

              <div>{student.roll_number || "N/A"}</div>

              <div>
                <AttendanceStatus
                  value={attendanceRecords[student.id]?.status || "present"}
                  onChange={(e) =>
                    handleAttendanceChange(student.id, "status", e.target.value)
                  }
                >
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="late">Late</option>
                  <option value="half_day">Half Day</option>
                </AttendanceStatus>
              </div>

              <div>
                <RemarksInput
                  type="text"
                  placeholder="Remarks..."
                  value={attendanceRecords[student.id]?.remarks || ""}
                  onChange={(e) =>
                    handleAttendanceChange(
                      student.id,
                      "remarks",
                      e.target.value
                    )
                  }
                />
              </div>
            </StudentRow>
          ))}
        </AttendanceTable>
      )}

      {students.length > 0 && (
        <BulkActions>
          <Button
            variant="primary"
            onClick={handleSaveAttendance}
            disabled={saving}
          >
            {saving ? "Saving Attendance..." : "Save All Attendance"}
          </Button>
          <div style={{ flex: 1 }} />
          <Button variant="secondary">Print Report</Button>
          <Button variant="secondary">Export to Excel</Button>
        </BulkActions>
      )}
    </PageContainer>
  );
};

export default Attendance;
