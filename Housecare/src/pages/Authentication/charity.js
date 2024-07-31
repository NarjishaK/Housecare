import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap"
import {
  fetchCharity,
  handleCharity,
  charityDelete,
  charityEdit,
  charityUpdate,
} from "./handle-api"

import { useForm } from "helpers/useForms"

function Charity() {
  const [modal, setmodal] = useState(false)
  const [charity, setCharity] = useState([])
  const [image, setImage] = useState([])
  const [editId, setEditId] = useState(null)
  const [modal_center, setmodal_center] = useState(false)
  const [values, handleChange, setValues] = useForm({
    charity: "",
    email: "",
    date: "",
    arbic: "",
    CR_NO: "",
    role: "",
    VAT_REG_NO: "",
    authorizedperson: "",
    phone: "",
  })

  function removeBodyCss() {
    document.body.classList.add("no_padding")
  }

  function tog_center() {
    setmodal_center(!modal_center)
    removeBodyCss()
  }
  useEffect(() => {
    loadData()
  }, [])

  //fetch charity organaization deatils
  const loadData = async () => {
    try {
      const response = await fetchCharity()
      setCharity(response)
    } catch (err) {
      console.log(err)
    }
  }

  //handle charity organaization Add

  const charityCreate = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("charity", values.charity)
    formData.append("email", values.email)
    formData.append("date", values.date)
    formData.append("arbic", values.arbic)
    formData.append("CR_NO", values.CR_NO)
    formData.append("role", values.role)
    formData.append("VAT_REG_NO", values.VAT_REG_NO)
    formData.append("phone", values.phone)
    formData.append("authorizedperson", values.authorizedperson)
    formData.append("image", image)
    try {
      await handleCharity(formData)
      alert("success")
      loadData()
    } catch (err) {
      alert("failed")
      console.log(err, "Charity organaization adding failed")
    }
  }

  //Charity organaization Delete
  const handleDelete = async id => {
    try {
      await charityDelete(id)
      loadData()
    } catch (err) {
      console.log(err, "delete failed")
    }
  }

  //handle edit
  const handleEdit = async id => {
    try {
      const charityDetails = await charityEdit(id)
      setEditId(id)
      setValues({
        charity: charityDetails.charity,
        email: charityDetails.email,
        CR_NO: charityDetails.CR_NO,
        role: charityDetails.role,
        date: charityDetails.date,
        VAT_REG_NO: charityDetails.VAT_REG_NO,
        phone: charityDetails.phone,
        arbic: charityDetails.arbic,
        authorizedperson: charityDetails.authorizedperson,
      })
      setmodal_center(true)
    } catch (err) {
      console.log(err, "an error occurred in fetching charity details")
    }
  }

  //handle update charity
  const handleUpdate = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("email", values.email)
    formData.append("date", values.date)
    formData.append("CR_NO", values.CR_NO)
    formData.append("role", values.role)
    formData.append("VAT_REG_NO", values.VAT_REG_NO)
    formData.append("arbic", values.arbic)
    formData.append("phone", values.phone)
    formData.append("authorizedperson", values.authorizedperson)
    formData.append("charity", values.charity)

    if (image) {
      formData.append("image", image)
    }

    try {
      await charityUpdate(editId, formData)
      loadData()
      alert("Update successful")
    } catch (err) {
      console.error("Error updating charity:", err)
      alert("Update failed")
    }
  }
  //image handle
  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }
  //charity details
  const handleView = charity => {
    window.location.href = `charitydetails/${charity}`
  }
  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <Card>
          <CardBody>
            <div>
              <Link
                onClick={() => {
                  setmodal(!modal)
                }}
                to="#"
                className="popup-form btn btn-primary"
              >
                ADD NEW CHARITY ORGANAIZATION
              </Link>
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
                New Charity organaization
              </ModalHeader>
              <ModalBody>
                <form>
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="name">Charity</label>
                        <input
                          type="text"
                          className="form-control"
                          name="charity"
                          value={values.charity}
                          onChange={handleChange}
                          placeholder="Charity Organaization"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="name">اسم الجمعية الخيرية</label>
                        <input
                          type="text"
                          className="form-control"
                          name="arbic"
                          value={values.arbic}
                          onChange={handleChange}
                          placeholder="اسم الجمعية الخيرية"
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
                          value={values.email}
                          onChange={handleChange}
                          placeholder="Enter Email"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="CR_NO">CR_NO</label>
                        <input
                          type="text"
                          className="form-control"
                          name="CR_NO"
                          value={values.CR_NO}
                          onChange={handleChange}
                          placeholder="CR_NO"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="VAT_REG_NO">VAT_REG_NO</label>
                        <input
                          type="text"
                          className="form-control"
                          name="VAT_REG_NO"
                          value={values.VAT_REG_NO}
                          onChange={handleChange}
                          placeholder="VAT_REG_NO"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="Phone">Phone</label>
                        <input
                          type="number"
                          className="form-control"
                          name="phone"
                          value={values.phone}
                          onChange={handleChange}
                          placeholder="Phone No"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="Role">Role</label>
                        <select
                          className="form-control"
                          name="role"
                          value={values.role}
                          onChange={handleChange}
                        >
                          <option>Main_Admin</option>
                          <option>DATA_ENTRY</option>
                          <option>DATA_VERIFY</option>
                        </select>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="Authorizedperson">
                          Authorizedperson
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="authorizedperson"
                          value={values.authorizedperson}
                          onChange={handleChange}
                          placeholder="Authorizedperson"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="date">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          name="date"
                          value={values.date}
                          onChange={handleChange}
                          placeholder="Date"
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
                          onClick={charityCreate}
                        >
                          ADD
                        </button>
                      </div>
                    </Col>
                  </Row>
                </form>
              </ModalBody>
            </Modal>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardBody>
          <h4 className="card-title mb-3">Charity Organaization</h4>
          {charity.map(details => (
            <div className="inbox-wid">
              <Link to="#" className="text-dark">
                <div className="inbox-item">
                  <div className="inbox-item-img float-start me-4">
                    <img
                      src={`http://localhost:8000/upload/${details.image}`}
                      className="avatar-md rounded-circle"
                      alt=""
                    />
                  </div>
                  <div>
                    <h6 className="inbox-item-author mb-1 font-size-16">
                      {details.authorizedperson}
                    </h6>
                    <p className="inbox-item-text text-muted mb-0">
                      {details.arbic}
                      <br />
                      {details.charity}
                    </p>
                  </div>
                  <div className="inbox-item-date text-muted" >
                    <Button style={{marginInline:"10px"}}>Staffs</Button>
                    <Button >Staffs</Button>
                  </div>
                  <br />
                  <Col style={{ display: "flex", justifyContent: "end" }}>
                    <div
                      onClick={() => {
                        tog_center()
                      }}
                    >
                      <Button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        data-toggle="modal"
                        data-target=".bs-example-modal-center"
                        style={{
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => handleEdit(details._id)}
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
                      isOpen={modal_center}
                      toggle={() => {
                        tog_center()
                      }}
                      centered={true}
                    >
                      <div className="modal-header">
                        <h5 className="modal-title mt-0">
                          Edit Charity Organaization{" "}
                        </h5>
                        <button
                          type="button"
                          onClick={() => {
                            setmodal_center(false)
                          }}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="authorizedperson">
                                Authorizedperson
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="authorizedperson"
                                value={values.authorizedperson}
                                onChange={handleChange}
                                placeholder="Authorizedperson"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="Role">Role</label>
                              <select
                                className="form-control"
                                name="role"
                                value={values.role}
                                onChange={handleChange}
                              >
                                <option>Role</option>
                                <option>Main_Admin</option>
                                <option>DATA_ENTRY</option>
                                <option>DATA_VERIFY</option>
                              </select>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="name">Charity</label>
                              <input
                                type="text"
                                className="form-control"
                                name="charity"
                                value={values.charity}
                                onChange={handleChange}
                                placeholder="Charity Organaization"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="name">اسم الجمعية الخيرية</label>
                              <input
                                type="text"
                                className="form-control"
                                name="arbic"
                                value={values.arbic}
                                onChange={handleChange}
                                placeholder="اسم الجمعية الخيرية"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="email">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Enter Email"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="Phone">Phone No</label>
                              <input
                                type="number"
                                className="form-control"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                placeholder="Phone No"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="VAT_REG_NO">VAT_REG_NO</label>
                              <input
                                type="text"
                                className="form-control"
                                name="VAT_REG_NO"
                                value={values.VAT_REG_NO}
                                onChange={handleChange}
                                placeholder="VAT_REG_NO"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="CR_NO">CR_NO</label>
                              <input
                                type="text"
                                className="form-control"
                                name="CR_NO"
                                value={values.CR_NO}
                                onChange={handleChange}
                                placeholder="CR_NO"
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="date">Date</label>
                              <input
                                type="date"
                                className="form-control"
                                name="date"
                                value={values.date}
                                onChange={handleChange}
                                placeholder="Date"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="image">Image</label>
                              <input
                                className="form-control"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Button onClick={handleUpdate}>Update</Button>
                      </div>
                    </Modal>
                    <Button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                      onClick={() => handleView(details.charity)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        color="black"
                        class="bi bi-eye"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                      </svg>
                    </Button>
                    <Button
                      onClick={() => handleDelete(details._id)}
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
                        class="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                      </svg>
                    </Button>
                  </Col>

                  {/* </div> */}
                </div>
              </Link>
            </div>
          ))}
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Charity
