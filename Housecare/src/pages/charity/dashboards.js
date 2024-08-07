import React from "react";
import styles from "./dashboard.module.css"
import Navbar from "./Navbars"


const Dashboards = () => {
  return (
    <>
    <Navbar/>
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
        <div className={styles.cardvalue}>15</div>
        <div className={styles.cardsubtext}>0% From previous period</div>
      </div>
      <div className={styles.cards}>
        <div className={styles.cardtitle}>Pending Approvals</div>
        <div className={styles.cardvalue}>10</div>
        <div className={styles.cardsubtext}>+1% From previous period</div>
      </div>
    </div>
    </>
  );
}

export default Dashboards;
