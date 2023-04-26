import React from "react";
import styles from "./FullSchedule.module.scss";

export default function FullSchedule({ schedule }) {
  return (
    <div className={styles.ScheduleContainer}>
      <h1>Conference Schedule</h1>
      {schedule.map((day, key) => (
        <div className={styles.dayContainer}>
          <h2>{day.name}</h2>
          <div className={styles.daySchedule}>
            {day.sessions.map((session) => (
              <div className={styles.sessionContainer}>
                <h3>{session.name}</h3>
                <p>
                  {session.fromTime} - Given by:{" "}
                  {session.presenters
                    .map((presenter) => presenter.name)
                    .join(", ")}
                </p>
                <p>
                  Assigned papers:{" "}
                  {session.assignedPapers
                    .map((paper) => paper.title)
                    .join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
