import React , {useEffect, useState} from "react"
import {
  Row,
  Col,
} from "reactstrap"

// Pages Components
import Miniwidget from "./Miniwidget"
import MonthlyEarnings from "./montly-earnings";
import EmailSent from "./email-sent";
import MonthlyEarnings2 from "./montly-earnings2";
import Inbox from "./inbox";
import RecentActivity from "./recent-activity";
import WidgetUser from "./widget-user";
import YearlySales from "./yearly-sales";
import LatestTransactions from "./latest-transactions";
import LatestOrders from "./latest-orders";

//Import Action to copy breadcrumb items from local state to redux state
import { fetchBenificiarys, fetchCharity } from "pages/Authentication/handle-api";
import axios from "axios";

const Dashboard = () => {

  document.title = "Dashboard |Housecare - Charity management";


const [charitys,setCharitys] =useState([])
const [benificiarys,setBenificiarys] =useState([])
const [pendingApprovals, setPendingApprovals] = useState(0);
 

  useEffect(() => {
    loadData()
    fetchPendingApprovals();
  }, [])

  //fetch charity organaization deatils
  const loadData = async () => {
    try {
      const response = await fetchCharity()
      setCharitys(response)
      const respond = await fetchBenificiarys()
      setBenificiarys(respond)
    } catch (err) {
      console.log(err)
    }
  }

 
  const fetchPendingApprovals = async () => {
    try {
      const response = await axios.get("http://localhost:8000/pending-approvals");
      setPendingApprovals(response.data.count);
    } catch (error) {
      console.error("Error fetching pending approvals:", error);
    }
  };
  
  const reports = [
    { title: "Charity Organizations", iconClass: "cube-outline", total: `${charitys.length}`, average: "+11%", badgecolor: "info" },
    { title: "Total Beneficiaries", iconClass: "buffer", total: `${benificiarys.length}`, average: "-29%", badgecolor: "danger" },
    { title: "Total  Approvals", iconClass: "tag-text-outline", total: "11", average: "0%", badgecolor: "warning" },
    { title: "Pending Approvals", iconClass: "briefcase-check", total: `${pendingApprovals}`, average: "+89%", badgecolor: "info" },
  ]

  return (
    <React.Fragment>

      {/*mimi widgets */}
      <Miniwidget reports={reports} />

      <Row>
        <Col xl="3">
          {/* Monthly Earnings */}
          {/* <MonthlyEarnings /> */}
        </Col>

        <Col xl="6">
          {/* Email sent */}
          {/* <EmailSent /> */}
        </Col>

        <Col xl="3">
          {/* <MonthlyEarnings2 /> */}
        </Col>

      </Row>
      <Row>

        <Col xl="4" lg="6">
          {/* inbox */}
          {/* <Inbox /> */}
        </Col>
        <Col xl="4" lg="6">
          {/* recent activity */}
          {/* <RecentActivity /> */}

        </Col>
        <Col xl="4">
          {/* widget user */}
          {/* <WidgetUser /> */}

          {/* yearly sales */}
          {/* <YearlySales /> */}
        </Col>
      </Row>

      <Row>
        <Col xl="6">
          {/* latest transactions */}
          {/* <LatestTransactions /> */}
        </Col>

        <Col xl="6">
          {/* latest orders */}
          {/* <LatestOrders /> */}
        </Col>
      </Row>

    </React.Fragment>
  )
}

export default Dashboard;