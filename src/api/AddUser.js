
export async function addUser({ UserName, MobileNumber, Password}) {
  try {
    const res = await fetch(`http://weighbridge.itcraftindia.com:904/api/AddUser`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ UserName, MobileNumber, Password }),
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

export default addUser;
