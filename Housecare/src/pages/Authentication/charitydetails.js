import React, { useEffect, useState } from "react"
import { Table, Card, Button, Row, CardBody, Col, CardTitle } from "reactstrap"

//Import Images
import user1 from "../../assets/images/users/user-1.jpg"
import axios from "axios"
import { useParams } from "react-router-dom"

function CharityDetails() {
  const { id } = useParams() 
  const [charitys, setCharitys] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = token;
      try {
        const response = await axios.get(`http://localhost:8000/charity/details/${id}`)
        setCharitys(response.data)
      } catch (error) {
        console.error("Error fetching charity details:", error)
      }
    }
    fetchData()
  }, [id])
  return (
    <React.Fragment>
      <Card>
        <div className="card-body" >
          <p className="card-title " style={{ color: "gray" }}>
            {" "}
            {charitys.charity}  {charitys.arbic}
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
                CHARITY ORG. STAFFS
              </CardTitle>

              <div className="table-responsive">
                <Table className="table mb-0">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No.</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="table-light">
                      <td>
                        <img
                          src={user1}
                          alt="user"
                          className="avatar-xs me-2 rounded-circle"
                        />{" "}
                        Nibras
                      </td>
                      <td>nibras@gmail.com</td>
                      <td>4426853269</td>
                      <td>DATA_ENTRY</td>
                      <td>
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
                            class="bi bi-eye"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                          </svg>
                        </Button>
                      </td>
                    </tr>
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
