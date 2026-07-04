import React from "react";
import { FaBusAlt, FaTicketAlt, FaUsers } from "react-icons/fa";
import Styles from "./GlobalPresence.module.css";

const countries = [
  { name: "Colombia", flag: "colombia" },
  { name: "India", flag: "india" },
  { name: "Indonesia", flag: "indonesia" },
  { name: "Malaysia", flag: "malaysia" },
  { name: "Peru", flag: "peru" },
  { name: "Singapore", flag: "singapore" },
];

const stats = [
  {
    icon: <FaUsers />,
    label: "Customers",
    value: "23M",
    detail: "redBus is trusted by over 23 million happy customers globally",
  },
  {
    icon: <FaBusAlt />,
    label: "Operators",
    value: "2,600",
    detail: "Network of over 2600 bus operators worldwide",
  },
  {
    icon: <FaTicketAlt />,
    label: "Bus Tickets",
    value: "180M+",
    detail: "Over 180 million trips booked using redBus",
  },
];

const GlobalPresence = () => {
  return (
    <section className={Styles.globalSection}>
      <div className={Styles.globalPresenceContainer}>
        <span className={Styles.eyebrow}>Worldwide network</span>
        <h2 className={Styles.globalPresenceHeading}>OUR GLOBAL PRESENCE</h2>
        <div className={Styles.countryGrid}>
          {countries.map((country) => (
            <article key={country.name} className={Styles.countryCard}>
              <div
                className={`${Styles.flag} ${Styles[country.flag]}`}
                aria-label={`${country.name} flag`}
              />
              <div className={Styles.countryName}>{country.name}</div>
            </article>
          ))}
        </div>
      </div>

      <div className={Styles.globalPresenceContainer}>
        <span className={Styles.eyebrow}>Scale</span>
        <h2 className={Styles.globalPresenceHeading}>THE NUMBERS ARE GROWING</h2>
        <div className={Styles.statsGrid}>
          {stats.map((stat) => (
            <article key={stat.label} className={Styles.statCard}>
              <span className={Styles.statIcon}>{stat.icon}</span>
              <div className={Styles.countryName}>{stat.label}</div>
              <div className={Styles.numbers}>{stat.value}</div>
              <p className={Styles.para}>{stat.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GlobalPresence;
