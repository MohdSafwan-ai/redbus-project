import React from "react";
import BusHireFooter from "./Components/Bus hire Main Page/Bus Hire Footer Section/BusHireFooter";
import SubFooter from "./Components/Bus hire Main Page/Sub Footer Section/SubFooter";
import Navbar from "./Components/Navbar/Navbar";
import Routes from "./Routes/Routes";

const App = () => {
  const [isPageLoading, setIsPageLoading] = React.useState(true);

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setIsPageLoading(false);
    }, 750);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <div style={{ overflowX: "hidden" }}>
      {isPageLoading ? (
        <div className="app-loader" aria-label="Loading page">
          <div className="app-loader__mark">rb</div>
          <div className="app-loader__bar">
            <span />
          </div>
        </div>
      ) : null}
      <Navbar />
      <Routes />
      <SubFooter />
      <BusHireFooter />
    </div>
  );
};

export default App;
