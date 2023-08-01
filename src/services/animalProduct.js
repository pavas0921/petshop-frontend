export const getAllAnimalProductAPI = async () => {
  try {
    const request = await fetch(`https://muezzapets-backend.onrender.com/animalProduct`, {
      method: "GET",
      headers: {
        //Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();
    return Promise.resolve(data);
  } catch (error) {
    console.log(error);
  }
};
