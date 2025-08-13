export async function ViewSeedReport() {
  try {
    const res = await fetch(`http://weighbridge.itcraftindia.com:904/api/ReportList`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Fetched Data:", data);

    if (!res.ok) {
      throw new Error(data?.message || "Failed to fetch report");
    }

    return data;
  } catch (error) {
    console.error("API error occurred:", error);
    throw error;
  }
}
