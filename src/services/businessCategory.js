const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getAllBusinessCategoryAPI = async () => {
    try {
      const url = `${API_BASE_URL}/businessCategory`;
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