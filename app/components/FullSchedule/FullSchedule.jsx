"use client";
import React from "react";
import styles from "./FullSchedule.module.scss";

export default function FullSchedule({ schedule }) {
  const [chosenDay, setChosenDay] = React.useState("all");
  return (
    <div className={styles.ScheduleContainer}>
      <h1>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192z" />
        </svg>
        Conference Schedule
      </h1>
      <div className={styles.dropdown}>
        <label htmlFor="filter">Filter by day: </label>
        <select id="filter" name="filter" className={styles.dropdown}>
          <option value="" disabled selected hidden>
            Choose a day
          </option>
          <option value="all" onClick={() => setChosenDay("all")}>
            Full Schedule
          </option>
          {schedule
            ?.map((day) => day.name)
            .map((name, key) => (
              <option onClick={() => setChosenDay(name)} value={name}>
                {"Day " + (key + 1)}
              </option>
            ))}
        </select>
      </div>
      {schedule
        .filter((day) => day.name === chosenDay || chosenDay === "all")
        .map((day, key) => (
          <div className={styles.dayContainer}>
            <h2>{day.name}</h2>
            <div className={styles.daySchedule}>
              {day.sessions.map((session) => (
                <div className={styles.sessionContainer}>
                  <h3>{session.name}</h3>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                    </svg>
                    {session.fromTime}
                    {"   "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M160 64c0-35.3 28.7-64 64-64H576c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H336.8c-11.8-25.5-29.9-47.5-52.4-64H384V320c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v32h64V64L224 64v49.1C205.2 102.2 183.3 96 160 96V64zm0 64a96 96 0 1 1 0 192 96 96 0 1 1 0-192zM133.3 352h53.3C260.3 352 320 411.7 320 485.3c0 14.7-11.9 26.7-26.7 26.7H26.7C11.9 512 0 500.1 0 485.3C0 411.7 59.7 352 133.3 352z" />
                    </svg>
                    Given by:{" "}
                    {session.presenters
                      .map((presenter) => presenter.name)
                      .join(", ")}
                  </p>
                  <p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M0 64C0 28.7 28.7 0 64 0H224V128c0 17.7 14.3 32 32 32H384v38.6C310.1 219.5 256 287.4 256 368c0 59.1 29.1 111.3 73.7 143.3c-3.2 .5-6.4 .7-9.7 .7H64c-35.3 0-64-28.7-64-64V64zm384 64H256V0L384 128zM288 368a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm211.3-43.3c-6.2-6.2-16.4-6.2-22.6 0L416 385.4l-28.7-28.7c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l40 40c6.2 6.2 16.4 6.2 22.6 0l72-72c6.2-6.2 6.2-16.4 0-22.6z" />
                    </svg>
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
