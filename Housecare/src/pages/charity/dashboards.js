import React, { useEffect, useState } from "react"
import styles from "./dashboard.module.css"
import Navbar from "./Navbars"
import { fetchBenificiarys } from "pages/Authentication/handle-api"

const Dashboards = () => {
  //benificiarys list
  const [benificiarys, setBenificiarys] = useState([])
  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await fetchBenificiarys()
        setBenificiarys(response)
      } catch (error) {
        console.error("Error fetching benificiary details:", error)
      }
    }
    fetchDatas()
  }, [benificiarys])
  const charitydetails = JSON.parse(localStorage.getItem("charitydetails"))

  // filter benificiarys based on the selected charity
  const filteredBenificiarys = benificiarys.filter(
    benificiary => benificiary.charity_name === charitydetails.charity
  )

  return (
    <>
      <Navbar />
      <div className={styles.dashboards}>
        <div className={styles.cards}>
          <div className={styles.cardtitle}>Fund Size</div>
          <div className={styles.cardvalue}> $ 1,587</div>
          <div className={styles.cardsubtext}>+11% From previous period</div>
        </div>
        <div className={styles.cards}>
          <div className={styles.cardtitle}>Invested</div>
          <div className={styles.cardvalue}>$46,782</div>
          <div className={styles.cardsubtext}>-29% From previous period</div>
        </div>
        <div className={styles.cards}>
          <div className={styles.cardtitle}>Total Beneficiaries</div>
          <div className={styles.cardvalue}>{filteredBenificiarys.length}</div>
          <div className={styles.cardsubtext}>0% From previous period</div>
        </div>
        <div className={styles.cards}>
          <div className={styles.cardtitle}>Pending Approvals</div>
          <div className={styles.cardvalue}>10</div>
          <div className={styles.cardsubtext}>+1% From previous period</div>
        </div>
      </div>
    </>
  )
}

export default Dashboards
