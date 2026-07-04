import React from "react";
import { FaBusAlt, FaInfoCircle, FaLightbulb, FaRoute, FaTimes } from "react-icons/fa";
import styles from "./RoutesModal.module.css";

const rows = [
  { source: "Lucknow", destination: "Faizabad", buses: 12 },
  { source: "Allahabad", destination: "Lucknow", buses: 1 },
  { source: "Lucknow", destination: "Allahabad", buses: 1 },
  { source: "Lucknow", destination: "Delhi", buses: 1 },
];

export default function RoutesModal({ onClose }) {
  return (
    <div className={styles.modalCard}>
      <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close">
        <FaTimes />
      </button>

      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <FaRoute />
        </span>
        <div>
          <span className={styles.eyebrow}>Available routes</span>
          <h2>Choose a supported route</h2>
        </div>
      </div>

      <div className={styles.messageGrid}>
        <div className={styles.messageBox}>
          <FaInfoCircle />
          <p>Currently we are serving our customers only in the routes listed below.</p>
        </div>
        <div className={styles.messageBox}>
          <FaLightbulb />
          <p>For best testing, select the route with the maximum number of buses.</p>
        </div>
      </div>

      <div className={styles.routeGrid}>
        {rows.map((row) => (
          <article className={styles.routeCard} key={`${row.source}-${row.destination}`}>
            <div className={styles.routeLine}>
              <span>{row.source}</span>
              <FaRoute />
              <span>{row.destination}</span>
            </div>
            <div className={styles.busCount}>
              <FaBusAlt />
              <strong>{row.buses}</strong>
              <span>{row.buses === 1 ? "bus" : "buses"} available</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
