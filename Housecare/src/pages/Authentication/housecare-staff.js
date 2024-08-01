import React, { useEffect, useState } from "react"
import {
  Table,
  Card,
  CardBody,
  Button,
  Col,
  Row,
  ModalBody,
  Modal,
  ModalHeader,
} from "reactstrap"
import {
  fetchStaff,
  deleteStaff,
  staffEdit,
  staffUpdate,
  toggleBlockStaff,
} from "./handle-api"
import { Link } from "react-router-dom"
import { useForm } from "helpers/useForms"

function Staff() {
  const isSuperadmin = !!localStorage.getItem("Superadmin")
  const [modal, setModal] = useState(false)
  const [staff, setStaff] = useState([])
  const [values, handleChange, setValues] = useForm({
    staff: "",
    email: "",
    password: "",
    iqama: "",
    phone: "",
  })
  const [image, setImage] = useState("")
  const [editId, setEditId] = useState(null)

  const toggleModal = () => setModal(!modal)

  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const staffData = await fetchStaff()
      setStaff(staffData)
    } catch (err) {
      console.error(err)
    }
  }
  //staff delete
  const handleDelete = async id => {
    const confirmation = window.confirm(
      "Are you sure you want delete this product?"
    )
    if (confirmation) {
      try {
        await deleteStaff(id)
        loadData()
        alert("Success")
      } catch (err) {
        console.error("Error deleting staff:", err)
        alert("Failed")
      }
    }
  }
  //staff editing By Id
  const handleEdit = async id => {
    try {
      const staffData = await staffEdit(id)
      setValues({
        staff: staffData.staff,
        email: staffData.email,
        iqama: staffData.iqama,
        phone: staffData.phone,
      })
      setImage(staffData.image)
      setEditId(id)
      toggleModal()
    } catch (err) {
      console.log(err, "staff fetching error")
    }
  }

  const handleUpdate = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("staff", values.staff)
    formData.append("email", values.email)
    formData.append("iqama", values.iqama)
    formData.append("phone", values.phone)
    formData.append("password", values.password)

    if (image) {
      formData.append("image", image)
    }

    try {
      await staffUpdate(editId, formData)
      toggleModal()
      loadData()
      alert("Update successful")
    } catch (err) {
      console.error("Error updating staff:", err)
      alert("Update failed")
    }
  }

  //revok staff

  const handleBlock = async (id, currentStatus) => {
    const confirmation = window.confirm(
      `Are you sure you want to ${
        currentStatus ? "unblock" : "block"
      } this staff?`
    )
    if (confirmation) {
      try {
        const updatedStaff = await toggleBlockStaff(id)
        console.log(updatedStaff)
        setStaff(prevStaff =>
          prevStaff.map(s =>
            s._id === id ? { ...s, isBlocked: !currentStatus } : s
          )
        )
        alert(`Staff ${currentStatus ? "unblocked" : "blocked"} successfully`)
      } catch (err) {
        console.error(
          `Error ${currentStatus ? "unblocking" : "blocking"} staff:`,
          err
        )
        alert(`Failed to ${currentStatus ? "unblock" : "block"} staff`)
      }
    }
  }

  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Housecare staffs</h4>

          <div className="table-responsive">
            <Table className="align-middle table-centered table-vertical table-nowrap">
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <td>Staff</td>
                  <td>Email </td>
                  <td>Phone </td>
                  <td>Iqama No</td>
                  <td style={{ textAlign: "center" }}>Action</td>
                </tr>
              </thead>
              <tbody>
                {staff.map(staffs => (
                  <tr>
                    <td>
                      <img
                        src={`http://localhost:8000/upload/${staffs.image}`}
                        alt={`${staffs.staff}`}
                        className="avatar-xs rounded-circle me-2"
                      />{" "}
                      {staffs.staff}
                    </td>
                    <td>{staffs.email}</td>
                    <td>{staffs.phone}</td>
                    <td>{staffs.iqama}</td>
                    <td style={{ justifyContent: "center", display: "flex" }}>
                      {/* <Card> */}
                      <div size="sm" style={{ paddingInline: "10px" }}>
                        <Link
                          onClick={() => {
                            setModal(!modal)
                          }}
                        >
                          <Button
                            onClick={() => handleEdit(staffs._id)}
                            disabled={!isSuperadmin}
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
                        </Link>
                      </div>

                      <Modal
                        size="lg"
                        isOpen={modal}
                        toggle={() => {
                          setModal(!modal)
                        }}
                      >
                        <ModalHeader
                          toggle={() => {
                            setModal(!modal)
                          }}
                        >
                          Edit Homecare staff Details
                        </ModalHeader>
                        <ModalBody>
                          <form>
                            <Row>
                              <Col lg={4}>
                                <div className="mb-3">
                                  <label htmlFor="staff">Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="staff"
                                    placeholder="Enter Name"
                                    value={values.staff}
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
                                  <label htmlFor="iqama">Iqama No</label>
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="iqama"
                                    value={values.iqama}
                                    onChange={handleChange}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <label htmlFor="phone">Phone Number</label>
                                  <input
                                    className="form-control"
                                    type="number"
                                    name="phone"
                                    value={values.phone}
                                    onChange={handleChange}
                                  />
                                </div>
                              </Col>
                              <Col lg={6}>
                                <div className="mb-3">
                                  <label htmlFor="image">image</label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    rows="3"
                                    accept="image/*"
                                    onChange={handleImage}
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
                      {/* </CardBody> */}
                      {/* </Card> */}

                      <Button
                        color="dark"
                        size="sm"
                        // style={{ marginInline: "10px" }}
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        className="waves-effect waves-light"
                        onClick={() => handleDelete(staffs._id)}
                        disabled={!isSuperadmin}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          color="black"
                          class="bi bi-trash3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                        </svg>
                      </Button>
                      <Button
                        // color="danger"
                        style={{ paddingInline: "10px", width: "75px" }}
                        className="waves-effect waves-light"
                        disabled={!isSuperadmin}
                        onClick={() =>
                          handleBlock(staffs._id, staffs.isBlocked)
                        }
                      >
                        {staffs.isBlocked ? "Unblock" : "Block"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Staff
