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

export const getDailyExpensesCountAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/expense/dailyCount`
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch {
    return Promise.resolve(error)
  }
}

export const getExpensesByDateRangeAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/expenses/rangeDate`
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await req.json(body)
    return Promise.resolve(data)
  } catch (error) {
    res.status(+process.env.HTTP_INTERNAL_SERVER_ERROR).json({
      httpStatus: +process.env.HTTP_INTERNAL_SERVER_ERROR,
      message:
        'Ocurrió un error al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.',
      status: 'error',
    })
  }
}
