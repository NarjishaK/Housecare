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
import { fetchStaff, deleteStaff, staffEdit,staffUpdate } from "./handle-api"
import { Link } from "react-router-dom"
import { useForm } from "helpers/useForms"

function Staff() {
  const [modal, setModal] = useState(false)
  const [staff, setStaff] = useState([])
  const [values, handleChange, setValues] = useForm({
    staff: "",
    email: "",
    password: "",
    date: "",
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

  const handleEdit = async id => {
    try {
      const staffData = await staffEdit(id)
      setValues({
        staff: staffData.staff,
        email: staffData.email,
        date: staffData.date,
      })
      setImage(staffData.image)
      setEditId(id)
      toggleModal()
    } catch (err) {
      console.log(err, "staff fetching error")
    }
  }


  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("staff", values.staff);
    formData.append("email", values.email);
    formData.append("date", values.date);
    formData.append("password", values.password); 
  
    if (image) {
      formData.append("image", image);
    }
  
    try {
      await staffUpdate(editId, formData);
      toggleModal();
      loadData();
      alert("Update successful");
    } catch (err) {
      console.error("Error updating staff:", err);
      alert("Update failed");
    }
  };
  
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <h4 className="card-title mb-4">Housecare staffs</h4>

          <div className="table-responsive">
            <Table className="align-middle table-centered table-vertical table-nowrap">
              <thead>
                <tr>
                  <td>Staff</td>
                  <td>Email</td>
                  <td>Date</td>
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
                    <td>{staffs.date}</td>
                    <td style={{ justifyContent: "center", display: "flex" }}>
                      {/* <Card> */}
                      <div size="sm" style={{ paddingInline: "10px" }}>
                        <Link
                          onClick={() => {
                            setModal(!modal)
                          }}
                          to="#"
                        >
                          <Button onClick={() => handleEdit(staffs._id)}>
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
                                  <label htmlFor="date">Date</label>
                                  <input
                                    className="form-control"
                                    type="date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                  />
                                </div>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={12}>
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
                        className="waves-effect waves-light"
                        onClick={() => handleDelete(staffs._id)}
                      >
                        Delete
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
