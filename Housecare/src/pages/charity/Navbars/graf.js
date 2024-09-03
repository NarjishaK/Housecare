import React, { useState, useEffect } from "react"
import { Row, Col, Card, CardBody } from "reactstrap"
import ReactApexChart from "react-apexcharts"

import { BASE_URL } from "../../Authentication/handle-api"
import { fetchBenificiarys } from "../../Authentication/handle-api"
import axios from "axios"

const MonthlyEarnings = () => {
  const [benificiarys, setBenificiarys] = useState([])
  const [splits, setSplits] = useState([])
  useEffect(() => {
    fetchDatas()
    fetchSplits()
  },[])

  //benificiarys list
  const fetchDatas = async () => {
    try {
      const response = await fetchBenificiarys()
      setBenificiarys(response)
    } catch (error) {
      console.error("Error fetching benificiary details:", error)
    }
  }
  // filter benificiarys based on the selected charity
  const charitydetails = JSON.parse(localStorage.getItem("charitydetails"))
  const filteredBenificiarys = benificiarys.filter(
    benificiary => benificiary.charity_name === charitydetails.charity
  )
  //splits list
//   const charityName = charitydetails?.charity
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  
  const fetchSplits = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/splits`);
      
      // Ensure charitydetails and charityName are valid
      if (!charitydetails || !charitydetails.charity) {
        console.error("Charity details are missing or undefined.");
        return;
      }
      
      const charityName = charitydetails.charity;
  
      // Ensure response data is valid and an array
      if (response && response.data && Array.isArray(response.data)) {
        const filteredSplits = response.data
          .filter(
            split =>
              split.beneficiary && split.beneficiary.charity_name === charityName
          )
          .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date in descending order
    
        setSplits(filteredSplits);
    
        // Calculate and set counts for each status
        setAcceptedCount(filteredSplits.filter(split => split.status === 'Accepted').length);
        setPendingCount(filteredSplits.filter(split => split.status === 'Pending').length);
        setRejectedCount(filteredSplits.filter(split => split.status === 'Rejected').length);
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Error fetching splits:", error);
    }
  };
  
//chart
  const [series, setSeries] = useState([
    {
      name: "APPROVED",
      data: [10, 20, 50, 40, 20, 60, 30],
    },
    {
    name: "PENDING",
      data: [30, 40, 10, 40, 70,10, 20, ],
    },
  ])

  const [options] = useState({
    colors: ["#ccc", "#7a6fbe", "rgb(40, 187, 227)"],
    chart: {
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 0.1,
    },
    grid: {
      borderColor: "#f8f8fa",
      row: {
        colors: ["transparent", "transparent"],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
  })

  return (
    <React.Fragment>
      <Card className="container">
        <CardBody>
          <h4 className="card-title mb-4">Overview</h4>

          <Row className="text-center mt-4">
            <Col xs="3">
              <h5 className="font-size-20">{filteredBenificiarys.length}</h5>
              <p className="text-muted">Beneficiary</p>
            </Col>
            <Col xs="3">
              <h5 className="font-size-20">{acceptedCount}</h5>
              <p className="text-muted">Approved</p>
            </Col>
            <Col xs="3">
              <h5 className="font-size-20">{pendingCount}</h5>
              <p className="text-muted"> Pending</p>
            </Col>
            <Col xs="3">
              <h5 className="font-size-20">{rejectedCount}</h5>
              <p className="text-muted">Rejected</p>
            </Col>
          </Row>

          <div
            id="morris-area-example"
            className="morris-charts morris-charts-height"
            dir="ltr"
          >
            <ReactApexChart
              options={options}
              series={series}
              type="area"
              height="300"
            />
          </div>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}

export default MonthlyEarnings
