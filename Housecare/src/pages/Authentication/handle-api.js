import axios from "axios"

const BASE_URL = "http://localhost:8000/housecare"
const CHARITY_URL = "http://localhost:8000/charity"

//housecare staff creating
export const Createstaff = async formData => {
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


//charity organaization listing

export const fetchCharity =async()=>{
  try{
    const response = await axios.get(`${CHARITY_URL}`)
    return response.data
  }catch(err){
    console.log(err,"charity organaization details listing failed");
  }
}