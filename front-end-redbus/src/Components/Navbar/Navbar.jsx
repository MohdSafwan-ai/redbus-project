import React from "react";
import styles from "./Navbar.module.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginSuccess,
  loginFailure,
  logout,
  addCustomerMongo,
} from "../../Redux/auth/actions";
import { useHistory } from "react-router-dom";
const Navbar = () => {
  const navRef = React.useRef(null);
  const googleButtonRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [googleError, setGoogleError] = React.useState("");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const currentCustomer = useSelector(
    (state) => state.authReducer.currentCustomer
  );
  console.log("Here: ", isLoggedIn, currentCustomer);
  const history = useHistory();
  const closeMenus = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideNavbar =
        navRef.current && navRef.current.contains(event.target);
      const clickedInsideMenu = event.target.closest(".MuiPopover-root");

      if (!clickedInsideNavbar && !clickedInsideMenu) {
        closeMenus();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const decodeGoogleCredential = (credential) => {
    const base64Url = credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((char) => `%${`00${char.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    const profile = JSON.parse(jsonPayload);

    return {
      googleId: profile.sub,
      name: profile.name,
      email: profile.email,
      imageUrl: profile.picture,
    };
  };

  React.useEffect(() => {
    if (isLoggedIn || !anchorEl2 || !googleButtonRef.current) {
      return;
    }

    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    if (!clientId) {
      setGoogleError("Google client ID is missing in .env");
      return;
    }

    let timeoutId;
    const renderGoogleButton = () => {
      if (!window.google?.accounts?.id || !googleButtonRef.current) {
        timeoutId = window.setTimeout(renderGoogleButton, 250);
        return;
      }

      setGoogleError("");
      googleButtonRef.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          try {
            const profileObj = decodeGoogleCredential(response.credential);
            dispatch(loginSuccess({ profileObj }));
            dispatch(addCustomerMongo(profileObj));
            closeMenus();
          } catch (error) {
            console.error("Google credential decode failed:", error);
            setGoogleError("Google sign in failed. Please try again.");
            dispatch(loginFailure({ error: "Google credential decode failed" }));
          }
        },
      });
      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "filled_black",
        size: "large",
        text: "signin_with",
        shape: "rectangular",
        width: 220,
      });
    };

    renderGoogleButton();

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [anchorEl2, dispatch, isLoggedIn]);

  const handleLogout = () => {
    closeMenus();
    window.google?.accounts?.id?.disableAutoSelect();
    dispatch(logout());
    history.push("/");
  };

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setAnchorEl2(null);
  };
  const handleClick2 = (event) => {
    event.stopPropagation();
    setAnchorEl2(anchorEl2 ? null : event.currentTarget);
    setAnchorEl(null);
  };
  const handleClose2 = () => {
    closeMenus();
  };

  return (
    <div className={styles.Navbar} ref={navRef}>
      <div className={styles.leftSide_header}>
        <button
          className={styles.brandButton}
          onClick={() => {
            history.push("/");
          }}
        >
          <span className={styles.brandIcon}>rb</span>
          <span className={styles.brandText}>redBus</span>
        </button>
        <ul className={styles.Navbar__listOne}>
          <li>
            <Link to="/">BUS TICKETS</Link>
          </li>
          <li>
            <Link to="/bus-hire">BUS HIRE</Link>
          </li>
        </ul>
      </div>
      <div className={styles.rightSide_header}>
          <button
            className={styles.manageButton}
            onClick={handleClick}
          >
            Manage Booking
            <RiArrowDropDownLine
              className={styles.icons}
            />
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeMenus}
            >
              <MenuItem onClick={closeMenus}>
                <Link className={styles.menuLink} to="/manage-booking/bus-ticket">Bus Ticket</Link>
              </MenuItem>
              <MenuItem onClick={closeMenus}>
                <Link className={styles.menuLink} to="/manage-booking/cancel">Cancel</Link>
              </MenuItem>
              <MenuItem onClick={closeMenus}>
                <Link className={styles.menuLink} to="/manage-booking/reschedule">Reschedule</Link>
              </MenuItem>
              <MenuItem onClick={closeMenus}>
                <Link className={styles.menuLink} to="/manage-booking/show-ticket">Show My Ticket</Link>
              </MenuItem>
              <MenuItem onClick={closeMenus}>
                <Link className={styles.menuLink} to="/manage-booking/email-sms">Email / SMS</Link>
              </MenuItem>
            </Menu>
          </button>
          <div className={styles.accountButton} onClick={handleClick2}>
            <MdAccountCircle
              className={styles.icons}
              style={{ fontSize: "30px" }}
            />
            <span>{isLoggedIn && currentCustomer ? currentCustomer.name : "Account"}</span>
              <RiArrowDropDownLine
                className={styles.icons}
              />

              {isLoggedIn && currentCustomer ? (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                >
                  <MenuItem
                    onClick={() => {
                      closeMenus();
                    }}
                  >
                    <Link className={styles.menuLink} to="/my-trips">My Trips</Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      closeMenus();
                    }}
                  >
                    <Link className={styles.menuLink} to="/wallet-cards">Wallet/Cards</Link>
                  </MenuItem>
                  <MenuItem onClick={closeMenus}>
                    <Link
                      className={styles.menuLink}
                      to="/my-profile"
                      style={{
                        textDecoration: "none",
                        cursor: "pointer",
                        color: "black",
                        fontWeight: "bold",
                      }}
                    >
                      My Profile
                    </Link>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      closeMenus();
                    }}
                  >
                    <Link className={styles.menuLink} to="/wallet">Wallet</Link>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>SignOut</MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl2}
                  keepMounted
                  open={Boolean(anchorEl2)}
                  onClose={handleClose2}
                >
                  <MenuItem>
                    <div className={styles.googleSignIn}>
                      <div ref={googleButtonRef} />
                      {googleError ? (
                        <div className={styles.googleError}>{googleError}</div>
                      ) : null}
                    </div>
                  </MenuItem>
                </Menu>
              )}
          </div>
      </div>
    </div>
  );
};

export default Navbar;
