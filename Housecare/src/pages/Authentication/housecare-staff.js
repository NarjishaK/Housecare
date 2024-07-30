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
    phone:"",
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
      "Are you sure you want delete this product?",
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
      `Are you sure you want to ${currentStatus ? "unblock" : "block"} this staff?`,
    )
    if (confirmation) {
      try {
        const updatedStaff = await toggleBlockStaff(id)
        console.log(updatedStaff)
        setStaff(prevStaff =>
          prevStaff.map(s =>
            s._id === id ? { ...s, isBlocked: !currentStatus } : s,
          ),
        )
        alert(`Staff ${currentStatus ? "unblocked" : "blocked"} successfully`)
      } catch (err) {
        console.error(
          `Error ${currentStatus ? "unblocking" : "blocking"} staff:`,
          err,
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
                <tr style={{fontWeight:"bold"}}>
                  <td>Staff</td>
                  <td>Email & Phone</td>
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
                    <td>{staffs.email}<br/>{staffs.phone}</td>
                    <td>{staffs.iqama}</td>
                    <td style={{ justifyContent: "center", display: "flex" }}>
                      {/* <Card> */}
                      <div size="sm" style={{ paddingInline: "10px" }}>
                        <Link
                          onClick={() => {
                            setModal(!modal)
                          }}
                          to="#"
                        >
                          <Button
                            onClick={() => handleEdit(staffs._id)}
                            disabled={!isSuperadmin}
                          >
                            Edit
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
                        style={{ marginInline: "10px" }}
                        className="waves-effect waves-light"
                        onClick={() => handleDelete(staffs._id)}
                        disabled={!isSuperadmin}
                      >
                        Delete
                      </Button>
                      <Button
                        color="danger"
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
