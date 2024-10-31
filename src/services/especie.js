//const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getAllEspeciesAPI = async () => {
  try {
    const url = `${API_BASE_URL}/especie`;
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


export const getEspeciesByCompanyAPI = async (idCompany) => {
  try {
    const url = `${API_BASE_URL}/especie/${idCompany}`;
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

export const createEspecieAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/especie`;
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
