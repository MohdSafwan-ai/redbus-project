import React from "react";
import styles from "./Safety.module.css";
import { FaShieldAlt, FaSprayCan, FaTemperatureHigh, FaUserShield } from "react-icons/fa";

const arr = [
  {
    icon: <FaSprayCan />,
    heading: "Sanitized Bus",
    descriptions:
      "All Safety+ buses are sanitized and disinfected before and after every trip.",
  },
  {
    icon: <FaUserShield />,
    heading: "Mandatory masks",
    descriptions:
      "Proper masks are mandatory for all passengers and bus staff.",
  },
  {
    icon: <FaTemperatureHigh />,
    heading: "Thermal Screening",
    descriptions:
      "All passengers will undergo thermal screening. Temperature checks for bus drivers and service staff are done before every trip.",
  },
];

const Safety = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.writingConatiner}>
        <div className={styles.heroRow}>
          <div className={styles.imgBox} aria-hidden="true">
            <FaShieldAlt />
          </div>
          <div>
            <span className={styles.eyebrow}>Safety+ Travel</span>
            <h2>Introducing Safety+</h2>
            <div className={styles.subTitleRow}>
              <h3>Opt to Travel Safe with redBus</h3>
              <button type="button">Know more</button>
            </div>
          </div>
        </div>
        <p>
          Look for buses with <span className={styles.boldspan}>Safety+</span>{" "}
          tag while booking your journey.
        </p>
        <div className={styles.lowerFlex}>
          {arr.map((item) => {
            return (
              <div key={item.heading} className={styles.lowerFlexItems}>
                <span className={styles.cardIcon}>{item.icon}</span>
                <h3>{item.heading}</h3>
                <p>{item.descriptions}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Safety;
