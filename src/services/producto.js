const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllProductsAPI = async (companyId) => {
  try {
    console.log("hola")
    const url = `${API_BASE_URL}/product/company/${companyId}/all`;
    console.log("entro", url)
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

export const getProductsByCompanyAPI = async (companyId) => {
  try {
    const url = `${API_BASE_URL}/product/company/${companyId}`;
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

export const createProductAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/product`;
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

export const disableProductByIdAPI = async (body, _id) => {
  try {
    const url = `${API_BASE_URL}/product/updateStatus/${_id}`;
    const req = await fetch(url, {
      method: "PUT",
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

export const updateProductByIdAPI = async (body, _id) => {
  try {
    const url = `${API_BASE_URL}/product/updateProduct/${_id}`;
    const req = await fetch(url, {
      method: "PATCH",
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
