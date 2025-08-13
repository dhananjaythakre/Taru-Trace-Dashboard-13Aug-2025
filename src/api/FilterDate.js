export async function filterReportFunction({ FromDate, ToDate }) {
  try {
    const res = await fetch(`http://weighbridge.itcraftindia.com:904/api/flietmonthwise`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ FromDate, ToDate }),
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Fetched Data:", data);

    if (!res.ok) {
      throw new Error(data?.message || "Failed to filter report");
    }

    return data;
  } catch (error) {
    console.error("API error during filtering:", error);
    throw error;
  }
}

export default filterReportFunction;
