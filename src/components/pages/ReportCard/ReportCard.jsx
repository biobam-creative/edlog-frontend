import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import * as SC from "./ReportCard.styles";
import { studentsService } from "../../../services";
import { reportService } from "../../../services";
import { useAuth } from "../../../contexts/AuthContext";
import edlogLogo from "../../../assets/edlog logo color.png";

const ReportCard = ({ studentId, term }) => {
  const [reportData, setReportData] = useState(null);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchReportCard();
  }, [studentId, term]);

  const fetchReportCard = async () => {
    if (term && studentId) {
      try {
        setLoading(true);

        const response = await reportService.fetchReportCard(studentId, term);
        setReportData(response);
        console.log(response);
        setError(null);
      } catch (err) {
        setError(
          "Failed to load report card. Please check your connection and try again.",
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendEmail = async () => {
    if (!reportData || sendingEmail) return;

    setSendingEmail(true);
    setEmailStatus(null);

    try {
      const response = await axios.post(
        `/api/report/${reportData.id}/send-email/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        },
      );

      if (response.data.success) {
        setEmailStatus({
          type: "success",
          message: `Report sent successfully to ${response.data.sent_to}`,
        });

        // Update report data to reflect email was sent
        setReportData((prev) => ({
          ...prev,
          report_sent: true,
          report_sent_at: new Date().toISOString(),
        }));
      } else {
        setEmailStatus({
          type: "error",
          message: `Failed to send email: ${response.data.error}`,
        });
      }
    } catch (err) {
      setEmailStatus({
        type: "error",
        message: "Failed to send email. Please try again later.",
      });
    } finally {
      setSendingEmail(false);
    }
  };

  const renderRatingStars = (rating) => {
    return (
      <SC.RatingStars>
        {[1, 2, 3, 4, 5].map((star) => (
          <SC.Star key={star} filled={star <= rating}>
            ★
          </SC.Star>
        ))}
      </SC.RatingStars>
    );
  };

  if (loading) {
    return (
      <SC.Loading>
        <div>Loading report card...</div>
        <div style={{ fontSize: "14px", color: "#7f8c8d" }}>
          Please wait while we fetch the student's performance data
        </div>
      </SC.Loading>
    );
  }

  if (error) {
    return (
      <SC.Error>
        <div>{error}</div>
        <SC.PrintButton onClick={fetchReportCard} style={{ marginTop: "20px" }}>
          Try Again
        </SC.PrintButton>
      </SC.Error>
    );
  }

  if (!reportData) {
    return (
      <SC.Error>
        No report data available for the selected term and year.
      </SC.Error>
    );
  }

  return (
    <SC.ReportCardContainer>
      {/* Email Status Notification */}
      {emailStatus && (
        <SC.NotificationMessage success={emailStatus.type === "success"}>
          {emailStatus.message}
        </SC.NotificationMessage>
      )}

      {/* Header with Action Buttons */}
      <SC.ReportHeader>
        <SC.PrintButton onClick={handlePrint}>Print Report</SC.PrintButton>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SC.SchoolLogo
            src={`http://10.249.111.57:8000/media/${reportData.school_logo}`}
          />
          <div>
            <SC.SchoolName>{reportData.school_name}</SC.SchoolName>
            <p>{reportData.school_address}</p>
            <SC.ReportTitle>STUDENT REPORT SHEET</SC.ReportTitle>
          </div>
        </div>
      </SC.ReportHeader>

      {/* Email Notification Section */}
      <SC.EmailNotification sent={reportData.report_sent}>
        <SC.EmailStatus
          bold={!reportData.report_sent}
          success={reportData.report_sent}
        >
          {reportData.report_sent ? (
            <>
              <span>✓</span>
              <span>
                Report sent to parent on{" "}
                {new Date(reportData.report_sent_at).toLocaleDateString()}
              </span>
            </>
          ) : (
            <>
              <span>📧</span>
              <span>Report not yet sent to parent</span>
            </>
          )}
        </SC.EmailStatus>

        {!reportData.report_sent && (
          <SC.PrintButton
            onClick={handleSendEmail}
            disabled={sendingEmail}
            primary
          >
            {sendingEmail ? "Sending..." : "Send to Parent"}
          </SC.PrintButton>
        )}
      </SC.EmailNotification>

      {/* Student Information */}
      <div>
        <SC.InfoGrid>
          <SC.InfoItem>
            <SC.InfoLabel>NAME</SC.InfoLabel>
            <SC.InfoValue>{reportData.student_name}</SC.InfoValue>
          </SC.InfoItem>
          <SC.InfoItem>
            <SC.InfoLabel>ADMISSION NUMBER</SC.InfoLabel>
            <SC.InfoValue>{reportData.student_id}</SC.InfoValue>
          </SC.InfoItem>
          <SC.InfoItem>
            <SC.InfoLabel>CLASS</SC.InfoLabel>
            <SC.InfoValue>{reportData.current_class}</SC.InfoValue>
          </SC.InfoItem>
          <SC.InfoItem>
            <SC.InfoLabel>TERM</SC.InfoLabel>
            <SC.InfoValue>{reportData.term_name}</SC.InfoValue>
          </SC.InfoItem>
          <SC.InfoItem>
            <SC.InfoLabel>YEAR</SC.InfoLabel>
            <SC.InfoValue>{reportData.year}</SC.InfoValue>
          </SC.InfoItem>
          <SC.InfoItem>
            <SC.InfoLabel>NO. IN CLASS</SC.InfoLabel>
            <SC.InfoValue>
              {reportData.subject_scores[0].grade.student_count}
            </SC.InfoValue>
          </SC.InfoItem>
          <SC.InfoItem>
            <SC.InfoLabel>TIMES SCHOOL OPENED</SC.InfoLabel>
            <SC.InfoValue>{reportData.times_school_opened}</SC.InfoValue>
          </SC.InfoItem>
          <SC.InfoItem highlight>
            <SC.InfoLabel>TIMES PRESENT</SC.InfoLabel>
            <SC.InfoValue>{reportData.times_present}</SC.InfoValue>
          </SC.InfoItem>
        </SC.InfoGrid>
      </div>

      {/* Academic Performance */}
      <div>
        <SC.SectionTitle>ACADEMIC PERFORMANCE</SC.SectionTitle>
        <SC.ScoresTable>
          <thead>
            <tr>
              <th>SUBJECT</th>
              <th>CA1</th>
              <th>CA2</th>
              <th>CA3</th>
              <th>TOTAL CA</th>
              <th>EXAM</th>
              <th>TOTAL</th>
              <th>REMARK</th>
            </tr>
          </thead>
          <tbody>
            {reportData.subject_scores &&
              reportData.subject_scores.map((subject, index) => (
                <tr key={index}>
                  <td>{subject.subject_details.name}</td>
                  <td>{subject.ca_1}</td>
                  <td>{subject.ca_2}</td>
                  <td>{subject.ca_3}</td>
                  <td>{subject.total_ca}</td>
                  <td>{subject.exam}</td>
                  <td>
                    <strong>{subject.term_total}</strong>
                  </td>
                  <td>{subject.remarks}</td>
                </tr>
              ))}
          </tbody>
        </SC.ScoresTable>
      </div>

      {/* Summary Section */}
      <SC.SummarySection>
        <SC.SummaryItem>
          <span>SUBJECT(S) OFFERED</span>
          <span>{reportData.subject_scores.length}</span>
        </SC.SummaryItem>
        <SC.SummaryItem>
          <span>MARK OBTAINED</span>
          <span>{reportData.marks_obtained}</span>
        </SC.SummaryItem>
        <SC.SummaryItem>
          <span>MARK OBTAINABLE</span>
          <span>{reportData.marks_obtainable}</span>
        </SC.SummaryItem>
        <SC.SummaryItem highlight>
          <span>% OF MARK</span>
          <span>{reportData.percentage_marks}%</span>
        </SC.SummaryItem>
      </SC.SummarySection>

      {/* Remarks Section */}
      <SC.RemarksSection>
        <SC.RemarkBox>
          <SC.RemarkTitle>CLASS TEACHER'S REMARK</SC.RemarkTitle>
          <p>{reportData.class_teacher_remark}</p>
        </SC.RemarkBox>
        <SC.RemarkBox>
          <SC.RemarkTitle>HEADMASTER'S REMARK</SC.RemarkTitle>
          <p>{reportData.headmaster_remark}</p>
        </SC.RemarkBox>
      </SC.RemarksSection>

      {/* Next Term */}
      <SC.NextTerm>
        <strong>NEXT TERM BEGINS:</strong>{" "}
        {new Date(reportData.next_term_begins).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </SC.NextTerm>

      {/* Skills & Behaviour */}
      <SC.SectionTitle>SKILLS & BEHAVIOUR</SC.SectionTitle>
      <SC.SkillsBehaviourContainer>
        <div>
          <SC.SkillsGrid>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: "10px" }}>
                PSYCOMOTOR SKILLS 1 - 5
              </div>
              {reportData.skill_ratings &&
                reportData.skill_ratings.map((skill, index) => (
                  <div key={index} style={{ margin: "8px 0" }}>
                    {skill.skill_name}
                  </div>
                ))}
            </div>
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  marginBottom: "10px",
                  textAlign: "center",
                }}
              >
                1 2 3 4 5
              </div>
              {reportData.skill_ratings &&
                reportData.skill_ratings.map((skill, index) => (
                  <div key={index} style={{ margin: "8px 0" }}>
                    {renderRatingStars(skill.rating)}
                  </div>
                ))}
            </div>
            <div>
              {" "}
              <QRCodeSVG
                value={`10.249.111.57:5173/verify-result/${reportData.id}`}
                size={100}
                bgColor="#fff"
                fgColor="#000"
                level="L"
              />
            </div>
          </SC.SkillsGrid>
        </div>
        <SC.KeyRatings>
          <h5 style={{ margin: "0 0 15px 0" }}>KEY TO RATINGS</h5>
          <SC.KeyGrid>
            <SC.KeyItem>
              <SC.RatingNumber>5</SC.RatingNumber>
              <span>Excellent</span>
            </SC.KeyItem>
            <SC.KeyItem>
              <SC.RatingNumber>4</SC.RatingNumber>
              <span>Good</span>
            </SC.KeyItem>
            <SC.KeyItem>
              <SC.RatingNumber>3</SC.RatingNumber>
              <span>Fair</span>
            </SC.KeyItem>
            <SC.KeyItem>
              <SC.RatingNumber>2</SC.RatingNumber>
              <span>Poor</span>
            </SC.KeyItem>
            <SC.KeyItem>
              <SC.RatingNumber>1</SC.RatingNumber>
              <span>Very Poor</span>
            </SC.KeyItem>
          </SC.KeyGrid>
        </SC.KeyRatings>
      </SC.SkillsBehaviourContainer>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          width: "100%",
        }}
      >
        <p style={{ display: "flex", alignItems: "center" }}>
          Powered by <img src={edlogLogo} style={{ height: "70px" }} />
        </p>
      </div>

      {/* Key to Ratings */}
    </SC.ReportCardContainer>
  );
};

export default ReportCard;
