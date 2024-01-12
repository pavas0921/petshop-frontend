const API_BASE_URL = import.meta.env.VITE_CLOUDINARY_API_URL;

export const uploadImageAPI = async (body) => {
    try {
      const url = `${API_BASE_URL}`;
      const req = await fetch(url, {
        method: "POST",
        body: body,
      });

      const statusCode = req.status
      if(statusCode === 200){
        console.log("status", statusCode)
        const data = await req.json();
        return Promise.resolve({data, httpStatus: statusCode});
      }
      
      
    } catch (error) {
      return Promise.resolve(error);
    }
  };