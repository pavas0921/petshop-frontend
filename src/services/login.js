const API_BASE_URL = "http://localhost:4000";

export const loginAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/user/login`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};
