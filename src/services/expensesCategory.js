//const API_BASE_URL = "https://muezzapets-backend.onrender.com";
const API_BASE_URL = 'http://localhost:4000'
//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const getExpensesByCompanyAPI = async (companyId) => {
  try {
    const url = `${API_BASE_URL}/categoryExpenses/${companyId}`
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await req.json()
    return data
  } catch (error) {
    return Promise.resolve(error)
  }
}
