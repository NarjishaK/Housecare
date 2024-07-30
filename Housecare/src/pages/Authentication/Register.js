import React, { useState } from "react"

import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-dark.png"

import { Link } from "react-router-dom"
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Label,
  Row,
} from "reactstrap"
import { useForm } from "helpers/useForms"
import { Createstaff } from "./handle-api"

const Register = props => {
  document.title = "Register | Housecare"

  const [values, handleChange] = useForm({
    staff: "",
    email: "",
    password: "",
    iqama:"",
    phone:"",
  })
  const [image, setImage] = useState("")
  const [registrationStatus, setRegistrationStatus] = useState(null)

  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  const handleCreate = async e => {
    e.preventDefault()
    // if (!values.staff || !values.email || !values.password || !values.date || !image) {
    //   setRegistrationStatus("error");
    //   return;
    // }
    let formData = new FormData()
    formData.append("staff", values.staff)
    formData.append("password", values.password)
    formData.append("email", values.email)
    formData.append("iqama", values.iqama)
    formData.append("image", image)
    formData.append("phone", values.phone)
    
    try {
      const response = await Createstaff(formData)
      setRegistrationStatus("success")
      console.log(response.data)
      window.location.href='/login'
    } catch (err) {
      console.log(err)
      setRegistrationStatus("error")
    }
  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <CardBody className="pt-0">
                  <h3 className="text-center mt-5 mb-4">
                    <Link to="/" className="d-block auth-logo">
                      <img
                        src={logoDark}
                        alt=""
                        height="30"
                        className="auth-logo-dark"
                      />
                      <img
                        src={logoLight}
                        alt=""
                        height="30"
                        className="auth-logo-light"
                      />
                    </Link>
                  </h3>
                  <div className="p-3">
                    <h4 className="text-muted font-size-18 mb-1 text-center">
                      {" "}
                      Register
                    </h4>
                    <p className="text-muted text-center">
                      Create Housecare staff account{" "}
                    </p>
                    <Form
                      className="form-horizontal mt-4"
                      onSubmit={handleCreate}
                    >
                      {registrationStatus === "success" && (
                        <Alert color="success">
                          Register staff Successfully
                        </Alert>
                      )}
                      {registrationStatus === "error" && (
                        <Alert color="danger">
                          Registration failed. Please try again.
                        </Alert>
                      )}

                      <div className="mb-3">
                        <Label htmlFor="image">Image</Label>
                        <Input
                          name="image"
                          className="form-control"
                          placeholder="Enter email"
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="useremail">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="username">Name</Label>
                        <Input
                          name="staff"
                          type="text"
                          placeholder="Enter staff name"
                          value={values.staff}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <Label htmlFor="userpassword">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="iqama">Iqama No</Label>
                        <Input
                          name="iqama"
                          type="text"
                          placeholder="Iqama No"
                          value={values.iqama}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          name="phone"
                          type="number"
                          placeholder="Phone Number"
                          value={values.phone}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-12 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                © <script>document.write(new Date().getFullYear())</script>{" "}
                Housecare
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Register
