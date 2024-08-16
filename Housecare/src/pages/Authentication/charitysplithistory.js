import React, { useEffect, useState } from "react"
import axios from "axios"
import styles from "../../pages/charity/split.module.css"
import { Button, Card } from "reactstrap"

const SplitedHistory = () => {
  const [splits, setSplits] = useState([])
  const charityName = JSON.parse(localStorage.getItem("charityname"))
  const selectedDate = localStorage.getItem("selectedDate")

  useEffect(() => {
    const fetchSplits = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/splits")
        const filteredSplits = response.data.filter(
          split =>
            split.beneficiary.charity_name === charityName &&
            new Date(split.date).toLocaleDateString() === selectedDate
        )
        setSplits(filteredSplits)
        console.log(filteredSplits, "Filtered Splits")
      } catch (error) {
        console.error("Error fetching splits:", error)
      }
    }

    fetchSplits()
  }, [charityName, selectedDate])

  return (
    <React.Fragment>
      <br />
      <Card className="container">
        <div
          className="card-body"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <h5 style={{ textAlign: "center", marginLeft: "20px" }}>
            SPLITED DETAILS
          </h5>
          <Button style={{ marginLeft: "auto", marginRight: "20px" }}>
            Upload
          </Button>
        </div>
      </Card>
      <div className={styles.table_container}>
        <table className={styles.tables}>
          <thead className={styles.theads}>
            <tr>
              <th>Date</th>
              <th>Id</th>
              <th>Name</th>
              <th>Number</th>
              <th>Category</th>
              <th>Age</th>
              <th>Amount</th>
              {/* <th>Action</th> */}
            </tr>
          </thead>
          <tbody>
            {splits.map((split, index) => (
              <tr key={index}>
                <td>{new Date(split.date).toLocaleDateString()}</td>
                <td>{split._id}</td>
                <td>{split.beneficiary.benificiary_name}</td>
                <td>{split.beneficiary.number}</td>
                <td>{split.beneficiary.category}</td>
                <td>{split.beneficiary.age}</td>
                <td>{split.splitamount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  )
}

export default SplitedHistory
