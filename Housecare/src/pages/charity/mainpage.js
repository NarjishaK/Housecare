import React from "react";
import { Card, Col, Row, Button } from "reactstrap";
import logoDark from "../../assets/images/logo-dark.png"
import logoLight from "../../assets/images/logo-dark.png"
import { Link } from "react-router-dom"

const Mainpage = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Row className="text-center">
                <Card>
            <h3 className="text-center mt-5 mb-4">
                    <Link to="/admin" className="d-block auth-logo">
                      <img
                        src={logoDark}
                        alt=""
                        height="60"
                        className="auth-logo-dark"
                      />
                      <img
                        src={logoLight}
                        alt=""
                        height="60"
                        className="auth-logo-light"
                      />
                    </Link>
                  </h3>
                  </Card>
                <Col xs="12" sm="12" md="6" lg="6">
                    <Card body>
                        <Button color="transparent" style={{ width: "100%" }} href="/login">HOUSECARE<br/> ADMIN</Button>
                    </Card>
                </Col>
                <Col xs="12" sm="12" md="6" lg="6">
                    <Card body>
                        <Button color="transparent" style={{ width: "100%" }} href="chaarity">CHARITY <br/>ORGANAIZATION</Button>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default Mainpage;
