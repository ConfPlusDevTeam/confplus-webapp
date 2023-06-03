"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import { useState, useEffect } from "react";
import Scrollbar from "./components/Scrollbar/Scrollbar";
import FilteredSchedule from "./components/FilteredSchedule/FilteredSchedule";
import Typical from "react-typical";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [active, setActive] = useState("welcome");

  const [schedule, setSchedule] = useState([]);
  const getSchedule = async () => {
    await fetch("/api/schedule", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((schedule) => {
        setSchedule(schedule);
      });
  };
  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <div className={styles.homeContainer}>
      <style>{`
        body {
          overflow:hidden
          @media screen and (max-width: 45rem) {
            overflow:visible
          }
        }
`}</style>

      <Sidebar
        onclick={(activeTab) => setActive(activeTab)}
        activeElement={active}
      />
      <div className={styles.card}>
        {active == "welcome" && (
          <ContentContainer variant={1} title="" className={styles}>
            <div className={styles.welcomeContainer}>
              <h1 className={styles.hi}>Welcome, &nbsp;</h1>
              <Typical
                steps={[
                  "Organizer!",
                  1400,
                  "Author!",
                  1400,
                  "Reviewer!",
                  1400,
                  "Attendee!",
                  1400,
                ]}
                loop={Infinity}
                wrapper="h1"
                className={styles.typical}
              ></Typical>
            </div>
          </ContentContainer>
        )}
        {active == "schedule" && (
          <ContentContainer variant={2} title="Schedule" className={styles}>
            <FilteredSchedule schedule={schedule} />
          </ContentContainer>
        )}
        {active == "about" && (
          <ContentContainer variant={1} title="About" className={styles}>
            Confplus is a webpage that simplifies the organization and
            management of the IEEE International Conference. Our user-friendly
            platform streamlines the planning process, from scheduling to
            promotion, to ensure a successful event.
          </ContentContainer>
        )}
        <Scrollbar />
      </div>
    </div>
  );
}
