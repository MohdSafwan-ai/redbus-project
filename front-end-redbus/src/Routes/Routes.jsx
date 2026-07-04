import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import SelectBus from "../Components/SelectBus/SelectBus";
import Error from "../Components/Error/Error";
import Profile from "../Components/Profile Page/Profile";
import Payment from "../Components/Payment Page/Payment";
import BusBookingForm from "../Components/Bus Booking Form/BusBookingForm";
import LandingPage from "../Components/LandingPage/LandingPage";
import BusHire from "../Components/Bus hire Main Page/BusHire";
import BusServiceCardPage from "../Components/BusServiceSection/BusServiceCard/BusServiceCardPage";
import BusServiceDetailsPage from "../Components/BusServiceSection/BusServiceDetails/BusServiceDetailsPage";
import BusServicePaymentPage from "../Components/BusServiceSection/BusServicePayment/BusServivePaymentPage";
import ServicePage from "../Components/ServicePages/ServicePage";
const Routes = () => {
  const location = useLocation();

  return (
    <main className="page-transition-shell" key={location.pathname}>
      <Switch location={location}>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/select-bus" exact>
          <SelectBus />
        </Route>
        <Route path="/my-profile" exact>
          <Profile />
        </Route>
        <Route path="/payment-page" exact>
          <Payment />
        </Route>
        <Route path="/booking-form" exact>
          <BusBookingForm />
        </Route>
        <Route path="/bus-hire" exact>
          <BusHire />
        </Route>
        <Route path="/bus-hire-card" exact>
          <BusServiceCardPage />
        </Route>
        <Route path="/bus-hire-details/:id" exact>
          <BusServiceDetailsPage />
        </Route>
        <Route path="/payments-hire" exact>
          <BusServicePaymentPage />
        </Route>
        <Route path="/manage-booking/bus-ticket" exact>
          <ServicePage type="bus-ticket" />
        </Route>
        <Route path="/manage-booking/cancel" exact>
          <ServicePage type="cancel" />
        </Route>
        <Route path="/manage-booking/reschedule" exact>
          <ServicePage type="reschedule" />
        </Route>
        <Route path="/manage-booking/show-ticket" exact>
          <ServicePage type="show-ticket" />
        </Route>
        <Route path="/manage-booking/email-sms" exact>
          <ServicePage type="email-sms" />
        </Route>
        <Route path="/my-trips" exact>
          <ServicePage type="trips" />
        </Route>
        <Route path="/wallet-cards" exact>
          <ServicePage type="wallet-cards" />
        </Route>
        <Route path="/wallet" exact>
          <ServicePage type="wallet" />
        </Route>
        <Route>
          <Error></Error>
        </Route>
      </Switch>
    </main>
  );
};

export default Routes;
