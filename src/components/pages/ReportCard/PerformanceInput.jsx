import React, { useState, useEffect } from "react";
import axios from "axios";
import * as SC from "../../common/InputStyledComponents";
import { ScoresTable } from "./ReportCard.styles";
import {
  academicsService,
  studentsService,
  reportService,
} from "../../../services";

const PerformanceInput = () => {
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [terms, setTerms] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  // Skill and behaviour options
  const skillOptions = [
    { label: "MUSICAL_SKILLS", value: "Musical Skills" },
    { label: "ARTISTIC_SKILLS", value: "Artistic Skills" },
    { label: "SPORT", value: "Sport" },
    { label: "LEADERSHIP", value: "Leadership" },
  ];

  useEffect(() => {
    fetchClasses();
    fetchTerms();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedStudent && selectedTerm) {
      fetchPerformance();
    }
  }, [selectedStudent, selectedTerm]);

  const fetchClasses = async () => {
    try {
      const response = await academicsService.getGrades();
      setClasses(response);
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
      const response = await studentsService.getStudents({
        grade_id: selectedClass,
      });
      setStudents(response);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      setAlert({ type: "error", message: "Failed to load students" });
    }
  };

  const fetchPerformance = async () => {
    try {
      const response = await reportService.fetchReportCardStaffView(
        selectedStudent,
        selectedTerm,
      );
      setPerformance(response);
      if (response.skill_ratings.length === 0) {
        setPerformance((prev) => ({
          ...prev,
          skill_ratings: skillOptions.map((skill) => ({
            skill: skill.value,
            rating: 3,
          })),
        }));
      }
    } catch (error) {
      console.error("Failed to fetch performance:", error);
      // Initialize empty performance if not found
      setPerformance({
        student: selectedStudent,
        term: selectedTerm,
        class_teacher_remark: "",
        headmaster_remark: "",
        skill_ratings: skillOptions.map((skill) => ({
          skill: skill.value,
          rating: 3,
        })),
      });
    }
  };

  const handleInputChange = (field, value) => {
    setPerformance((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSkillRatingChange = (skillIndex, rating) => {
    const newSkillRatings = [...performance.skill_ratings];
    newSkillRatings[skillIndex].rating = rating;
    setPerformance((prev) => ({
      ...prev,
      skill_ratings: newSkillRatings,
    }));
  };

  const handleBehaviourRatingChange = (behaviourIndex, rating) => {
    const newBehaviourRatings = [...performance.behaviour_ratings];
    newBehaviourRatings[behaviourIndex].rating = rating;
    setPerformance((prev) => ({
      ...prev,
      behaviour_ratings: newBehaviourRatings,
    }));
  };

  const handleSavePerformance = async () => {
    if (!performance) return;

    console.log(performance);

    setLoading(true);
    setAlert(null);
    console.log("Saving performance data:", performance);

    try {
      const response = await reportService.updateOrCreateReport(
        selectedStudent,
        selectedTerm,
        performance,
      );
      setAlert({ type: "success", message: "Performance saved successfully" });
      setPerformance(response.data);
    } catch (error) {
      console.error("Failed to save performance:", error);
      setAlert({
        type: "error",
        message: "Failed to save performance. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderRatingButtons = (currentRating, onChange) => {
    return (
      <SC.RatingContainer>
        {[1, 2, 3, 4, 5].map((rating) => (
          <SC.RatingButton
            key={rating}
            active={rating === currentRating}
            onClick={() => onChange(rating)}
          >
            {rating}
          </SC.RatingButton>
        ))}
      </SC.RatingContainer>
    );
  };

  const selectedStudentName =
    students.find((s) => s === selectedStudent)?.user.last_name || "";

  return (
    <SC.InputFormContainer>
      <SC.FormSection>
        <SC.FormTitle>Report Card Comments and Psycomotor Input</SC.FormTitle>

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
                  {cls.name} - {cls.student_count}
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
            <SC.FormLabel>Select Student</SC.FormLabel>
            <SC.FormSelect
              value={selectedStudent}
              onChange={(e) => {
                console.log("Selected Student:", e.target.value);
                setSelectedStudent(e.target.value);
              }}
              disabled={!selectedClass}
            >
              <option value="">Choose a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.user.last_name} {student.user.first_name} (
                  {student.student_id})
                </option>
              ))}
            </SC.FormSelect>
          </SC.FormGroup>
        </SC.FormGrid>

        {performance && selectedStudent && selectedTerm && (
          <>
            <div style={{ margin: "30px 0" }}>
              <h3>Subject Score Details for {performance.student_name}</h3>
              <ScoresTable>
                <thead>
                  <th>Subject</th>
                  <th>Total Score</th>
                </thead>
                <tbody>
                  {performance.subject_scores &&
                    performance.subject_scores.map((score, index) => (
                      <tr key={index}>
                        <td>{score.subject_details.name}</td>
                        <td>
                          <strong>{score.term_total}</strong>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </ScoresTable>
            </div>
            <div style={{ margin: "30px 0" }}>
              <h3>Performance Details for {performance.student_name}</h3>
              <p>Complete the performance details below:</p>
            </div>

            <SC.FormGroup>
              <SC.FormLabel>Class Teacher's Remark</SC.FormLabel>
              <SC.FormTextarea
                value={performance.class_teacher_remark || ""}
                onChange={(e) =>
                  handleInputChange("class_teacher_remark", e.target.value)
                }
                placeholder="Enter teacher's remark about the student's performance..."
              />
            </SC.FormGroup>

            <SC.FormGroup>
              <SC.FormLabel>Headmaster's Remark</SC.FormLabel>
              <SC.FormTextarea
                value={performance.headmaster_remark || ""}
                onChange={(e) =>
                  handleInputChange("headmaster_remark", e.target.value)
                }
                placeholder="Enter headmaster's remark..."
              />
            </SC.FormGroup>

            <div style={{ margin: "30px 0" }}>
              <h4>Skills Rating (1-5)</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {performance.skill_ratings &&
                  performance.skill_ratings.map((skill, index) => {
                    const skillLabel =
                      skillOptions.find((s) => s.label === skill.skill)
                        ?.label || skill.skill;
                    return (
                      <div
                        key={skill.skill}
                        style={{
                          padding: "15px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {skillLabel}
                          </span>
                          <span
                            style={{
                              backgroundColor: "#3498db",
                              color: "white",
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "12px",
                            }}
                          >
                            Rating: {skill.rating}
                          </span>
                        </div>
                        {renderRatingButtons(skill.rating, (rating) =>
                          handleSkillRatingChange(index, rating),
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* <div style={{ margin: "30px 0" }}>
              <h4>Behaviour Rating (1-5)</h4>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                  gap: "20px",
                  marginTop: "20px",
                }}
              >
                {performance.behaviour_ratings &&
                  performance.behaviour_ratings.map((behaviour, index) => {
                    const behaviourLabel =
                      behaviourOptions.find(
                        (b) => b.label === behaviour.behaviour,
                      )?.label || behaviour.behaviour;
                    return (
                      <div
                        key={behaviour.behaviour}
                        style={{
                          padding: "15px",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "10px",
                          }}
                        >
                          <span style={{ fontWeight: "bold" }}>
                            {behaviourLabel}
                          </span>
                          <span
                            style={{
                              backgroundColor: "#2ecc71",
                              color: "white",
                              padding: "2px 8px",
                              borderRadius: "10px",
                              fontSize: "12px",
                            }}
                          >
                            Rating: {behaviour.rating}
                          </span>
                        </div>
                        {renderRatingButtons(behaviour.rating, (rating) =>
                          handleBehaviourRatingChange(index, rating),
                        )}
                      </div>
                    );
                  })}
              </div>
            </div> */}

            <SC.ActionButtons>
              <SC.FormButton
                variant="primary"
                onClick={handleSavePerformance}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Performance"}
              </SC.FormButton>
            </SC.ActionButtons>
          </>
        )}
      </SC.FormSection>
    </SC.InputFormContainer>
  );
};

export default PerformanceInput;
