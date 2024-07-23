import axios from "axios"

const BASE_URL = "http://localhost:8000/housecare"
const CHARITY_URL = "http://localhost:8000/charity"
const ADMIN_URL = "http://localhost:8000/admin"

//housecare staff creating
export const Createstaff = async formData => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios.post(`${BASE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (err) {
    console.log(err, "an error occure in signup")
  }
}

//staff signin
export const handleLogin = async (e, values, setLoginStatus) => {
  e.preventDefault()
  const Data = {
    email: values.email,
    password: values.password,
  }

  console.log("Attempting to login with data:", Data)

  try {
    const response = await axios.post(`${BASE_URL}/signin`, Data)
    if (response.status === 200) {
      setLoginStatus("success")
      const token = response.data.token
      localStorage.setItem("token", token)
      const HomecareAdmin = response.data.HomecareAdmin
      localStorage.setItem("HomecareAdmin", JSON.stringify(HomecareAdmin))
      console.log("Token and user data stored in Local storage")
      window.location.href = "/dashboard"
    }
  } catch (err) {
    setLoginStatus("error")
    if (err.response && err.response.status === 400) {
      console.log(err.response.data.message)
    } else {
      console.log(err.message, "something went wrong in signin")
    }
  }
}

//Housecare staff details listing
export const fetchStaff = async () => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios.get(`${BASE_URL}`)
    return response.data
  } catch (err) {
    console.error("staff list failed: internal error", err)
    throw err
  }
}

//Housecare staff delete
export const deleteStaff = async id => {
  try {
    await axios.delete(`${BASE_URL}/${id}`)
    console.log(`Deleted staff with id: ${id}`)
  } catch (err) {
    console.log(
      err.response ? err.response.data : err.message,
      "something went wrong in staff delete",
    )
    throw err
  }
}

//Staff details edit by Id
export const staffEdit = async id => {
  const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios.get(`${BASE_URL}/${id}`)
    return response.data
  } catch (err) {
    console.log(err, "staff fetching error")
    throw err
  }
}

//staff details update
export const staffUpdate = async (id, formData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (err) {
    console.error("Error updating staff:", err)
    throw err
  }
}

//revoke staff
export const toggleBlockStaff = async (id) => {
  const response = await fetch(`${BASE_URL}/block/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to toggle block status');
  }

  return response.json(); 
};

//charity organaization listing

export const fetchCharity = async () => {
  const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios.get(`${CHARITY_URL}`)
    return response.data
  } catch (err) {
    console.log(err, "charity organaization details listing failed")
  }
}

//charity organaization Add

export const handleCharity = async formData => {
  try {
    const response = await axios.post(`${CHARITY_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (err) {
    console.log(err, "Charity Organaizaztion Adding Failed")
  }
}

//charity organaization Delete

export const charityDelete = async id => {
  const confirmation = window.confirm(
    "Are you sure you want delete this product?",
  )
  if (confirmation) {
    try {
      await axios.delete(`${CHARITY_URL}/${id}`)
      console.log(`Deleted staff with id: ${id}`)
    } catch (err) {
      console.log(
        err.response ? err.response.data : err.message,
        "something went wrong in staff delete",
      )
    }
  }
}
//superadmin signin

export const handleadminLogin = async (e, values, setLoginStatus) => {
  e.preventDefault()
  const Data = {
    email: values.email,
    password: values.password,
  }

  console.log("Attempting to login with data:", Data)

  try {
    const response = await axios.post(`${ADMIN_URL}`, Data)
    if (response.status === 200) {
      setLoginStatus("success")
      const token = response.data.token
      localStorage.setItem("token", token)
      const Superadmin = response.data.Superadmin
      localStorage.setItem("Superadmin", JSON.stringify(Superadmin))
      console.log("Token and user data stored in Local storage")
      window.location.href = "/dashboard"
    }
  } catch (err) {
    setLoginStatus("error")
    if (err.response && err.response.status === 400) {
      console.log(err.response.data.message)
    } else {
      console.log(err.message, "something went wrong in signin")
    }
  }
}

//fetch Super admin 
export const fetchAdmin= async () => {
  try {
    const response = await axios.get(`${ADMIN_URL}`)
    return response.data
  } catch (err) {
    console.log(err, "Super admin details listing failed")
  }
}

//Super admin Edit ById

export const EditAdmin = async(id)=>{
  try{
  const response=await axios.get(`${ADMIN_URL}/${id}`)
  return response.data
  }catch(err){console.log(err,"Fetching admin details is failed");}
}
//charity organaization edit by Id

export const charityEdit = async id => {
    const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
  try {
    const response = await axios.get(`${CHARITY_URL}/${id}`)
    return response.data
  } catch (err) {
    console.log(err, "charity organaizatiuon fetching error")
    throw err
  }
}
//charity update
export const charityUpdate = async (id, formData) => {
  try {
    const response = await axios.put(`${CHARITY_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  } catch (err) {
    console.error("Error updating charity:", err)
    throw err
  }
}
