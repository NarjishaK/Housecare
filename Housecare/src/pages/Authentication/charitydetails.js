import React, { useEffect, useState } from "react"
import {
  Table,
  Card,
  Button,
  Row,
  CardBody,
  Col,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useForm } from "helpers/useForms"
import {
  charitystaffDelete,
  charitystaffEdit,
  charityStaffUpdate,
  fetchBenificiarys,
  fetchCharity,
  fetchCharitystaffs,
  handleBenificiary,
  handleCharitystaff,
  benificiaryDelete,
  benificiaryEdit,
  benificiaryUpdate
} from "./handle-api"


function CharityDetails() {
  const [modal, setmodal] = useState(false)
  const [modals, setmodals] = useState(false)
  const [edit, setEdit] = useState(false)
  const [edits, setEdits] = useState(false)
  const { id } = useParams()
  const [editId, setEditId] = useState(null)
  const [editedId, setEditedId] = useState(null)
  const [charitys, setCharitys] = useState([])
  const [image, setImage] = useState("")
  const [allcharity, setAllCharity] = useState([])
  const [benificiarys,setBenificiarys] = useState([])
  const [charitystaffs, setCharitystaffs] = useState([])
  const [values, handleChange, setValues] = useForm({
    name: "",
    email: "",
    phone: "",
    password: "",
    charity: "",
    role: "",
  })
  const [datas, handleChanges, setDatas] = useForm({
    benificiary_name: "",
    number: "",
    email_id: "",
    charity_name: "",
    nationality: "",
    sex: "",
    health_status: "",
    marital: "",
    navision_linked_no: "",
    physically_challenged: "",
    family_members: "",
    account_status: "",
    Balance: "",
  })
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      axios.defaults.headers.common["Authorization"] = token
      try {
        const response = await axios.get(
          `http://localhost:8000/charity/details/${id}`
        )
        setCharitys(response.data)
      } catch (error) {
        console.error("Error fetching charity details:", error)
      }
    }
    fetchData()
  }, [id])
  //handle image
  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }
  //fetch charity names
  useEffect(() => {
    loadData()
    fetchData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetchCharity()
      setAllCharity(response)
      const respond = await fetchCharitystaffs()
      setCharitystaffs(respond)
    } catch (err) {
      console.log(err)
    }
  }
  // Filter charity staffs based on the selected charity
  const filteredCharityStaffs = charitystaffs.filter(
    staff => staff.charity === charitys.charity
  )
  //charity staff create
  const charitystaffCreate = async e => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })
    formData.append("image", image)
    try {
      await handleCharitystaff(formData)
      alert("success")
      loadData()
    } catch (err) {
      alert("failed")
      console.log(err, "Charity staffs adding failed")
    
    }
  }
  //charity staff delete
  const handleDelete = async id => {
    try {
      await charitystaffDelete(id)
      loadData()
    } catch (err) {
      console.log(err, "delete failed")
    }
  }
  //charity staffs edit
  const handleEdit = async id => {
    try {
      const charitystaffDetails = await charitystaffEdit(id)
      setEditId(id)
      setValues({
        charity: charitystaffDetails.charity,
        email: charitystaffDetails.email,
        role: charitystaffDetails.role,
        phone: charitystaffDetails.phone,
        name: charitystaffDetails.name,
        password: charitystaffDetails.password,
        image: charitystaffDetails.image,
      })
    } catch (err) {
      console.log("an error occured", err)
    }
  }
  //charity staff update
  const handleUpdate = async e => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(values).forEach(key => {
      formData.append(key, values[key])
    })

    if (image) {
      formData.append("image", image)
    }

    try {
      await charityStaffUpdate(editId, formData)
      loadData()
      alert("Update successful")
    } catch (err) {
      console.error("Error updating charitystaff:", err)
      alert("Update failed")
    }
  }
  //create benificiary
  const benificiaryCreate = async e => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(datas).forEach(key => {
      formData.append(key, datas[key])
    })
    try {
  
      await handleBenificiary(formData)
      fetchData()
      alert("success")
      
    } catch (err) {
      console.log(err, "benificiary adding failed")
      alert("failed")
    }
  }
    const fetchData = async () => {
      try {
        const response = await fetchBenificiarys()
        setBenificiarys(response)
      } catch (error) {
        console.error("Error fetching benificiary details:", error)
      }
    }
    // filter benificiarys based on the selected charity
    const filteredBenificiarys = benificiarys.filter(
      benificiary => benificiary.charity_name === charitys.charity
    )
    //benificiary delete
    const deleteBenificiary = async id => {
      try {
        await benificiaryDelete(id)
        fetchData()
      } catch (err) {
        console.log(err, "delete failed")
      }
    }
    //benificiary edit
    const editBenificiary = async id => {
      try {
        const benificiaryDetails = await benificiaryEdit(id)
        setEditedId(id)
        setDatas({
          charity_name: benificiaryDetails.charity_name,
          email_id: benificiaryDetails.email_id,
          number: benificiaryDetails.number,
          nationality: benificiaryDetails.nationality,
          Balance: benificiaryDetails.Balance,
          sex: benificiaryDetails.sex,
          health_status: benificiaryDetails.health_status,
          marital: benificiaryDetails.marital,
          navision_linked_no: benificiaryDetails.navision_linked_no,
          physically_challenged: benificiaryDetails.physically_challenged,
          family_members: benificiaryDetails.family_members,
          account_status: benificiaryDetails.account_status,
          benificiary_name: benificiaryDetails.benificiary_name,
        })
      } catch (err) {
        console.log("an error occured", err)
      }
    }
    //handle benificiary update
    const handleBenificiaryUpdate = async e => {
      e.preventDefault()
      const formData = new FormData()
      Object.keys(datas).forEach(key => {
        formData.append(key, datas[key])
      })
      try {
        await benificiaryUpdate(editedId, formData)
        fetchData()
        alert("Update successful")
      } catch (err) {
        console.error("Error updating benificiary:", err)
        alert("Update failed")
      }
    }
  return (
    <React.Fragment>
      <Card>
        <div className="card-body">
          <p className="card-title " style={{ color: "gray" }}>
            {" "}
            {charitys.charity} {charitys.arbic}
          </p>
          <img
            src={`http://localhost:8000/upload/${charitys.image}`}
            alt="user"
            className="avatar-xs me-2 rounded-circle"
          />{" "}
          {charitys.authorizedperson}({charitys.role})
          <div className="table-responsive">
            <Table className="align-middle table-centered table-vertical table-nowrap mb-1">
              <tbody>
                <tr>
                  <td>
                    Id: {charitys._id}
                    <br />
                    Phone: {charitys.phone}
                    <br />
                    Email: {charitys.email}
                  </td>
                  <td>
                    CR_NO: {charitys.CR_NO} <br />
                    VAT_REG_NO: {charitys.VAT_REG_NO}
                    <br />
                    Date: {charitys.date}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Card>
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="p" style={{ color: "gray" }}>
                <Card>
                  <CardBody>
                    <div>
                      <Link
                        onClick={() => {
                          setmodal(!modal)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          color="gray"
                          class="bi bi-plus-circle-dotted"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg>
                      </Link>{" "}
                      ADMINS
                    </div>

                    <Modal
                      size="lg"
                      isOpen={modal}
                      toggle={() => {
                        setmodal(!modal)
                      }}
                    >
                      <ModalHeader
                        toggle={() => {
                          setmodal(!modal)
                        }}
                      >
                        Admin Form
                      </ModalHeader>
                      <ModalBody>
                        <form>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder="Enter Name"
                                  value={values.name}
                                  onChange={handleChange}
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email"
                                  placeholder="Enter Email"
                                  value={values.email}
                                  onChange={handleChange}
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="phone">Phone</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="phone"
                                  placeholder="Enter Phone No."
                                  value={values.phone}
                                  onChange={handleChange}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="charity">Charity</label>
                                <select
                                  value={values.charity}
                                  onChange={handleChange}
                                  name="charity"
                                  className="form-control"
                                >
                                  <option>select charity</option>
                                  {allcharity.map(charities => (
                                    <option
                                      key={charities._id}
                                      value={charities.charity}
                                      disabled={
                                        charities.charity !== charitys.charity
                                      }
                                    >
                                      {charities.charity}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="role">Role</label>
                                <select
                                  className="form-control"
                                  name="role"
                                  value={values.role}
                                  onChange={handleChange}
                                >
                                  <option>Role</option>
                                  <option>DATA_ENTRY</option>
                                  <option>DATA_VERIFY</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <input
                                  type="password"
                                  className="form-control"
                                  name="password"
                                  placeholder="Enter Password"
                                  value={values.password}
                                  onChange={handleChange}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={12}>
                              <div className="mb-3">
                                <label htmlFor="image">Image</label>
                                <input
                                  className="form-control"
                                  name="image"
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImage}
                                  rows="3"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={12}>
                              <div className="text-right">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={charitystaffCreate}
                                >
                                  save
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      </ModalBody>
                    </Modal>
                  </CardBody>
                </Card>
              </CardTitle>

              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                      <th>Role</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCharityStaffs.map(charitystaff => (
                      <tr className="table-light">
                        <td>
                          <img
                            src={`http://localhost:8000/upload/${charitystaff.image}`}
                            alt="user"
                            className="avatar-xs me-2 rounded-circle"
                          />{" "}
                          {charitystaff.name}
                        </td>
                        <td>{charitystaff.email}</td>
                        <td>{charitystaff.phone}</td>
                        <td>{charitystaff.role}</td>
                        <td
                          style={{
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              color="black"
                              class="bi bi-person-fill-slash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                            </svg>
                          </Button>

                          <div
                            onClick={() => {
                              setEdit(!edit)
                            }}
                          >
                            <Button
                              onClick={() => handleEdit(charitystaff._id)}
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                color="black"
                                class="bi bi-pencil"
                                viewBox="0 0 16 16"
                              >
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                              </svg>
                            </Button>
                          </div>

                          <Modal
                            size="lg"
                            isOpen={edit}
                            toggle={() => {
                              setEdit(!edit)
                            }}
                          >
                            <ModalHeader
                              toggle={() => {
                                setEdit(!edit)
                              }}
                            >
                              Form
                            </ModalHeader>
                            <ModalBody>
                              <form>
                                <Row>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <label htmlFor="name">Name</label>
                                      <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        placeholder="Enter Name"
                                        value={values.name}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <label htmlFor="email">Email</label>
                                      <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        placeholder="Enter Email"
                                        value={values.email}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <label htmlFor="phone">Phone</label>
                                      <input
                                        type="number"
                                        className="form-control"
                                        name="phone"
                                        placeholder="Enter Phone No."
                                        value={values.phone}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <label htmlFor="charity">Charity</label>
                                      <select
                                        value={values.charity}
                                        onChange={handleChange}
                                        name="charity"
                                        className="form-control"
                                      >
                                        <option>select charity</option>
                                        {allcharity.map(charities => (
                                          <option
                                            key={charities._id}
                                            value={charities.charity}
                                            disabled={
                                              charities.charity !==
                                              charitys.charity
                                            }
                                          >
                                            {charities.charity}
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <label htmlFor="role">Role</label>
                                      <select
                                        className="form-control"
                                        name="role"
                                        value={values.role}
                                        onChange={handleChange}
                                      >
                                        <option>Role</option>
                                        <option>DATA_ENTRY</option>
                                        <option>DATA_VERIFY</option>
                                      </select>
                                    </div>
                                  </Col>
                                  <Col lg={4}>
                                    <div className="mb-3">
                                      <label htmlFor="password">Password</label>
                                      <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Enter Password"
                                        value={values.password}
                                        onChange={handleChange}
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={12}>
                                    <div className="mb-3">
                                      <label htmlFor="image">Image</label>
                                      <input
                                        className="form-control"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImage}
                                        rows="3"
                                      />
                                    </div>
                                  </Col>
                                </Row>
                                <Row>
                                  <Col lg={12}>
                                    <div className="text-right">
                                      <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={handleUpdate}
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </Col>
                                </Row>
                              </form>
                            </ModalBody>
                          </Modal>
                          <Button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() => handleDelete(charitystaff._id)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              color="black"
                              class="bi bi-trash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                              <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                            </svg>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>

      {/* Benficiaries */}
      <Row>
        <Col>
          <Card>
            <CardBody>
              <CardTitle className="p" style={{ color: "gray" }}>
                <Card>
                  <CardBody>
                    <div>
                      <Link
                        onClick={() => {
                          setmodals(!modals)
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          color="gray"
                          class="bi bi-plus-circle-dotted"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                        </svg>
                      </Link>{" "}
                      BENIFICIARIES
                    </div>

                    <Modal
                      size="lg"
                      isOpen={modals}
                      toggle={() => {
                        setmodals(!modals)
                      }}
                    >
                      <ModalHeader
                        toggle={() => {
                          setmodals(!modals)
                        }}
                      >
                        Admin Form
                      </ModalHeader>
                      <ModalBody>
                        <form>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="benificiary_name"
                                  placeholder="Enter Name"
                                  value={datas.benificiary_name}
                                  onChange={handleChanges}
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email_id"
                                  placeholder="Enter Email"
                                  value={datas.email_id}
                                  onChange={handleChanges}
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="phone">Phone</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="number"
                                  placeholder="Enter Phone No."
                                  value={datas.number}
                                  onChange={handleChanges}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="charity">Charity</label>
                                <select
                                  value={datas.charity_name}
                                  onChange={handleChanges}
                                  name="charity_name"
                                  className="form-control"
                                >
                                  <option>select charity</option>
                                  {allcharity.map(charities => (
                                    <option
                                      key={charities._id}
                                      value={charities.charity}
                                      disabled={
                                        charities.charity !== charitys.charity
                                      }
                                    >
                                      {charities.charity}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="nationality">Nationality</label>
                                <input
                                  className="form-control"
                                  name="nationality"
                                  value={datas.nationality}
                                  onChange={handleChanges}
                                  placeholder="Enter Nationality"
                                  type="text"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="sex">Sex</label>
                                <select
                                  className="form-control"
                                  name="sex"
                                  value={datas.sex}
                                  onChange={handleChanges}
                                >
                                  <option>select sex</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="health status">Health status</label>
                                <input
                                  className="form-control"
                                  name="health_status"
                                  value={datas.health_status}
                                  onChange={handleChanges}
                                  placeholder="Health status"
                                  type="text"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="marital">Marital</label>
                                <select
                                  className="form-control"
                                  name="marital"
                                  value={datas.marital}
                                  onChange={handleChanges}
                                >
                                  <option>select marital</option>
                                  <option value="married">Married</option>
                                  <option value="single">Single</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="navision_linked_no">
                                  Navision linked No
                                </label>
                                <input
                                  className="form-control"
                                  name="navision_linked_no"
                                  value={datas.navision_linked_no}
                                  onChange={handleChanges}
                                  placeholder="Navision linked no"
                                  type="text"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="physically_challenged">
                                  Physically Challenged
                                </label>
                                <select
                                  className="form-control"
                                  name="physically_challenged"
                                  value={datas.physically_challenged}
                                  onChange={handleChanges}
                                >
                                  <option> physically challenged</option>
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="family_members">
                                  Family Members
                                </label>
                                <input
                                  className="form-control"
                                  name="family_members"
                                  value={datas.family_members}
                                  onChange={handleChanges}
                                  placeholder="Family Members"
                                  type="text"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="account_status">
                                  Account Status
                                </label>
                                <select
                                  className="form-control"
                                  name="account_status"
                                  value={datas.account_status}
                                  onChange={handleChanges}
                                >
                                  <option>select account_status</option>
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select> 
                              </div>
                            </Col>

                          </Row>
                          <Row>
                            <Col lg={12}>
                              <div className="mb-3">
                                <label htmlFor="Balance">Balance</label>
                                <input
                                  className="form-control"
                                  name="Balance"
                                  value={datas.Balance}
                                  onChange={handleChanges}
                                  placeholder="Balance"
                                  type="number"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={12}>
                              <div className="text-right">
                                <button
                                  type="submit"
                                  className="btn btn-primary"
                                  onClick={benificiaryCreate}
                                >
                                  save
                                </button>
                              </div>
                            </Col>
                          </Row>
                        </form>
                      </ModalBody>
                    </Modal>
                  </CardBody>
                </Card>
              </CardTitle>

              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Id</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Nationality</th>
                      <th>Sex</th>
                      <th>Balance</th>
                      <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBenificiarys.map((benificiary) => (
                    <tr className="table-light">
                      <td>{benificiary.benificiary_name}</td>
                      <td>{benificiary._id}</td>
                      <td>{benificiary.number}</td>
                      <td>{benificiary.email_id}</td>
                      <td>{benificiary.nationality}</td>
                      <td>{benificiary.sex}</td>
                      <td>{benificiary.Balance}</td>
                      <td
                        style={{
                          textAlign: "center",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            color="black"
                            class="bi bi-person-fill-slash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M13.879 10.414a2.501 2.501 0 0 0-3.465 3.465zm.707.707-3.465 3.465a2.501 2.501 0 0 0 3.465-3.465m-4.56-1.096a3.5 3.5 0 1 1 4.949 4.95 3.5 3.5 0 0 1-4.95-4.95ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4" />
                          </svg>
                        </Button>
                        <div
                          onClick={() => {
                            setEdits(!edits)
                          }}
                        >
                          <Button
                            onClick={() => editBenificiary(benificiary._id)}
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              color="black"
                              class="bi bi-pencil"
                              viewBox="0 0 16 16"
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                            </svg>
                          </Button>
                        </div>

                        <Modal
                          size="lg"
                          isOpen={edits}
                          toggle={() => {
                            setEdits(!edits)
                          }}
                        >
                          <ModalHeader
                            toggle={() => {
                              setEdits(!edits)
                            }}
                          >
                            Form
                          </ModalHeader>
                          <ModalBody>
                            <form>
                            <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="name">Name</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="benificiary_name"
                                  placeholder="Enter Name"
                                  value={datas.benificiary_name}
                                  onChange={handleChanges}
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <input
                                  type="email"
                                  className="form-control"
                                  name="email_id"
                                  placeholder="Enter Email"
                                  value={datas.email_id}
                                  onChange={handleChanges}
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="phone">Phone</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  name="number"
                                  placeholder="Enter Phone No."
                                  value={datas.number}
                                  onChange={handleChanges}
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="charity">Charity</label>
                                <select
                                  value={datas.charity_name}
                                  onChange={handleChanges}
                                  name="charity_name"
                                  className="form-control"
                                >
                                  <option>select charity</option>
                                  {allcharity.map(charities => (
                                    <option
                                      key={charities._id}
                                      value={charities.charity}
                                      disabled={
                                        charities.charity !== charitys.charity
                                      }
                                    >
                                      {charities.charity}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="nationality">Nationality</label>
                                <input
                                  className="form-control"
                                  name="nationality"
                                  value={datas.nationality}
                                  onChange={handleChanges}
                                  placeholder="Enter Nationality"
                                  type="text"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="sex">Sex</label>
                                <select
                                  className="form-control"
                                  name="sex"
                                  value={datas.sex}
                                  onChange={handleChanges}
                                >
                                  <option>select sex</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="health status">Health status</label>
                                <input
                                  className="form-control"
                                  name="health_status"
                                  value={datas.health_status}
                                  onChange={handleChanges}
                                  placeholder="Health status"
                                  type="text"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="marital">Marital</label>
                                <select
                                  className="form-control"
                                  name="marital"
                                  value={datas.marital}
                                  onChange={handleChanges}
                                >
                                  <option>select marital</option>
                                  <option value="married">Married</option>
                                  <option value="single">Single</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="navision_linked_no">
                                  Navision linked No
                                </label>
                                <input
                                  className="form-control"
                                  name="navision_linked_no"
                                  value={datas.navision_linked_no}
                                  onChange={handleChanges}
                                  placeholder="Navision linked no"
                                  type="text"
                                />
                              </div>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="physically_challenged">
                                  Physically Challenged
                                </label>
                                <select
                                  className="form-control"
                                  name="physically_challenged"
                                  value={datas.physically_challenged}
                                  onChange={handleChanges}
                                >
                                  <option> physically challenged</option>
                                  <option value="yes">Yes</option>
                                  <option value="no">No</option>
                                </select>
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="family_members">
                                  Family Members
                                </label>
                                <input
                                  className="form-control"
                                  name="family_members"
                                  value={datas.family_members}
                                  onChange={handleChanges}
                                  placeholder="Family Members"
                                  type="text"
                                />
                              </div>
                            </Col>
                            <Col lg={4}>
                              <div className="mb-3">
                                <label htmlFor="account_status">
                                  Account Status
                                </label>
                                <select
                                  className="form-control"
                                  name="account_status"
                                  value={datas.account_status}
                                  onChange={handleChanges}
                                >
                                  <option>select account_status</option>
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select> 
                              </div>
                            </Col>

                          </Row>
                          <Row>
                            <Col lg={12}>
                              <div className="mb-3">
                                <label htmlFor="Balance">Balance</label>
                                <input
                                  className="form-control"
                                  name="Balance"
                                  value={datas.Balance}
                                  onChange={handleChanges}
                                  placeholder="Balance"
                                  type="number"
                                />
                              </div>
                            </Col>
                          </Row>
                              <Row>
                                <Col lg={12}>
                                  <div className="text-right">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                      onClick={handleBenificiaryUpdate}
                                    >
                                      Update
                                    </button>
                                  </div>
                                </Col>
                              </Row>
                            </form>
                          </ModalBody>
                        </Modal>
                        <Button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => deleteBenificiary(benificiary._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            color="black"
                            class="bi bi-trash"
                            viewBox="0 0 16 16"
                          >
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CharityDetails