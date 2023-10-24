const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";

export const getAllDetalleProductoAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/detalleProducto`;
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

export const getDetalleByIdProductoAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/detalleProducto/${body}`;
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

export const createDetalleProductoAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/detalleProducto`;
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
