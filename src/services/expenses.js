//const API_BASE_URL = 'https://muezzapets-backend.onrender.com'
//const API_BASE_URL = 'http://localhost:4000'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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

export const getExpensesByCompanyAPI = async (companyId) => {
  try {
    const url = `${API_BASE_URL}/expense/company/${companyId}`
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await req.json()
    return data
  } catch (error) {
    return error
  }
}
