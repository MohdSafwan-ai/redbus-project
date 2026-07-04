import React from "react";
import { FaBusAlt, FaGlobeAsia } from "react-icons/fa";
import Styles from "./busHireFooter.module.css";

const footerColumns = [
  {
    title: "Book",
    links: ["Bus Ticket", "Bus Hire", "Tempo Travellers", "Car Rentals"],
  },
  {
    title: "About",
    links: ["About us", "Contact us"],
  },
  {
    title: "Info",
    links: ["T & C", "Privacy Policy", "Cookie Policy", "FAQ"],
  },
  {
    title: "Global Sites",
    links: ["India", "Singapore", "Malaysia", "Indonesia", "Peru", "Colombia"],
  },
  {
    title: "Our Partners",
    links: ["Goibibo", "MakeMyTrip"],
  },
];

const BusHireFooter = () => {
  return (
    <footer className={Styles.busHire_Footer}>
      <div className={Styles.footerInner}>
        <div className={Styles.brandBlock}>
          <div className={Styles.brandMark}>
            <FaBusAlt />
            <span>redBus</span>
          </div>
          <p>
            Rent buses and tempo travellers with trusted operators, transparent
            pricing, and comfortable journeys.
          </p>
          <div className={Styles.globalBadge}>
            <FaGlobeAsia />
            Available across major cities
          </div>
        </div>

        <div className={Styles.busHireFooterTextSection}>
          {footerColumns.map((column) => (
            <div key={column.title} className={Styles.busHireFooterEachTextSection}>
              <h3>{column.title}</h3>
              {column.links.map((link) => (
                <button key={link} type="button">
                  {link}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={Styles.copyRightText}>
        Copyright 2026 ibibogroup. All rights reserved.
      </div>
    </footer>
  );
};

export default BusHireFooter;
