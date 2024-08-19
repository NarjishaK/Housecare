import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, Label, Form, Input, Alert, Row, Col } from "reactstrap";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-dark.png";
import { useForm } from "helpers/useForms";
import { handleLogin } from "../Authentication/handle-api";

const HousecareLoginPanel = () => {
  const [values, handleChange] = useForm({ email: "", password: "" });
  const [loginStatus, setLoginStatus] = useState(null);

  return (
    <CardBody className="pt-0">
      <h3 className="text-center mt-5 mb-4">
        <Link to="/" className="d-block auth-logo">
          <img src={logoDark} alt="" height="100" className="auth-logo-dark" />
          <img src={logoLight} alt="" height="30" className="auth-logo-light" />
        </Link>
      </h3>

      <div className="p-3">
        <h4 className="text-muted font-size-18 mb-1 text-center">House Care</h4>
        <Form
          className="form-horizontal mt-4"
          onSubmit={e => handleLogin(e, values, setLoginStatus)}
        >
          {loginStatus === "success" && (
            <Alert color="success">Login successful</Alert>
          )}
          {loginStatus === "error" && (
            <Alert color="danger">Login failed. Please try again.</Alert>
          )}
          <div className="mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              className="form-control"
              placeholder="Enter email"
              type="email"
              value={values.email}
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
          <Row className="mb-3 mt-4">
            <div className="col-6">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="customControlInline"
                />
                <label className="form-check-label" htmlFor="customControlInline">
                  Remember me
                </label>
              </div>
            </div>
            <div className="col-6 text-end">
              <button
                className="btn btn-primary w-md waves-effect waves-light"
                type="submit"
              >
                Log In
              </button>
            </div>
          </Row>
          <Row className="form-group mb-0">
            <Link to="/forgot-password" className="text-muted">
              <i className="mdi mdi-lock"></i> Forgot your password?
            </Link>
          </Row>
        </Form>
      </div>
    </CardBody>
  );
};

export default HousecareLoginPanel;
