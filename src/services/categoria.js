const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";


export const getAllCategoryAPI = async () => {
  try {
    const url = `${API_BASE_URL}/categoria`;
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

export const getAllCategoryByIdAPI = async (idCompany) => {
  try {
    const url = `${API_BASE_URL}/categoria/${idCompany}`;
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

export const createCategoryAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/categoria`;
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
