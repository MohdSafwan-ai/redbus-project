import React from "react";
import Styles from "./Awards.module.css";

const awards = [
  {
    image: "https://s2.rdbuz.com/web/images/home/awards/Business_Standard1.png",
    title: "Most Innovative Company",
    alt: "Business Standard award",
  },
  {
    image: "https://s1.rdbuz.com/web/images/home/awards/Brand_Trust_Report.png",
    title: "Most Trusted Brand",
    alt: "Brand Trust Report award",
  },
  {
    image: "https://s3.rdbuz.com/web/images/home/awards/Eye_for_Travel1.png",
    title: "Mobile Innovation Award",
    alt: "Eye for Travel award",
  },
];

const Awards = () => {
  return (
    <section className={Styles.awardsSection}>
      <div className={Styles.awardsContainer}>
        <span className={Styles.eyebrow}>Recognition</span>
        <h2 className={Styles.awardHeading}>AWARDS AND RECOGNITION</h2>
        <div className={Styles.awardsGrid}>
          {awards.map((award) => (
            <article key={award.title} className={Styles.awardCard}>
              <div className={Styles.awardImage}>
                <img src={award.image} alt={award.alt} />
              </div>
              <p className={Styles.awardsPara}>{award.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
