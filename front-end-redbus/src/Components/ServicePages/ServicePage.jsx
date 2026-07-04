import React from "react";
import { Link } from "react-router-dom";
import {
  MdConfirmationNumber,
  MdCancel,
  MdSchedule,
  MdEmail,
  MdAccountBalanceWallet,
  MdDirectionsBus,
  MdVerifiedUser,
} from "react-icons/md";
import styles from "./ServicePage.module.css";

const pageContent = {
  "bus-ticket": {
    icon: MdConfirmationNumber,
    eyebrow: "Manage booking",
    title: "Bus Ticket",
    description:
      "Find your ticket quickly with booking details and keep every trip detail in one clean place.",
    primaryAction: "Search ticket",
    fields: ["Ticket number", "Mobile number", "Travel date"],
    highlights: ["Instant ticket lookup", "Boarding point details", "Passenger summary"],
  },
  cancel: {
    icon: MdCancel,
    eyebrow: "Manage booking",
    title: "Cancel Ticket",
    description:
      "Cancel eligible trips and review refund status with a simple guided flow.",
    primaryAction: "Start cancellation",
    fields: ["Ticket number", "Registered email", "Reason"],
    highlights: ["Refund status", "Cancellation policy", "Secure confirmation"],
  },
  reschedule: {
    icon: MdSchedule,
    eyebrow: "Manage booking",
    title: "Reschedule Trip",
    description:
      "Move your journey to another date or bus when your plan changes.",
    primaryAction: "Check options",
    fields: ["Ticket number", "New date", "Preferred time"],
    highlights: ["Date change", "Seat availability", "Fare difference"],
  },
  "show-ticket": {
    icon: MdDirectionsBus,
    eyebrow: "Manage booking",
    title: "Show My Ticket",
    description:
      "Pull up your booking pass, boarding point, seat numbers, and trip contacts.",
    primaryAction: "Show ticket",
    fields: ["Ticket number", "Mobile number", "Email"],
    highlights: ["Digital boarding pass", "Seat details", "Operator contact"],
  },
  "email-sms": {
    icon: MdEmail,
    eyebrow: "Manage booking",
    title: "Email / SMS Ticket",
    description:
      "Resend your ticket copy to your email or phone before boarding.",
    primaryAction: "Send ticket",
    fields: ["Ticket number", "Email or mobile", "Delivery mode"],
    highlights: ["Email copy", "SMS update", "WhatsApp ready"],
  },
  trips: {
    icon: MdDirectionsBus,
    eyebrow: "Account",
    title: "My Trips",
    description:
      "Review upcoming journeys, completed rides, and hired bus bookings from one dashboard.",
    primaryAction: "Open profile trips",
    fields: ["Upcoming", "Completed", "Hired buses"],
    highlights: ["Trip timeline", "Passenger details", "Download-ready ticket"],
    profileLink: true,
  },
  "wallet-cards": {
    icon: MdVerifiedUser,
    eyebrow: "Account",
    title: "Wallet / Cards",
    description:
      "Keep payment methods ready for faster checkout and smoother refunds.",
    primaryAction: "Manage payment methods",
    fields: ["Saved cards", "UPI", "Refund account"],
    highlights: ["Fast checkout", "Protected payments", "Refund tracking"],
  },
  wallet: {
    icon: MdAccountBalanceWallet,
    eyebrow: "Account",
    title: "Wallet",
    description:
      "Track your travel balance, offers, refunds, and redBus wallet activity.",
    primaryAction: "View wallet",
    fields: ["Balance", "Cashback", "Refunds"],
    highlights: ["Offer balance", "Refund history", "Payment activity"],
  },
};

const ServicePage = ({ type }) => {
  const content = pageContent[type] || pageContent["bus-ticket"];
  const Icon = content.icon;

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <span className={styles.eyebrow}>{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <Link
            to={content.profileLink ? "/my-profile" : "/"}
            className={styles.primaryButton}
          >
            {content.primaryAction}
          </Link>
        </div>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.ticket}>
            <div className={styles.ticketTop}>
              <Icon />
              <span>redBus</span>
            </div>
            <div className={styles.routeLine}>
              <span>DEL</span>
              <div />
              <span>LKO</span>
            </div>
            <div className={styles.busShape}>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.contentGrid}>
        <div className={styles.panel}>
          <h2>Quick Details</h2>
          <div className={styles.fields}>
            {content.fields.map((field) => (
              <label key={field}>
                <span>{field}</span>
                <input placeholder={field} />
              </label>
            ))}
          </div>
          <button className={styles.formButton}>{content.primaryAction}</button>
        </div>

        <div className={styles.panel}>
          <h2>What You Get</h2>
          <div className={styles.highlights}>
            {content.highlights.map((item) => (
              <div key={item} className={styles.highlight}>
                <MdVerifiedUser />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicePage;
