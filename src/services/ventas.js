const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";

export const getAllVentasByCompanyAPI = async (idCompany) => {
  try {
    const url = `${API_BASE_URL}/venta/company/${idCompany}`;
    const req = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export const getVentasByDateRangeAPI = async (body) => {
  console.log("body", body)
  try {
    const url = `${API_BASE_URL}/venta/rangeDate`;
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await req.json(body);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.resolve(error);
  }
};

export const createVentaAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/venta`;
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
