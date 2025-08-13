
const loginFunction = async ({ UserName, Password }) => {
  const res = await fetch("http://weighbridge.itcraftindia.com:904/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ UserName, Password }),
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return await res.json();
};

export default loginFunction;
