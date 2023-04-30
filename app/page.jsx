"use client";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "./page.module.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentContainer from "./components/ContentContainer/ContentContainer";
import { useState, useEffect } from "react";
import Scrollbar from "./components/Scrollbar/Scrollbar";
import FilteredSchedule from "./components/FilteredSchedule/FilteredSchedule";

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

  // const schedule = [
  //   {
  //     name: "Day 1",
  //     sessions: [
  //       {
  //         name: "Session 1",
  //         fromTime: "9:00 AM",
  //         presenters: [
  //           {
  //             name: "Presenter 1",
  //           },
  //           {
  //             name: "Presenter 2",
  //           },
  //         ],
  //         assignedPapers: [
  //           {
  //             title: "Paper 1",
  //           },
  //           {
  //             title: "Paper 2",
  //           },
  //         ],
  //       },
  //       {
  //         name: "Session 2",
  //         fromTime: "10:00 AM",
  //         presenters: [
  //           {
  //             name: "Presenter 3",
  //           },
  //           {
  //             name: "Presenter 4",
  //           },
  //         ],
  //         assignedPapers: [
  //           {
  //             title: "Paper 3",
  //           },
  //           {
  //             title: "Paper 4",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: "Day 2",
  //     sessions: [
  //       {
  //         name: "Session 1",
  //         fromTime: "9:00 AM",
  //         presenters: [
  //           {
  //             name: "Presenter 1",
  //           },
  //           {
  //             name: "Presenter 2",
  //           },
  //         ],
  //         assignedPapers: [
  //           {
  //             title: "Paper 1",
  //           },
  //           {
  //             title: "Paper 2",
  //           },
  //         ],
  //       },
  //       {
  //         name: "Session 2",
  //         fromTime: "10:00 AM",
  //         presenters: [
  //           {
  //             name: "Presenter 3",
  //           },
  //           {
  //             name: "Presenter 4",
  //           },
  //         ],
  //         assignedPapers: [
  //           {
  //             title: "Paper 3",
  //           },
  //           {
  //             title: "Paper 4",
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

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
          <ContentContainer variant={1} title="Welcome !" className={styles}>
            We are delighted to have you attend the IEEE International Conference. This conference features some of the best minds in the field of Computer Science and Engineering. We hope you enjoy the conference and have a great time.
            There will multiple sessions and paper presentations. You can find the schedule for the conference below.
            
          </ContentContainer>
        )}
        {active == "schedule" && (
          <ContentContainer variant={2} title="Schedule" className={styles}>
            <FilteredSchedule schedule={schedule} />
          </ContentContainer>
        )}
        {active == "about" && (
          <ContentContainer variant={1} title="About" className={styles}>
            Confplus is a webpage that simplifies the organization and management of the IEEE International Conference. Our user-friendly platform streamlines the planning process, from scheduling to promotion, to ensure a successful event.
          </ContentContainer>
        )}
        <Scrollbar />
      </div>
    </div>
  );
}
