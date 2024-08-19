import React, { useEffect, useState } from "react";
import { Row, Col, Card, Input, Container } from "reactstrap";
import Navbar from "./Navbars";
import { Editor } from "react-draft-wysiwyg";
import { fetchEmail } from "pages/Authentication/handle-api";

const EmailCompose = () => {
  document.title = "Email Compose | Housecare";
  const [emails, setEmails] = useState([]);
  const [ccInputs, setCcInputs] = useState([{ id: 1, value: "" }]);

  useEffect(() => {
    fetchEmail()
      .then((res) => {
        setEmails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addCcInput = () => {
    setCcInputs([...ccInputs, { id: Date.now(), value: "" }]);
  };

  const removeCcInput = (id) => {
    setCcInputs(ccInputs.filter((input) => input.id !== id));
  };

  const handleCcChange = (id, value) => {
    setCcInputs(
      ccInputs.map((input) => (input.id === id ? { ...input, value } : input))
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container className="container">
        <Row>
          <Col>
            <div>
              <Card>
                <div className="card-body">
                  <div>
                    <div className="mb-3">
                        <label>To </label>
                      <Input
                        type="email"
                        className="form-control"
                        placeholder="To"
                        value="narjishakuniyil@gmail.com"
                      />
                    </div>
                    <div className="mb-3">
                      {ccInputs.map((ccInput, index) => (
                        <div
                          key={ccInput.id}
                          style={{ display: "flex", alignItems: "center" }}
                          className="mb-2"
                        >
                          <Input
                            type="email"
                            className="form-control"
                            placeholder="CC"
                            value={ccInput.value}
                            onChange={(e) =>
                              handleCcChange(ccInput.id, e.target.value)
                            }
                          />
                          <button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                              marginLeft: "10px",
                            }}
                            onClick={addCcInput}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              color="black"
                              className="bi bi-plus-circle-dotted"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z"/>
                            </svg>
                          </button>
                          {index > 0 && (
                            <button
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                                marginLeft: "10px",
                              }}
                              onClick={() => removeCcInput(ccInput.id)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="red"
                                className="bi bi-x-circle"
                                viewBox="0 0 16 16"
                              >
                                <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm3.97 4.03a.75.75 0 0 1 0 1.06L9.06 8l2.91 2.91a.75.75 0 1 1-1.06 1.06L8 9.06l-2.91 2.91a.75.75 0 0 1-1.06-1.06L6.94 8 4.03 5.09a.75.75 0 0 1 1.06-1.06L8 6.94l2.91-2.91a.75.75 0 0 1 1.06 0Z" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="mb-3">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Subject"
                      />
                    </div>
                    <div className="mb-3">
                      <form method="post">
                        <Editor
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      </form>
                    </div>

                    <div className="btn-toolbar form-group mb-0">
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-success waves-effect waves-light me-1"
                        >
                          <i className="far fa-save"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-success waves-effect waves-light me-1"
                        >
                          <i className="far fa-trash-alt"></i>
                        </button>
                        <button className="btn btn-primary waves-effect waves-light">
                          <span>Send</span>{" "}
                          <i className="fab fa-telegram-plane ms-2"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default EmailCompose;
