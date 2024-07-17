import React, { useEffect, useState } from "react"
// Formik Validation
import * as Yup from "yup"
import { useFormik } from "formik"

import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-dark.png"

// action
import { registerUser, apiError } from "../../store/actions"

//redux
import { useSelector, useDispatch } from "react-redux"
import { createSelector } from "reselect"

import { Link, useNavigate } from "react-router-dom"
import {
  Alert,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap"
import { useForm } from "helpers/useForms"
import axios from "axios"
const Register = props => {
  //meta title
  document.title = "Register | Housecare"

  const [values, handleChange] = useForm({
    staff: "",
    email: "",
    password: "",
  })
  const [image,setImage]=useState("")
  const handleImage = e => {
    const selectedImage = e.target.files[0]
    setImage(selectedImage)
  }

  const handleCreate=async(e)=>{
    e.preventDefault();
     try{
      let formData = new FormData()
      formData.append("staff", values.staff)
      formData.append("password", values.password)
      formData.append("email", values.email)
      formData.append("image", image)
      const response =await axios.post("http://localhost:8000/housecare",formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
      alert("success")
      console.log(response.data);
      window.location.href ='/dashboard'
  }
  catch(err)
  {console.log(err);
  alert("error")

  }
  }


  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: values => {
      dispatch(registerUser(values))
    },
  })

  const selectAccountState = state => state.Account
  const AccountProperties = createSelector(selectAccountState, account => ({
    user: account.user,
    registrationError: account.registrationError,
    success: account.success,
    // loading: account.loading,
  }))

  const {
    user,
    registrationError,
    success,
  } = useSelector(AccountProperties)

  useEffect(() => {
    dispatch(apiError(""))
  }, [dispatch])

  useEffect(() => {
    success && setTimeout(() => navigate("/login"), 2000)
  }, [success, navigate])

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
                      onSubmit={e => {
                        e.preventDefault()
                        validation.handleSubmit()
                        return false
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

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
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
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
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3 row mt-4">
                        <div className="col-12 text-end">
                          <button
                            className="btn btn-primary w-md waves-effect waves-light"
                            type="submit"
                            onClick={handleCreate}
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
                {/* <p>Already have an account ? <Link to="/login" className="text-primary"> Login </Link> </p> */}
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
