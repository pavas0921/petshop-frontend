const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";

export const getCustomerByCompanyAPI = async (companyId) => {
    try {
      const url = `${API_BASE_URL}/customer/company/${companyId}`;
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

  export const createCustomerAPI = async (body) => {
    try {
      const url = `${API_BASE_URL}/customer`;
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

  export const updateCustomerByIdAPI = async (body, _id) => {
    try {
      const url = `${API_BASE_URL}/customer/updateCustomer/${_id}`;
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
  