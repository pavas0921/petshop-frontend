const API_BASE_URL = "https://muezzapets-backend.onrender.com";
//const API_BASE_URL = "http://localhost:4000";

//localhost:4000/categoria

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
