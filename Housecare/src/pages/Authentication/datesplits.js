import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Card, CardDeck, CardText } from "reactstrap"

const Datesplits = () => {
  const [splits, setSplits] = useState([])
  const charityName = JSON.parse(localStorage.getItem("charityname"))

  useEffect(() => {
    const fetchSplits = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/splits")
        const filteredSplits = response.data.filter(
          split => split.beneficiary.charity_name === charityName
        )
        setSplits(filteredSplits)
        console.log(filteredSplits, "Filtered Splits")
      } catch (error) {
        console.error("Error fetching splits:", error)
      }
    }

    fetchSplits()
  }, [charityName])

  const showSplit = date => {
    localStorage.setItem("selectedDate", date)
    window.location.href = "/histories"
  }

  const renderedDates = new Set()

  return (
    <div>
      <Card className="container">
        <div
          className="card-body"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <CardDeck style={{ textAlign: "center", marginLeft: "20px" }}>
            SPLIT DETAILS
          </CardDeck>
        </div>
      </Card>
      {splits.map(split => {
        const splitDate = new Date(split.date).toLocaleDateString()
        if (!renderedDates.has(splitDate)) {
          renderedDates.add(splitDate)
          return (
            <Card key={split._id} className="container">
              <div
                className="card-body"
                style={{ display: "flex", alignItems: "center" }}
              >
                <CardText>Date: {splitDate}</CardText>
                <Button
                  style={{ marginLeft: "auto", marginRight: "10px" }}
                  onClick={() => showSplit(splitDate)}
                >
                  Show
                </Button>
                <Button style={{ marginRight: "10px" }}>Export</Button>
              </div>
            </Card>
          )
        }
        return null
      })}
    </div>
  )
}

export default Datesplits
