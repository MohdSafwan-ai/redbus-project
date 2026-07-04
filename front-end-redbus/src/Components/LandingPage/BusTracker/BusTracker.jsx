import React from "react";
import styles from "./BusTracker.module.css";
import { FaBusAlt, FaMapMarkedAlt, FaRoute, FaUsers } from "react-icons/fa";

const data = [
  {
    icon: <FaBusAlt />,
    type: "Buses",
    number: "10,000",
    details: "Total buses currently being tracked",
  },
  {
    icon: <FaRoute />,
    type: "Routes",
    number: "60,000",
    details: "Total routes covered by live tracking",
  },
  {
    icon: <FaUsers />,
    type: "Users",
    number: "40,000",
    details: "Total users using Track My Bus feature",
  },
];

const BusTracker = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.upperFlexContainer}>
        <div className={styles.visualBox} aria-hidden="true">
          <div className={styles.mapCard}>
            <FaMapMarkedAlt />
            <span className={styles.routeLine}></span>
            <span className={styles.busMarker}>
              <FaBusAlt />
            </span>
          </div>
        </div>
        <div className={styles.writingBox}>
          <span className={styles.eyebrow}>Live tracking</span>
          <h2>TRACK MY BUS - Smarter Way To Travel</h2>
          <p>
            Track your bus with our Track My Bus feature and know the exact
            location in real-time. Stay informed and keep your family informed.
          </p>
          <button type="button">Know More</button>
        </div>
      </div>

      <div className={styles.flexContainer}>
        {data.map((item) => {
          return (
            <div key={item.type} className={styles.flexItems}>
              <span className={styles.statIcon}>{item.icon}</span>
              <p>{item.type}</p>
              <h1>{item.number}</h1>
              <p>{item.details}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BusTracker;
