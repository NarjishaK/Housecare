import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"

//Import Images
import user1 from "../../assets/images/users/user-1.jpg"

function Charity() {
  const [modal, setmodal] = useState(false)
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
                          id="name"
                          placeholder="Enter Name"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter Email"
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          placeholder="Enter Password"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="mb-3">
                        <label htmlFor="subject">Subject</label>
                        <textarea
                          className="form-control"
                          id="subject"
                          rows="3"
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="text-right">
                        <button type="submit" className="btn btn-primary">
                          Submit
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
          <div className="inbox-wid">
            <Link to="#" className="text-dark">
              <div className="inbox-item">
                <div className="inbox-item-img float-start me-3">
                  <img
                    src={user1}
                    className="avatar-sm rounded-circle"
                    alt=""
                  />
                </div>
                <h6 className="inbox-item-author mb-1 font-size-16">Name</h6>
                <p className="inbox-item-text text-muted mb-0">
                  515121544541541541
                </p>
                <p className="inbox-item-date text-muted">100</p>
              </div>
            </Link>
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default Charity
