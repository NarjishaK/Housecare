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
        date: charityDetails.date,
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
                      {details.charity}
                    </h6>
                    <p className="inbox-item-text text-muted mb-0">
                      {details._id}
                      <br />
                      {details.email}
                    </p>
                  </div>
                  <div>
                    <p className="inbox-item-date text-muted">{details.date}</p>
                  </div>
                  <br />
                  {/* <div > */}
                  {/* <Button  >Edit </Button> */}
                  <Col style={{ display: "flex", justifyContent: "end" }}>
                    <div
                      className="text-center"
                      onClick={() => {
                        tog_center()
                      }}
                    >
                      <Button
                        type="button"
                        className="btn btn-primary waves-effect waves-light"
                        data-toggle="modal"
                        data-target=".bs-example-modal-center"
                        style={{ marginInline: "10px" }}
                        onClick={() => handleEdit(details._id)}
                      >
                        Edit
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
                    <Button onClick={() => handleDelete(details._id)}>
                      Delete{" "}
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
