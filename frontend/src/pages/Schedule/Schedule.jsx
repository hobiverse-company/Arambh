import { useMemo, useState } from "react";
import "./Schedule.css";
import { scheduleByDay, schedulePage } from "../../data/scheduleData";
import Footer from "../../components/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketball,
  faFutbol,
  faTableTennisPaddleBall,
  faPersonRunning,
} from "@fortawesome/free-solid-svg-icons";

function getSportIcon(sport) {
  const key = String(sport || "").toLowerCase();
  if (key.includes("basket")) return faBasketball;
  if (key.includes("foot")) return faFutbol;
  if (key.includes("badminton")) return faTableTennisPaddleBall;
  if (key.includes("athletic") || key.includes("run")) return faPersonRunning;
  return faTableTennisPaddleBall;
}

export default function Schedule() {
  const [activeDay, setActiveDay] = useState(
    schedulePage.days[0]?.key ?? "day1"
  );

  const rows = useMemo(() => {
    return scheduleByDay[activeDay] ?? [];
  }, [activeDay]);

  return (
    <main className="schedulePage">
      <section className="scheduleSection" aria-label="Schedule">
        <header className="scheduleHeader" aria-label="Schedule section header">
          <h1 className="scheduleTitle">{schedulePage.title}</h1>
          <p className="scheduleSubtitle">{schedulePage.subtitle}</p>
        </header>

        <div className="scheduleTabs" role="tablist" aria-label="Schedule days">
          {schedulePage.days.map((day) => {
            const isActive = day.key === activeDay;
            return (
              <button
                key={day.key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={
                  isActive ? "scheduleTab scheduleTabActive" : "scheduleTab"
                }
                onClick={() => setActiveDay(day.key)}
              >
                {day.label}
              </button>
            );
          })}
        </div>

        <div
          className="scheduleTableWrap"
          role="region"
          aria-label="Schedule table"
          tabIndex={0}
        >
          <table className="scheduleTable">
            <thead>
              <tr>
                <th scope="col">TIME</th>
                <th scope="col">SPORT</th>
                <th scope="col">EVENT TYPE</th>
                <th scope="col">VENUE</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <tr key={`${r.time}-${r.sport}-${idx}`}>
                  <td className="scheduleTime">{r.time}</td>
                  <td className="scheduleSport">
                    <span className="scheduleSportIcon" aria-hidden="true">
                      <FontAwesomeIcon icon={getSportIcon(r.sport)} />
                    </span>
                    <span>{r.sport}</span>
                  </td>
                  <td>{r.type}</td>
                  <td>{r.venue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </main>
  );
}
