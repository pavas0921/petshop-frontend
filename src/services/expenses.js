const API_BASE_URL = 'https://muezzapets-backend.onrender.com'
//const API_BASE_URL = "http://localhost:4000";

export const createExpenseAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/expense`
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await req.json()
    return data
  } catch (error) {
    return error
  }
}
