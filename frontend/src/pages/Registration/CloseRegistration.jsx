import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faMapMarkerAlt,
  faCalendarCheck,
  faFutbol,
  faTableTennis,
  faVolleyballBall,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./CloseRegistration.css";

const CloseRegistration = () => {
  const onlineSports = ["Cricket", "Football", "Badminton"];
  const offlineSports = [
    "Volleyball",
    "Kho-Kho",
    "Athletics",
    "Chess",
    "Carrom",
    "Table Tennis",
    "Tug of War",
  ];

  return (
    <main className="closeRegPage">
      <section className="closeRegCard">
        {/* Header */}
        <div className="closeRegHeader">
          <div className="closeRegIconWrap">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="closeRegIcon"
            />
          </div>
          <h1 className="closeRegTitle">Online Registration Closed</h1>
          <p className="closeRegSubtitle">
            Online registration for most sports has ended. But don't worry — you
            can still register on-site!
          </p>
        </div>

        {/* Online Sports Section */}
        <div className="closeRegSection">
          <div className="closeRegSectionHeader">
            <FontAwesomeIcon icon={faCalendarCheck} className="sectionIcon" />
            <h2 className="closeRegSectionTitle">Registration are permanently closed</h2>
          </div>
          <p className="closeRegSectionDesc">
            The following sports registrations Are Closed!!:
          </p>
          <div className="sportsTagsWrap">
            {onlineSports.map((sport) => (
              <span key={sport} className="sportTag sportTagOnline">
                <FontAwesomeIcon icon={faFutbol} className="sportTagIcon" />
                {sport}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="closeRegDivider">
          <span className="closeRegDividerText">OR</span>
        </div>

        {/* Offline Registration Section */}
        <div className="closeRegSection closeRegSectionOffline">
          <div className="closeRegSectionHeader">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="sectionIcon" />
            <h2 className="closeRegSectionTitle">On-Site Registration</h2>
          </div>
          <div className="venueCard">
            <div className="venueInfo">
              <h3 className="venueName">📍 Kreeda Sthal</h3>
              <p className="venueDesc">
                Visit the registration desk at <strong>Kreeda Sthal</strong> to
                register for the following sports:
              </p>
            </div>
          </div>
          <div className="sportsTagsWrap">
            {offlineSports.map((sport) => (
              <span key={sport} className="sportTag sportTagOffline">
                <FontAwesomeIcon
                  icon={faVolleyballBall}
                  className="sportTagIcon"
                />
                {sport}
              </span>
            ))}
          </div>
          <div className="offlineNote">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="noteIcon"
            />
            <span>
              Please carry your <strong>College ID</strong> and{" "}
              <strong>Aadhar Card</strong> for on-site registration.
            </span>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="closeRegActions">
          <Link to="/" className="closeRegBtn closeRegBtnHome">
            <FontAwesomeIcon icon={faHome} className="homeBtnIcon" />
            Back to Home
          </Link>
        </div>

        {/* Help Section */}
        <div className="closeRegHelp">
          <div className="closeRegHelpTitle">Need Help? Contact Us:</div>
          <div className="closeRegHelpRow">
            <span className="closeRegHelpName">Ayush Singh</span>
            <a className="closeRegHelpLink" href="tel:7081832092">
              7081832092
            </a>
          </div>
          <div className="closeRegHelpRow">
            <span className="closeRegHelpName">Aman Singh Nishad</span>
            <a className="closeRegHelpLink" href="tel:7340981852">
              7340981852
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CloseRegistration;