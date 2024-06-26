const API_BASE_URL = 'https://muezzapets-backend.onrender.com'
//const API_BASE_URL = 'http://localhost:4000'

export const getSupplierByCompanyAPI = async (idCompany) => {
  try {
    const url = `${API_BASE_URL}/supplier/${idCompany}`
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        //Authorization: `Bearer ${token}`,
      },
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}

export const createSupplierAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/supplier`
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}

export const updateSupplierByIdAPI = async (body, _id) => {
  try {
    const url = `${API_BASE_URL}/supplier/${_id}`
    const req = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const data = await req.json()
    console.log('data', data)
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}
