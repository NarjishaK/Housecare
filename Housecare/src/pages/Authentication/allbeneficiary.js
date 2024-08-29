import React, { useEffect, useState } from "react";
import {
  Table,
  Card,
  CardBody,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  FormGroup,
  Label,
  Form,
} from "reactstrap";
import axios from "axios";
import moment from 'moment'; // Import moment.js for handling dates

import { fetchBenificiarys ,BASE_URL} from "./handle-api";
// Function to generate a transaction ID that starts with "TR" followed by 6 digits
const generateTransactionId = () => {
  const randomDigits = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit number
  return `TR${randomDigits}`;
};

function Beneficiary() {
  const [benificiarys, setBenificiarys] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBenificiary, setSelectedBenificiary] = useState(null);
  const [spendAmount, setSpendAmount] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [transactionDate, setTransactionDate] = useState(moment().format('YYYY-MM-DD')); // Default to today's date

  useEffect(() => {
    loadData();
  }, []);

  // Fetch charity organization details
  const loadData = async () => {
    try {
      const respond = await fetchBenificiarys();
      setBenificiarys(respond);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleModal = () => setModal(!modal);

  const handlePayNowClick = (benificiary) => {
    console.log('Selected Beneficiary:', benificiary); // Check if id is present
    setSelectedBenificiary(benificiary);
    setTransactionId(generateTransactionId()); // Generate custom transaction ID starting with "TR"
    setSpendAmount(""); // Clear the spend amount field
    setTransactionDate(moment().format('YYYY-MM-DD')); // Default to today's date
    toggleModal(); // Open the modal
  };

  const handleSpendAmountChange = (e) => {
    setSpendAmount(e.target.value);
  };

  const handleTransactionDateChange = (e) => {
    setTransactionDate(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedBenificiary || !selectedBenificiary._id) {
      alert('Invalid beneficiary selected.');
      return;
    }

    try {
      // Update the beneficiary
      await updateBeneficiaryInDatabase(selectedBenificiary._id, {
        debitedAmount: parseFloat(spendAmount),
        debitedDate: new Date(transactionDate),
        Balance: selectedBenificiary.Balance - parseFloat(spendAmount),
      });

      // Save the debited history
      await saveDebitedHistory({
        debitedAmount: parseFloat(spendAmount),
        debitedDate: new Date(transactionDate),
        transactionId,
        beneficiary: selectedBenificiary._id,
      });

      await loadData();
      toggleModal();
    } catch (err) {
      console.error('Error processing transaction:', err);
      alert('Failed to process transaction. Please check the server logs for details.');
    }
  };

  // Function to update beneficiary in the database
  const updateBeneficiaryInDatabase = async (id, data) => {
    try {
      await axios.put(`${BASE_URL}/benificiary/beneficiaries/${id}`, data);
    } catch (err) {
      console.error('Error updating beneficiary:', err);
      throw err;
    }
  };

  // Function to save debited history
  const saveDebitedHistory = async (data) => {
    try {
      await axios.post(`${BASE_URL}/benificiary/debited`, data);
    } catch (err) {
      console.error('Error saving debited history:', err);
      throw err;
    }
  };
  const handleView = (beneficiaryId) => {
    window.location.href=`/beneficiarydetails/${beneficiaryId}`
  }

  return (
    <React.Fragment>
      <div style={{ textAlign: "center" }}>
        <Card>
          <CardBody>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                flexWrap: "nowrap",
                gap: "20px",
                justifyContent: "space-evenly",
              }}
            >
              <h4 className="card-title mb-3">BENEFICIARY</h4>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card>
        <CardBody>
          <div className="table-responsive">
            <Table className="align-middle table-centered table-vertical table-nowrap">
              <thead>
                <tr style={{ fontWeight: "bold" }}>
                  <td>Name</td>
                  <td>Benificiary Id</td>
                  <td>Charity</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Total Amount</td>
                  <td style={{ textAlign: "center" }}>Action</td>
                </tr>
              </thead>
              <tbody>
                {benificiarys.map((benificiary) => (
                  <tr key={benificiary.id}>
                    <td>{benificiary.benificiary_name}</td>
                    <td>{benificiary.benificiary_id}</td>
                    <td>{benificiary.charity_name}</td>
                    <td>{benificiary.email_id}</td>
                    <td>{benificiary.number}</td>
                    <td>{benificiary.Balance}</td>
                    <td style={{ justifyContent: "center", display: "flex" }}>
                      <Button
                        style={{
                          paddingInline: "10px",
                          width: "75px",
                          backgroundColor: "transparent",
                          color: "black",
                          marginRight: "10px",
                        }}
                        className="waves-effect waves-light"
                        onClick={() => handlePayNowClick(benificiary)}
                      >
                        PAY NOW
                      </Button>
                      <Button style={{backgroundColor: "transparent",color: "black",}} onClick={()=>handleView(benificiary._id)}>VIEW</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </CardBody>
      </Card>

      {/* Modal for payment */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>PAY NOW</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="transactionId">Transaction ID</Label>
              <Input
                type="text"
                id="transactionId"
                value={transactionId}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="spendAmount">Debit Amount</Label>
              <Input
                type="number"
                id="spendAmount"
                value={spendAmount}
                onChange={handleSpendAmountChange}
                placeholder="Enter amount"
              />
            </FormGroup>
            <FormGroup>
              <Label for="transactionDate">Transaction Date</Label>
              <Input
                type="date"
                id="transactionDate"
                value={transactionDate}
                onChange={handleTransactionDateChange}
              />
            </FormGroup>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
            <Button color="secondary" onClick={toggleModal} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default Beneficiary;
