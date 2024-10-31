//const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllCompaniesAPI = async () => {
  try {
    const url = `${API_BASE_URL}/company`;
    const req = await fetch(url, {
      method: "GET",
      headers: {
        //Authorization: `Bearer ${token}`,
      },
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export const createCompanyAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/company`;
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
