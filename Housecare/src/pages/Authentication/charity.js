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
import { fetchCharity } from "./handle-api"

//Import Images
import user1 from "../../assets/images/users/user-1.jpg"

function Charity() {
  const [modal, setmodal] = useState(false)
  const [charity, setCharity] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const response = await fetchCharity()
      setCharity(response)
    } catch (err) {
      console.log(err)
    }
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
                          id="email"
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
                        />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12}>
                      <div className="text-right">
                        <button type="submit" className="btn btn-primary">
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
          {charity.map((details)=>(
          <div className="inbox-wid">
            <Link to="#" className="text-dark">
              <div className="inbox-item">
                <div className="inbox-item-img float-start me-4">
                  <img
                    src={user1}
                    className="avatar-md rounded-circle"
                    alt=""
                  />
                </div>
                <div>
                <h6 className="inbox-item-author mb-1 font-size-16">{details.charity}</h6>
                <p className="inbox-item-text text-muted mb-0">
                  {details._id}<br/>{details.email}
                </p>
                </div>
                <div>
                <p className="inbox-item-date text-muted">{details.date}</p>
                </div><br/>
                <div style={{display:"flex",justifyContent:"end"}}>
                {/* <Button color="dark" style={{marginInline:"10px"}}> Edit </Button> */}
                <Button>Do you want Edit or Delete this Charity organaization?  </Button>
                </div>

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
