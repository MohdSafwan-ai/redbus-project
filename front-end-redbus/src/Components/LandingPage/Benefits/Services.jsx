import React from "react";
import styles from "./Services.module.css";
import { FaGift, FaHeadset, FaShieldAlt, FaTags, FaCheckCircle } from "react-icons/fa";

const data = [
  {
    icon: <FaShieldAlt />,
    title: "SAFETY+",
    desc:
      "With Safety+ we have brought in a set of measures like Sanitized buses, mandatory masks etc. to ensure you travel safely.",
  },
  {
    icon: <FaHeadset />,
    title: "SUPERIOR CUSTOMER SERVICE",
    desc:
      "We put our experience and relationships to good use and are available to solve your travel issues. ",
  },
  {
    icon: <FaTags />,
    title: "LOWEST PRICES",
    desc:
      "We always give you the lowest price with the best partner offers. And be Poceket friendly for your upcoming trips",
  },
  {
    icon: <FaGift />,
    title: "UNMATCHED BENEFITS",
    desc:
      "We take care of your travel beyond ticketing by providing you with innovative and unique benefits.",
  },
];

const Services = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imgBox}>
        <FaCheckCircle />
      </div>
      <h1>We promise to deliver</h1>
      <div className={styles.flexContainer}>
        {data.map((item) => {
          return (
            <div key={item.title} className={styles.flexItems}>
              <div className={styles.itemimg}>
                {item.icon}
              </div>

              <p>{item.title}</p>
              <p className={styles.desc}>{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
