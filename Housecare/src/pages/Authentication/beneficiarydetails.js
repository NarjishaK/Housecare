import React, { useEffect, useState } from "react"
import { Col, Row, Card, CardBody } from "reactstrap"
import { Link, useParams } from "react-router-dom"

import { connect } from "react-redux"

//Import Action to copy breadcrumb items from local state to redux state
import { setBreadcrumbItems } from "../../store/actions"

//Import Images
import imgdark from "../../assets/images/1.JPG"
import { BASE_URL } from "./handle-api"
import axios from "axios"

const BenificiaryDetails = props => {
  document.title = "Benificiary Details | Housecare"

  //Print the Invoice
  const printInvoice = () => {
    window.print()
  }
  const [beneficiarys, setBeneficiarys] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      axios.defaults.headers.common["Authorization"] = token
      try {
        const response = await axios.get(`${BASE_URL}/benificiary/${id}`)
        setBeneficiarys(response.data)
      } catch (error) {
        console.error("Error fetching beneficiary details:", error)
      }
    }
    fetchData()
  }, [id])

  return (
    <React.Fragment>
      <Row>
        <Col xs="12">
          <Card>
            <CardBody>
              <Row>
                <Col xs="12">
                  <div className="invoice-title">
                    {/* <h4 className="float-end font-size-16">
                      <strong>Id: {beneficiarys._id}</strong>
                    </h4> */}
                    <h3>
                      <img src={imgdark} alt="logo" height="34" />
                    </h3>
                  </div>
                  <hr />
                  <Row>
                    <Col xs="6">
                      <address>
                        <strong>{beneficiarys.benificiary_name}</strong>
                        <br />
                        {beneficiarys.email_id}
                        <br />
                        {beneficiarys.number}
                      </address>
                    </Col>
                    <Col xs="6" className="text-end">
                      <address>
                        <strong>{beneficiarys.charity_name}</strong>
                        <br />
                        Navision No. {beneficiarys.navision_linked_no}
                        <br />
                        {beneficiarys._id}<br/>
                        {beneficiarys.nationality}
                      </address>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="6" className="mt-4">
                      <address>
                        <strong>Personal info</strong>
                        <br/>
                        Age: {beneficiarys.age}
                        <br/>
                        {beneficiarys.category}
                        <br />
                        Physically challenged:{" "}
                        {beneficiarys.physically_challenged}
                        <br />
                        Health status: {beneficiarys.health_status}
                        <br />
                        Merital status : {beneficiarys.marital}
                        <br />
                        Family members : {beneficiarys.family_members}
                      </address>
                    </Col>
                    <Col xs="6" className="mt-4 text-end">
                      <address>
                        <strong>Balance</strong>
                        <br />
                        {beneficiarys.Balance}
                        <br />
                        {beneficiarys.account_status ? (
                          <span style={{ color: "green" }}>Active</span>
                        ) : (
                          <span style={{ color: "red" }}>Inactive</span>
                        )}{" "}
                        <br />
                      </address>
                    </Col>
                  </Row>
                </Col>
              </Row>

              <Row>
                <Col xs="12">
                  <div>
                    <div className="p-2">
                      <h3 className="font-size-16">
                        <strong>Transactions</strong>
                        <div className="float-end">
                          <Link
                            to="#"
                            className="btn btn-dark waves-effect waves-light"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-funnel-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5z" />
                            </svg>
                            Filter
                          </Link>
                        </div>
                      </h3>

                      <hr />
                    </div>

                    <div className="">
                      <div className="table-responsive">
                        <table className="table">
                          <thead>
                            <tr>
                              <td>
                                <strong>Date&Time</strong>
                              </td>
                              <td className="text-center">
                                <strong>Transaction Id</strong>
                              </td>
                              <td className="text-center">
                                <strong>Amount</strong>
                              </td>
                              <td className="text-end">
                                <strong>Status</strong>
                              </td>
                              <td className="text-end">
                                <strong>Balance</strong>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>13/04/2018</td>
                              <td className="text-center">445665435562</td>
                              <td className="text-center">+ 566.00</td>
                              <td className="text-end">success</td>
                              <td className="text-end">566.00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="d-print-none">
                        <div className="float-end">
                          <Link
                            to="#"
                            onClick={printInvoice}
                            className="btn btn-success waves-effect waves-light me-2"
                          >
                            <i className="fa fa-print"></i>
                          </Link>{" "}
                          <Link
                            to="#"
                            className="btn btn-primary waves-effect waves-light"
                          >
                            Send
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      {/* ))} */}
    </React.Fragment>
  )
}

export default connect(null, { setBreadcrumbItems })(BenificiaryDetails)
