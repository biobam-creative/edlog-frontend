import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reportService } from "../../../services";
import { PageContainer } from "../../common";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const ReportVerify = () => {
  const [resultData, setResultData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchResultData();
  }, [id]);

  const fetchResultData = async () => {
    try {
      setLoading(true);

      const response = await reportService.verifyResult(id);
      setResultData(response);
      console.log(response);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div>Verifying Result.....</div>;
  }
  return (
    <PageContainer>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100vw",
          }}
        >
          {resultData ? (
            <>
              <div>
                <RiVerifiedBadgeFill color={"green"} size={200} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Verified Result of {resultData.student_name} of
                {" " + resultData.school_name} {" " + resultData.current_class}
                {" " + resultData.term_name} {" " + resultData.year}
              </div>
            </>
          ) : (
            <>
              <div>
                <MdCancel color={"red"} size={200} />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Result not found
              </div>
            </>
          )}
        </div>
      </div>
    </PageContainer>
  );
};

export default ReportVerify;
