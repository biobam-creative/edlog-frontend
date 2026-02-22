import React, { useState, useEffect } from "react";
import {
  academicsService,
  studentsService,
  reportService,
} from "../../../services";
import * as SC from "../../common/InputStyledComponents";

const SubjectScoresInput = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [terms, setTerms] = useState([]);
  const [scores, setScores] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchClasses();
    fetchTerms();
  }, []);

  // Fetch students when class is selected
  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass);
      fetchSubjects(selectedClass);
    }
  }, [selectedClass]);

  // Fetch existing scores when all selections are made
  useEffect(() => {
    if (selectedClass && selectedTerm && selectedSubject) {
      fetchScores();
    }
  }, [selectedClass, selectedTerm, selectedSubject]);

  const fetchClasses = async () => {
    try {
      const response = await academicsService.getGrades();
      setClasses(response);
      console.log(response);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
      setAlert({ type: "error", message: "Failed to load classes" });
    }
  };

  const fetchTerms = async () => {
    try {
      const response = await academicsService.getTerms();
      setTerms(response);
    } catch (error) {
      console.error("Failed to fetch terms:", error);
      setAlert({ type: "error", message: "Failed to load terms" });
    }
  };

  const fetchStudents = async (classId) => {
    try {
      const data = await studentsService.getStudents({
        grade_id: selectedClass,
      });
      setStudents(data);
      console.log(data);

      // Initialize scores array
      const initialScores = data.map((student) => ({
        student_id: student.id,
        student_name: student.full_name,
        admission_number: student.student_id,
        ca1_score: "",
        ca2_score: "",
        ca3_score: "",
        exam_score: "",
        class_position: "",
      }));
      setScores(initialScores);
      console.log(scores);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setAlert({ type: "error", message: "Failed to load students" });
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const response = await academicsService.getSubjects({
        grade_id: classId,
      });
      setSubjects(response);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      setAlert({ type: "error", message: "Failed to load subjects" });
    }
  };

  const fetchScores = async () => {
    try {
      const response = await reportService.getClassSubjectScores({
        grade_id: selectedClass,
        term_id: selectedTerm,
        subject_id: selectedSubject,
      });
      console.log(response);
      // Update scores with existing data
      if (response.data.length > 0) {
        setScores((prevScores) =>
          prevScores.map((score) => {
            const existing = response.data.find(
              (s) => s.student === score.student_id,
            );
            if (existing) {
              return {
                ...score,
                ca1_score: existing.ca1_score,
                ca2_score: existing.ca2_score,
                ca3_score: existing.ca3_score,
                exam_score: existing.exam_score,
                class_position: existing.class_position,
              };
            }
            return score;
          }),
        );
      }
    } catch (error) {
      console.error("Failed to fetch scores:", error);
    }
  };

  const handleScoreChange = (index, field, value) => {
    const newScores = [...scores];

    // Validate numeric input
    if (
      ["ca1_score", "ca2_score", "exam_score", "class_position"].includes(field)
    ) {
      if (value === "" || /^\d+$/.test(value)) {
        const numValue = value === "" ? "" : parseInt(value);

        // Validate score limits
        if (field === "ca1_score" || field === "ca2_score") {
          if (numValue > 20) return;
        } else if (field === "exam_score") {
          if (numValue > 60) return;
        }

        newScores[index][field] = numValue;
      }
    } else {
      newScores[index][field] = value;
    }

    setScores(newScores);
  };

  const handleSaveScores = async () => {
    if (!selectedClass || !selectedTerm || !selectedSubject) {
      setAlert({
        type: "error",
        message: "Please select class, term, and subject",
      });
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const scoresData = scores
        .filter(
          (score) =>
            score.ca1_score !== "" ||
            score.ca2_score !== "" ||
            score.ca3_score !== "" ||
            score.exam_score !== "",
        )
        .map((score) => ({
          student: score.student_id,
          ca1_score: score.ca1_score || 0,
          ca2_score: score.ca2_score || 0,
          ca3_score: score.ca3_score || 0,
          exam_score: score.exam_score || 0,
          class_position: score.class_position || 1,
        }));

      const payload = {
        term: selectedTerm,
        subject: selectedSubject,
        scores: scoresData,
        grade: selectedClass,
      };

      console.log(payload);
      const response = await reportService.bulkCreateScores(payload);

      if (response.data.success) {
        setAlert({
          type: "success",
          message: `Successfully saved ${response.data.created_count} scores`,
        });
      } else {
        setAlert({ type: "error", message: "Failed to save scores" });
      }
    } catch (error) {
      console.error("Failed to save scores:", error);
      setAlert({
        type: "error",
        message: "Failed to save scores. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGeneratePositions = async () => {
    try {
      const response = await axios.post(
        "/api/input/generate-positions/",
        {
          class_id: selectedClass,
          term_id: selectedTerm,
          subject_id: selectedSubject,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      if (response.data.success) {
        setAlert({ type: "success", message: response.data.message });
        fetchScores(); // Refresh scores with new positions
      }
    } catch (error) {
      console.error("Failed to generate positions:", error);
      setAlert({ type: "error", message: "Failed to generate positions" });
    }
  };

  return (
    <SC.InputFormContainer>
      <SC.FormSection>
        <SC.FormTitle>Subject Scores Input</SC.FormTitle>

        {alert && <SC.Alert type={alert.type}>{alert.message}</SC.Alert>}

        <SC.FormGrid>
          <SC.FormGroup>
            <SC.FormLabel>Select Class</SC.FormLabel>
            <SC.FormSelect
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
            >
              <option value="">Choose a class</option>
              {classes.map((cls) => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </SC.FormSelect>
          </SC.FormGroup>

          <SC.FormGroup>
            <SC.FormLabel>Select Term</SC.FormLabel>
            <SC.FormSelect
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
            >
              <option value="">Choose a term</option>
              {terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.name} - {term.academic_year.name}
                </option>
              ))}
            </SC.FormSelect>
          </SC.FormGroup>

          <SC.FormGroup>
            <SC.FormLabel>Select Subject</SC.FormLabel>
            <SC.FormSelect
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedClass}
            >
              <option value="">Choose a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </SC.FormSelect>
          </SC.FormGroup>
        </SC.FormGrid>

        {students.length > 0 &&
          selectedClass &&
          selectedTerm &&
          selectedSubject && (
            <>
              <div style={{ margin: "20px 0" }}>
                <h4>Students in Class: {students.length}</h4>
                <p>Enter scores for all students below:</p>
              </div>

              <SC.InputTable>
                <SC.TableHeader>
                  <tr>
                    <th>Student Name</th>
                    <th>Admission No.</th>
                    <th>CA1 (10)</th>
                    <th>CA2 (10)</th>
                    <th>CA3 (10)</th>
                    <th>Exam (70)</th>
                    <th>Total (100)</th>
                    <th>Position</th>
                  </tr>
                </SC.TableHeader>
                <SC.TableBody>
                  {scores.map((score, index) => {
                    const total =
                      Number(score.ca1_score || 0) +
                      Number(score.ca2_score || 0) +
                      Number(score.ca3_score || 0) +
                      Number(score.exam_score || 0);
                    return (
                      <tr key={score.student_id}>
                        <td>{score.student_name}</td>
                        <td>{score.admission_number}</td>
                        <td>
                          <SC.TableInput
                            type="number"
                            min="0"
                            max="10"
                            value={score.ca1_score}
                            onChange={(e) =>
                              handleScoreChange(
                                index,
                                "ca1_score",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td>
                          <SC.TableInput
                            type="number"
                            min="0"
                            max="10"
                            value={score.ca2_score}
                            onChange={(e) =>
                              handleScoreChange(
                                index,
                                "ca2_score",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td>
                          <SC.TableInput
                            type="number"
                            min="0"
                            max="10"
                            value={score.ca3_score}
                            onChange={(e) =>
                              handleScoreChange(
                                index,
                                "ca3_score",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td>
                          <SC.TableInput
                            type="number"
                            min="0"
                            max="70"
                            value={score.exam_score}
                            onChange={(e) =>
                              handleScoreChange(
                                index,
                                "exam_score",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                        <td style={{ textAlign: "center", fontWeight: "bold" }}>
                          {total}
                        </td>
                        <td>
                          <SC.TableInput
                            type="number"
                            min="1"
                            value={score.class_position}
                            onChange={(e) =>
                              handleScoreChange(
                                index,
                                "class_position",
                                e.target.value,
                              )
                            }
                          />
                        </td>
                      </tr>
                    );
                  })}
                </SC.TableBody>
              </SC.InputTable>

              <SC.ActionButtons>
                <SC.FormButton
                  variant="warning"
                  onClick={handleGeneratePositions}
                  disabled={
                    !scores.some(
                      (s) => s.ca1_score || s.ca2_score || s.exam_score,
                    )
                  }
                >
                  Auto Generate Positions
                </SC.FormButton>
                <SC.FormButton
                  variant="primary"
                  onClick={handleSaveScores}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save All Scores"}
                </SC.FormButton>
              </SC.ActionButtons>
            </>
          )}
      </SC.FormSection>
    </SC.InputFormContainer>
  );
};

export default SubjectScoresInput;
// import React, { useState, useEffect } from "react";
// import {
//   attendanceService,
//   studentsService,
//   academicsService,
//   reportService,
// } from "../../../services";
// import {
//   PageHeader,
//   PageTitle,
//   PageActions,
//   AttendanceControls,
//   ControlGroup,
//   AttendanceTable,
//   TableHeader,
//   StudentRow,
//   StudentInfo,
//   StudentAvatar,
//   StudentDetails,
//   StudentName,
//   StudentId,
//   AttendanceStatus,
//   ScoreInput,
//   BulkActions,
//   StatsGrid,
//   StatCard,
//   StatValue,
//   StatLabel,
//   EmptyState,
// } from "./ResultUpload.styles";
// import {
//   Heading1,
//   Heading2,
//   Button,
//   PageContainer,
//   Select,
//   FormRow,
//   FormGroup,
//   Label,
//   DateInput,
// } from "../../common";

// const Attendance = () => {
//   const [students, setStudents] = useState([]);
//   const [grades, setGrades] = useState([]);
//   const [terms, setTerms] = useState([]);
//   const [selectedGrade, setSelectedGrade] = useState("");
//   const [selectedTerm, setSelectedTerm] = useState("");
//   const [scoreRecords, setScoreRecords] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [saving, setSaving] = useState(false);
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubject, setSelectedSubject] = useState();

//   useEffect(() => {
//     fetchGrades();
//   }, []);

//   useEffect(() => {
//     fetchSubjects();
//   }, []);

//   useEffect(() => {
//     fetchTerms();
//   }, []);

//   useEffect(() => {
//     if (selectedGrade) {
//       fetchStudentsByGrade();
//     }
//   }, [selectedGrade]);

//   useEffect(() => {
//     if (selectedSubject) {
//       fetchStudentsByGrade();
//     }
//   }, [selectedSubject]);

//   //   useEffect(() => {
//   //     calculateStats();
//   //   }, [scoreRecords, students]);

//   const fetchGrades = async () => {
//     try {
//       const data = await academicsService.getGrades();
//       setGrades(data);
//       if (data.length > 0) {
//         setSelectedGrade(data[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching grades:", error);
//     }
//   };

//   const fetchSubjects = async () => {
//     try {
//       const data = await academicsService.getSubjects();
//       setSubjects(data);
//       if (data.length > 0) {
//         setSelectedSubject(data[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching grades:", error);
//     }
//   };

//   const fetchTerms = async () => {
//     try {
//       const data = await academicsService.getTerms();
//       setTerms(data);
//       if (data.length > 0) {
//         setSelectedTerm(data[0].id);
//       }
//     } catch (error) {
//       console.error("Error fetching grades:", error);
//     }
//   };

//   const fetchStudentsByGrade = async () => {
//     try {
//       setLoading(true);
//       const data = await studentsService.getStudents({
//         grade_id: selectedGrade,
//       });
//       setStudents(data);

//       const initialRecords = {};
//       data.forEach((student) => {
//         initialRecords[student.id] = {
//           first_ca: 0,
//           second_ca: 0,
//           third_ca: 0,
//           //   total_ca: first_ca || 0 + second_ca || 0 + third_ca || 0,
//           exam: 0,
//           //   total: (first_ca || 0 + second_ca || 0 + third_ca || 0) + (exam || 0),
//         };
//       });
//       setScoreRecords(initialRecords);
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Calculate total CA from individual scores
//   const calculateTotalCA = (first_ca, second_ca, third_ca) => {
//     return (
//       Number(first_ca || 0) + Number(second_ca || 0) + Number(third_ca || 0)
//     );
//   };

//   // Calculate total score (CA + Exam)
//   const calculateTotal = (first_ca, second_ca, third_ca, exam) => {
//     const total_ca = calculateTotalCA(first_ca, second_ca, third_ca);
//     return total_ca + Number(exam || 0);
//   };

//   const handleScoreChange = (studentId, field, value) => {
//     setScoreRecords((prev) => {
//       const currentRecord = prev[studentId] || {};
//       const numValue = Number(value || 0);

//       // Update the field value
//       const updatedRecord = {
//         ...currentRecord,
//         [field]: numValue,
//       };

//       // Recalculate totals based on updated values
//       const { first_ca, second_ca, third_ca, exam } = updatedRecord;
//       updatedRecord.total_ca = calculateTotalCA(first_ca, second_ca, third_ca);
//       updatedRecord.total = calculateTotal(first_ca, second_ca, third_ca, exam);

//       return {
//         ...prev,
//         [studentId]: updatedRecord,
//       };
//     });
//   };

//   // const handleBulkAction = (status) => {
//   //   const updatedRecords = { ...attendanceRecords };
//   //   Object.keys(updatedRecords).forEach((studentId) => {
//   //     updatedRecords[studentId] = {
//   //       ...updatedRecords[studentId],
//   //       status: status,
//   //     };
//   //   });
//   //   setAttendanceRecords(updatedRecords);
//   // };

//   const handleSaveScore = async () => {
//     try {
//       // Validate required fields
//       if (!selectedGrade) {
//         alert("Please select a grade");
//         return;
//       }
//       if (!selectedTerm) {
//         alert("Please select a term");
//         return;
//       }
//       if (!selectedSubject) {
//         alert("Please select a subject");
//         return;
//       }

//       // Validate that at least one score was entered
//       const hasScores = Object.values(scoreRecords).some(
//         (record) =>
//           record.first_ca || record.second_ca || record.third_ca || record.exam,
//       );

//       if (!hasScores) {
//         alert("Please enter at least one score before saving");
//         return;
//       }

//       setSaving(true);

//       const scoreData = {
//         grade: selectedGrade,
//         term: selectedTerm,
//         subject: selectedSubject,
//         students: Object.entries(scoreRecords).map(([studentId, record]) => ({
//           student: parseInt(studentId),
//           ca_1: parseInt(record.first_ca || 0),
//           ca_2: parseInt(record.second_ca || 0),
//           ca_3: parseInt(record.third_ca || 0),
//           total_ca: parseInt(record.total_ca || 0),
//           exam: parseInt(record.exam || 0),
//           term_total: parseInt(record.total || 0),
//         })),
//       };

//       console.log("Submitting score data:", scoreData);

//       await  (scoreData);
//       alert("Scores saved successfully!");

//       // Reset form after successful save
//       fetchStudentsByGrade();
//     } catch (error) {
//       console.error("Error saving scores:", error);
//       alert("Failed to save scores. Please try again.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   const getInitials = (name) => {
//     return (
//       name
//         ?.split(" ")
//         .map((part) => part[0])
//         .join("")
//         .toUpperCase()
//         .slice(0, 2) || "??"
//     );
//   };

//   const getGradeName = (gradeId) => {
//     const grade = grades.find((g) => g.id === gradeId);
//     return grade ? grade.name : "";
//   };

//   return (
//     <PageContainer>
//       <PageHeader>
//         <PageTitle>
//           <Heading1>Score Upload</Heading1>
//         </PageTitle>
//       </PageHeader>
//       <AttendanceControls>
//         <ControlGroup>
//           <Label htmlFor="grade">Select Grade</Label>
//           <Select
//             id="grade"
//             value={selectedGrade}
//             onChange={(e) => setSelectedGrade(e.target.value)}
//           >
//             <option value="">Select Grade</option>
//             {grades.map((grade) => (
//               <option key={grade.id} value={grade.id}>
//                 {grade.name}
//               </option>
//             ))}
//           </Select>
//         </ControlGroup>

//         <ControlGroup>
//           <Label htmlFor="term">Select Term</Label>
//           <Select
//             id="term"
//             value={selectedTerm}
//             onChange={(e) => setSelectedTerm(e.target.value)}
//           >
//             <option value="">Select Term</option>
//             {terms.map((term) => (
//               <option key={term.id} value={term.id}>
//                 {term.name}
//               </option>
//             ))}
//           </Select>
//         </ControlGroup>

//         <ControlGroup>
//           <Label htmlFor="subject">Select Grade</Label>
//           <Select
//             id="subject"
//             value={selectedSubject}
//             onChange={(e) => setSelectedSubject(e.target.value)}
//           >
//             <option value="">Select Subject</option>
//             {subjects.map((subject) => (
//               <option key={subject.id} value={subject.id}>
//                 {subject.name}
//               </option>
//             ))}
//           </Select>
//         </ControlGroup>
//       </AttendanceControls>

//       {loading ? (
//         <EmptyState>Loading students...</EmptyState>
//       ) : students.length === 0 ? (
//         <EmptyState>
//           <Heading2>No students found</Heading2>
//           <p>Select a grade to view students and mark attendance.</p>
//         </EmptyState>
//       ) : (
//         <AttendanceTable>
//           {students.map((student) => (
//             <StudentRow key={student.id}>
//               <StudentInfo>
//                 <StudentAvatar>{getInitials(student.full_name)}</StudentAvatar>
//                 <StudentDetails>
//                   <StudentName>{student.full_name}</StudentName>
//                   <StudentId>ID: {student.student_id}</StudentId>
//                 </StudentDetails>
//               </StudentInfo>

//               {/* <div>{student.roll_number || "N/A"}</div> */}

//               {/* <div>
//                 <AttendanceStatus
//                   value={attendanceRecords[student.id]?.status || "present"}
//                   onChange={(e) =>
//                     handleAttendanceChange(student.id, "status", e.target.value)
//                   }
//                 >
//                   <option value="present">Present</option>
//                   <option value="absent">Absent</option>
//                   <option value="late">Late</option>
//                   <option value="half_day">Half Day</option>
//                 </AttendanceStatus>
//               </div> */}
//               <FormRow
//                 style={{
//                   display: "flex",
//                   gap: "8px",
//                   maxWidth: "60vw",
//                 }}
//               >
//                 <div>
//                   <ScoreInput
//                     type="number"
//                     placeholder="First C.A"
//                     value={scoreRecords[student.id]?.first_ca || ""}
//                     onChange={(e) =>
//                       handleScoreChange(student.id, "first_ca", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div>
//                   <ScoreInput
//                     type="number"
//                     placeholder="Second C.A"
//                     value={scoreRecords[student.id]?.second_ca || ""}
//                     onChange={(e) =>
//                       handleScoreChange(student.id, "second_ca", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div>
//                   <ScoreInput
//                     type="number"
//                     placeholder="Third C.A."
//                     value={scoreRecords[student.id]?.third_ca || ""}
//                     onChange={(e) =>
//                       handleScoreChange(student.id, "third_ca", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div>
//                   <ScoreInput
//                     type="number"
//                     placeholder="Total C.A"
//                     disabled
//                     value={
//                       Number(scoreRecords[student.id]?.first_ca || 0) +
//                         Number(scoreRecords[student.id]?.second_ca || 0) +
//                         Number(scoreRecords[student.id]?.third_ca || 0) || ""
//                     }
//                     onChange={(e) =>
//                       handleScoreChange(student.id, "total_ca", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div>
//                   <ScoreInput
//                     type="number"
//                     placeholder="Exam"
//                     max="70"
//                     maxLength="2"
//                     value={scoreRecords[student.id]?.exam || ""}
//                     onChange={(e) =>
//                       handleScoreChange(student.id, "exam", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div>
//                   <ScoreInput
//                     type="number"
//                     placeholder="Total"
//                     disabled
//                     value={
//                       Number(scoreRecords[student.id]?.total_ca || 0) +
//                         Number(scoreRecords[student.id]?.exam || 0) || ""
//                     }
//                     onChange={(e) =>
//                       handleScoreChange(student.id, "total", e.target.value)
//                     }
//                   />
//                 </div>
//               </FormRow>
//             </StudentRow>
//           ))}
//         </AttendanceTable>
//       )}

//       {students.length > 0 && (
//         <BulkActions>
//           <Button variant="primary" onClick={handleSaveScore} disabled={saving}>
//             {saving ? "Saving Score..." : "Save All Score"}
//           </Button>
//           <div style={{ flex: 1 }} />
//         </BulkActions>
//       )}
//     </PageContainer>
//   );
// };

// export default Attendance;
