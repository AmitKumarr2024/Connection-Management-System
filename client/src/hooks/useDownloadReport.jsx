import { useState } from "react";

const useDownloadReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadReport = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/report/download-report", {
        method: "GET",
        headers: {
          "Content-Type": "text/csv",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to download report");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "user_project_offer_need_connection_report.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { downloadReport, loading, error };
};

export default useDownloadReport;
