import React, { useState } from "react";
import { Card, Col, Row, Button, Modal, ModalBody } from "reactstrap";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-dark.png";
import { Link } from "react-router-dom";

// Import the login panel components
import HousecareLoginPanel from "./housecarepanel";
import CharityLoginPanel from "./charitypanel";

const Mainpage = () => {
  const [modal, setModal] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState("");

  const toggle = () => setModal(!modal);

  const housecareButtonClick = () => {
    setSelectedPanel("Housecare");
    toggle();
  };

  const charityButtonClick = () => {
    setSelectedPanel("Charity");
    toggle();
  };

  const renderLoginPanel = () => {
    if (selectedPanel === "Housecare") {
      return <HousecareLoginPanel />;
    } else if (selectedPanel === "Charity") {
      return <CharityLoginPanel />;
    }
    return null;
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Row className="text-center">
        <Card>
          <h3 className="text-center mt-5 mb-4">
            <Link to="#" className="d-block auth-logo">
              <img src={logoDark} alt="" height="110" className="auth-logo-dark" />
              <img src={logoLight} alt="" height="30" className="auth-logo-light" />
            </Link>
          </h3>
        </Card>
        <Col xs="12" sm="12" md="6" lg="6">
          <Card body>
            <Button color="transparent" style={{ width: "100%" }} onClick={housecareButtonClick}>
              HOUSECARE
              <br /> ADMIN
            </Button>
          </Card>
        </Col>
        <Col xs="12" sm="12" md="6" lg="6">
          <Card body>
            <Button color="transparent" style={{ width: "100%" }} onClick={charityButtonClick}>
              CHARITY <br />
              ORGANIZATION
            </Button>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          {renderLoginPanel()}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Mainpage;
