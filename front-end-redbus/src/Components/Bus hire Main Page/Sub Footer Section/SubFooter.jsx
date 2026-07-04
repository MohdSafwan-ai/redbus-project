import React from "react";
import { FaBusAlt, FaMapMarkerAlt, FaShuttleVan } from "react-icons/fa";
import Styles from "./Subfooter.module.css";

const busHireCities = [
  "Ahmedabad",
  "Mumbai",
  "Bangalore",
  "Chennai",
  "Pune",
  "Hyderabad",
  "Delhi",
  "Kolkata",
];

const tempoCities = [
  "Bangalore",
  "Ahmedabad",
  "Coimbatore",
  "Vadodara",
  "Kolkata",
  "Delhi",
  "Pune",
  "Mumbai",
  "Hyderabad",
  "Chennai",
];

const SubFooter = () => {
  return (
    <section className={Styles.subFootercontainer}>
      <div className={Styles.subFooterHeader}>
        <span className={Styles.eyebrow}>Available across cities</span>
        <h2>Bus Hire Cities</h2>
        <p>
          Book buses and tempo travellers with professional drivers across major
          Indian cities.
        </p>
      </div>

      <div className={Styles.cityGrid}>
        <article className={Styles.cityPanel}>
          <div className={Styles.panelTitle}>
            <span>
              <FaBusAlt />
            </span>
            <h3>Bus Hire</h3>
          </div>
          <div className={Styles.cityList}>
            {busHireCities.map((city) => (
              <button key={city} type="button">
                <FaMapMarkerAlt />
                Bus Hire in {city}
              </button>
            ))}
          </div>
        </article>

        <article className={Styles.cityPanel}>
          <div className={Styles.panelTitle}>
            <span>
              <FaShuttleVan />
            </span>
            <h3>Tempo Travellers</h3>
          </div>
          <div className={Styles.cityList}>
            {tempoCities.map((city) => (
              <button key={city} type="button">
                <FaMapMarkerAlt />
                Tempo travellers in {city}
              </button>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
};

export default SubFooter;
