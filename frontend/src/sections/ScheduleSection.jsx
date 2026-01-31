import { useNavigate } from "react-router-dom";
import "./ScheduleSection.css";
import { schedulePage } from "../data/scheduleData";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

export default function ScheduleSection() {
  const navigate = useNavigate();

  return (
    <section id="schedule" className="scheduleSection" aria-label="Schedule">
      <header className="scheduleHeader" aria-label="Schedule section header">
        <h2 className="scheduleTitle">{schedulePage.title}</h2>
        <p className="scheduleSubtitle">{schedulePage.subtitle}</p>
        <p className="scheduleEventDates">
          <FontAwesomeIcon icon={faCalendarAlt} />
          <span>{schedulePage.eventDates}</span>
        </p>
      </header>

      <div className="scheduleComingSoon">
        <Button
          className="scheduleViewBtn"
          onClick={() => navigate("/schedule")}
        >
          View Schedule
        </Button>
      </div>
    </section>
  );
}
