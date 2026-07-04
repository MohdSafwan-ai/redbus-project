import React from "react";
import Services from "./Benefits/Services";
import BusTracker from "./BusTracker/BusTracker";
import Coupon from "./CouponSection/Coupon";
import Safety from "./SafetySection/Safety";
import styles from "./LandingPage.module.css";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRoutes } from "../../Redux/routes/action";
import Awards from "./Awards and Recognition/Awards";
import GlobalPresence from "./Global Presence/GlobalPresence";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { makeStyles } from "@material-ui/core/styles";
import RoutesModal from "./RoutesModal";
import { FaCalendarAlt, FaMapMarkerAlt, FaRoute, FaSearch } from "react-icons/fa";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    outline: "none",
    padding: 0,
  },
}));

const LandingPage = () => {
  //modal items
  const classes = useStyles();
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const fallbackRoutes = [
    { source: "Delhi", destination: "Jaipur", buses: 4 },
    { source: "Jaipur", destination: "Delhi", buses: 4 },
    { source: "Mumbai", destination: "Pune", buses: 4 },
    { source: "Pune", destination: "Mumbai", buses: 4 },
    { source: "Bengaluru", destination: "Chennai", buses: 4 },
    { source: "Chennai", destination: "Bengaluru", buses: 4 },
    { source: "Hyderabad", destination: "Bengaluru", buses: 4 },
    { source: "Bengaluru", destination: "Hyderabad", buses: 4 },
    { source: "Kolkata", destination: "Patna", buses: 4 },
    { source: "Patna", destination: "Kolkata", buses: 4 },
    { source: "Ahmedabad", destination: "Surat", buses: 4 },
    { source: "Surat", destination: "Ahmedabad", buses: 4 },
    { source: "Lucknow", destination: "Kanpur", buses: 4 },
    { source: "Kanpur", destination: "Lucknow", buses: 4 },
    { source: "Lucknow", destination: "Faizabad", buses: 4 },
    { source: "Faizabad", destination: "Lucknow", buses: 4 },
    { source: "Chandigarh", destination: "Dehradun", buses: 4 },
    { source: "Dehradun", destination: "Chandigarh", buses: 4 },
    { source: "Indore", destination: "Bhopal", buses: 4 },
    { source: "Bhopal", destination: "Indore", buses: 4 },
    { source: "Nagpur", destination: "Hyderabad", buses: 4 },
    { source: "Goa", destination: "Mumbai", buses: 4 },
    { source: "Delhi", destination: "Agra", buses: 4 },
    { source: "Udaipur", destination: "Jaipur", buses: 4 },
    { source: "Varanasi", destination: "Lucknow", buses: 4 },
    { source: "Lucknow", destination: "Delhi", buses: 4 },
  ];
  const history = useHistory();
  const [departure, setDeparture] = React.useState("");
  const [arrival, setArrival] = React.useState("");
  const [date, setDate] = React.useState("");
  const [searchError, setSearchError] = React.useState("");
  const [filteredSources, setFilteredSources] = React.useState([]);
  const [filteredDestinations, setFilteredDestinations] = React.useState([]);
  const [displayDepartureDropdown, setDisplayDepartureDropdown] =
    React.useState(false);
  const [displayArrivalDropdown, setDisplayArrivalDropdown] =
    React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRoutes());
  }, [dispatch]);

  const routes = useSelector((state) => state.routesReducer.routes);
  const databaseRoutes = React.useMemo(() => {
    if (!Array.isArray(routes)) {
      return [];
    }

    return routes
      .filter(
        (route) =>
          route?.departureLocation?.name && route?.arrivalLocation?.name
      )
      .map((route) => ({
        source: route.departureLocation.name,
        destination: route.arrivalLocation.name,
        buses: 4,
      }));
  }, [routes]);
  const availableRoutes =
    databaseRoutes.length > 0 ? databaseRoutes : fallbackRoutes;

  const getLocationKey = (location) => {
    if (!location) {
      return "";
    }

    if (location.includes("(")) {
      return location.substring(location.indexOf("(") + 1, location.indexOf(")"));
    }

    return location;
  };

  const getDestinationsForDeparture = (departureValue) => {
    const departureKey = getLocationKey(departureValue).toLowerCase();
    return availableRoutes.filter(
      (route) =>
        !departureKey || route.source.toLowerCase().includes(departureKey)
    );
  };

  const getAvailableLocations = () =>
    Array.from(
      new Set(
        availableRoutes.flatMap((route) => [route.source, route.destination])
      )
    );

  const showDestinationsForDeparture = (departureValue) => {
    const destinations = getDestinationsForDeparture(departureValue);
    setFilteredDestinations(destinations);
    setDisplayArrivalDropdown(destinations.length > 0);
  };

  const onDepartureChange = (e) => {
    let value = e.target.value;
    setSearchError("");
    setDeparture(value);
    setArrival("");

    const allLocations = getAvailableLocations();
    const filteredSources = allLocations.filter((source) =>
      source.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredSources.length > 0 && value) {
      setFilteredSources(filteredSources);
      setDisplayDepartureDropdown(true);
    } else {
      setDisplayDepartureDropdown(false);
    }

    if (value) {
      const destinations = getDestinationsForDeparture(value);
      setFilteredDestinations(destinations);
      setDisplayArrivalDropdown(destinations.length > 0);
    } else {
      setFilteredDestinations([]);
      setDisplayArrivalDropdown(false);
    }
  };

  const onArrivalChange = (e) => {
    let value = e.target.value;
    setSearchError("");
    setArrival(value);

    const allDestinations = getDestinationsForDeparture(departure);
    const filteredDestinations = allDestinations.filter((route) =>
      route.destination.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredDestinations.length > 0) {
      setFilteredDestinations(filteredDestinations);
      setDisplayArrivalDropdown(true);
    } else {
      setDisplayArrivalDropdown(false);
    }
  };

  return (
    <div>
      <div className={styles.LandingPage__mainBanner}>
        <div className={styles.LandingPage__form}>
          <div className={styles.LandingPage__form__departure}>
            <div className={styles.LandingPage__form__departure__input}>
              <span className={styles.LandingPage__formIcon}>
                <FaMapMarkerAlt />
              </span>
              <input
                type="text"
                placeholder="From / Your Location"
                value={departure}
                onChange={onDepartureChange}
              />
            </div>
            {displayDepartureDropdown ? (
              <div className={styles.LandingPage__form__departure__dropdown}>
                <ul>
                  {filteredSources.map((source) => (
                    <li
                      onClick={() => {
                        setSearchError("");
                        setDeparture(source);
                        setArrival("");
                        setDisplayDepartureDropdown(false);
                        showDestinationsForDeparture(source);
                      }}
                      key={source}
                    >
                      {source}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className={styles.LandingPage__form__arrival}>
            <div className={styles.LandingPage__form__arrival__input}>
              <span className={styles.LandingPage__formIcon}>
                <FaRoute />
              </span>
              <input
                type="text"
                placeholder="Destination"
                value={arrival}
                onChange={onArrivalChange}
                onFocus={() => showDestinationsForDeparture(departure)}
              />
            </div>
            {displayArrivalDropdown ? (
              <div className={styles.LandingPage__form__arrival__dropdown}>
                <ul>
                  {filteredDestinations.map((destination) => (
                    <li
                      onClick={() => {
                        setSearchError("");
                        setArrival(destination.destination);
                        setDisplayArrivalDropdown(false);
                      }}
                      key={`${destination.source}-${destination.destination}`}
                    >
                      {destination.destination} ({destination.buses}{" "}
                      {destination.buses === 1 ? "bus" : "buses"})
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className={styles.LandingPage__form__date}>
            <span className={styles.LandingPage__formIcon}>
              <FaCalendarAlt />
            </span>
            <input
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => {
                setSearchError("");
                setDate(e.target.value);
              }}
            />
          </div>
          <div className={styles.LandingPage__form__button}>
            <button
              onClick={() => {
                let departureTemp = getLocationKey(departure).trim();
                let arrivalTemp = getLocationKey(arrival).trim();

                if (!departureTemp || !arrivalTemp || !date) {
                  setSearchError(
                    "Please fill From, Destination and Date before searching."
                  );
                  return;
                }

                var result = false;
                result = availableRoutes.some(
                  (route) =>
                    route.source === departureTemp &&
                    route.destination === arrivalTemp
                );
                if (result === false) {
                  setSearchError(
                    "This route is not available yet. Please choose from the suggested routes."
                  );
                  handleOpenModal();
                } else {
                  setSearchError("");
                  history.push(
                    `/select-bus?departure=${departureTemp}&arrival=${arrivalTemp}&date=${date}`
                  );
                }
              }}
            >
              <FaSearch className={styles.LandingPage__searchIcon} />
              Search Bus
            </button>
          </div>
          {searchError ? (
            <div className={styles.LandingPage__formError}>{searchError}</div>
          ) : null}
        </div>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              <div id="transition-modal-description">
                <RoutesModal onClose={handleCloseModal} />
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <Coupon />
      <Safety />
      <BusTracker />
      <Services />
      <Awards />
      {/* <Awards /> */}
      <GlobalPresence />
    </div>
  );
};

export default LandingPage;
