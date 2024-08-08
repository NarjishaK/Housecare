import React, { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { Button, Card, Input } from "reactstrap";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { fetchBenificiarys } from "pages/Authentication/handle-api";

const App = () => {
  // States
  const [benificiarys, setBenificiarys] = useState([]);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [amount, setAmount] = useState("");
  const [limitedAmount, setLimitedAmount] = useState(
    JSON.parse(localStorage.getItem("limitedamount")) || 0
  );
  const [isEditingLimitedAmount, setIsEditingLimitedAmount] = useState(false);
  const [newLimitedAmount, setNewLimitedAmount] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [confirmAction, setConfirmAction] = useState(null);

  // Fetch data
  const fetchDatas = async () => {
    try {
      const response = await fetchBenificiarys();
      setBenificiarys(response);
    } catch (error) {
      console.error("Error fetching benificiary details:", error);
    }
  };

  useEffect(() => {
    fetchDatas();
    const charitydetails = JSON.parse(localStorage.getItem("charitydetails"));
    if (charitydetails) {
      const filteredBenificiarys = benificiarys.filter(
        benificiary => benificiary.charity_name === charitydetails.charity
      );

      const savedData = JSON.parse(localStorage.getItem("data")) || [];
      const initialData = filteredBenificiarys.map(benificiary => ({
        Name: benificiary.benificiary_name,
        id: benificiary._id,
        Nav_Number: benificiary.navision_linked_no,
        Number: benificiary.number,
        category: benificiary.physically_challenged,
        age: 56,
        amount:
          savedData.find(item => item.id === benificiary._id)?.amount || 0, 
      }));

      setData(initialData);
    }
  }, [benificiarys]);

  // Handle edit and save actions
  const handleEditClick = index => {
    setEditIndex(index);
    setAmount(data[index].amount);
  };

  const handleAmountChange = event => {
    setAmount(event.target.value);
  };

  const handleSaveClick = () => {
    const updatedData = [...data];
    updatedData[editIndex].amount = amount;
    setData(updatedData);
    localStorage.setItem("data", JSON.stringify(updatedData));
    setEditIndex(null);
    setAmount("");
  };

  const handleCancelClick = () => {
    setEditIndex(null);
    setAmount("");
  };

  // Handle limited amount edit
  const handleLimitedAmountEdit = () => {
    setIsEditingLimitedAmount(true);
    setNewLimitedAmount(limitedAmount);
  };

  const handleLimitedAmountChange = event => {
    setNewLimitedAmount(event.target.value);
  };

  const handleLimitedAmountSave = () => {
    const updatedLimitedAmount = parseFloat(newLimitedAmount);
    setLimitedAmount(updatedLimitedAmount);
    localStorage.setItem("limitedamount", updatedLimitedAmount);
    setIsEditingLimitedAmount(false);
  };

  const handleLimitedAmountCancel = () => {
    setIsEditingLimitedAmount(false);
  };

  // Handle clear and send actions
  const handleClear = () => {
    setAlertMessage("Are you sure you want to clear all amounts?");
    setConfirmAction(() => () => {
      const clearedData = data.map(item => ({
        ...item,
        amount: 0,
      }));
      setData(clearedData);
      localStorage.setItem("data", JSON.stringify(clearedData));
      setShowAlert(false);
    });
    setShowAlert(true);
  };

  const handleSend = () => {
    if (totalAmount > limitedAmount) {
      setAlertMessage(`The total amount exceeds the limited amount of ${balanceAmount}. Do you want to continue with the split?`);
      setConfirmAction(() => downloadPage);
      setShowAlert(true);
    } else {
      downloadPage();
    }
  };

  const totalAmount = data.reduce((total, item) => total + parseFloat(item.amount || 0), 0).toFixed(2);
  const balanceAmount = (limitedAmount - totalAmount).toFixed(2);

  const downloadPage = () => {
    html2canvas(document.body).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('page.pdf');
    });
  };

  return (
    <>
      {/* <Navbars /> */}
      <br />
      <div className={styles.App}>
        <Card className="container">
          <Card>
            <div
              className="card-body"
              style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              {isEditingLimitedAmount ? (
                <>
                  <Input
                    type="number"
                    value={newLimitedAmount}
                    onChange={handleLimitedAmountChange}
                    style={{ marginRight: "10px", width: "100px" }}
                  />
                  <Button
                    onClick={handleLimitedAmountSave}
                    style={{ marginRight: "10px" }}
                  >
                    Save
                  </Button>
                  <Button onClick={handleLimitedAmountCancel}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button
                    style={{
                      marginRight: "10px",
                      backgroundColor: "transparent",
                      color: "black",
                    }}
                  >
                    {limitedAmount}
                  </Button>
                  <Button
                    onClick={handleLimitedAmountEdit}
                    style={{ backgroundColor: "transparent" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      color="black"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </Button>
                </>
              )}
              <div style={{ flexGrow: 1, textAlign: "center" }}>
                <h4 style={{ margin: 0 }}>PAY NOW</h4>
              </div>
            </div>
          </Card>

          <table className={styles.tables}>
            <thead>
              <tr>
                <th>Name</th>
                <th>id</th>
                <th>Nav_Number</th>
                <th>Number</th>
                <th>category</th>
                <th>age</th>
                <th>amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={row.id}>
                  <td>{row.Name}</td>
                  <td>{row.id}</td>
                  <td>{row.Nav_Number}</td>
                  <td>{row.Number}</td>
                  <td>{row.category}</td>
                  <td>{row.age}</td>
                  <td>
                    {editIndex === index ? (
                      <input
                        type="number"
                        value={amount}
                        onChange={handleAmountChange}
                        style={{ width: "100px" }}
                      />
                    ) : (
                      row.amount
                    )}
                  </td>
                  <td>
                    {editIndex === index ? (
                      <>
                        <button
                          onClick={handleSaveClick}
                          className={styles.btn}
                          style={{ marginInline: "10px" }}
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelClick}
                          className={styles.btn}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleEditClick(index)}
                        className={styles.btn}
                        style={{ backgroundColor: "transparent" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          color="black"
                          className="bi bi-pencil"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                        </svg>
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              <br />
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <th>Total Amount</th>
                <th style={{ textAlign: "end" }}>{totalAmount}</th>
              </tr>
            </tbody>
          </table>

          <Card>
            <div
              className="card-body"
              style={{ display: "flex", justifyContent: "end", flexWrap: "wrap" }}
            >
              <Button onClick={handleSend} style={{ marginRight: "10px" }}>Download</Button>
              <Button onClick={handleClear}>Clear</Button>
            </div>
          </Card>
        </Card>
      </div>

      {showAlert && (
        <div className={styles.alert_container}>
          <p>{alertMessage}</p>
          <Button
            onClick={() => {
              if (confirmAction) confirmAction();
              setShowAlert(false);
            }}
            style={{ marginRight: "10px" }}
          >
            Confirm
          </Button>
          <Button onClick={() => setShowAlert(false)}>Cancel</Button>
        </div>
      )}
    </>
  );
};

export default App;