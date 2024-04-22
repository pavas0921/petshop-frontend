//const API_BASE_URL = 'https://muezzapets-backend.onrender.com'
const API_BASE_URL = 'http://localhost:4000'

export const createUserAPI = async (body) => {
  try {
    const url = `${API_BASE_URL}/user`
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

export const getAllUsersAPI = async () => {
  try {
    const url = `${API_BASE_URL}/user`
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}

export const getUsersByCompanyAPI = async (idCompany) => {
  try {
    const url = `${API_BASE_URL}/user/${idCompany}`
    const req = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}

export const updateUserStatusAPI = async (_id, currentStatus) => {
  try {
    const url = `${API_BASE_URL}/user/${_id}`
    const req = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: !currentStatus }),
    })
    const data = await req.json()
    return Promise.resolve(data)
  } catch (error) {
    return Promise.resolve(error)
  }
}
