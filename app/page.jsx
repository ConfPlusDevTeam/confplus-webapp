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
          <ContentContainer variant={1} title="Welcome" className={styles}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
            similique nisi maxime suscipit et numquam repudiandae aut,
            architecto veniam eveniet blanditiis ex, voluptas fugiat laboriosam
            assumenda illo illum debitis fuga?
          </ContentContainer>
        )}
        {active == "schedule" && (
          <ContentContainer variant={2} title="Schedule" className={styles}>
            <FilteredSchedule schedule={schedule} />
          </ContentContainer>
        )}
        {active == "about" && (
          <ContentContainer variant={1} title="About" className={styles}>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed
            similique nisi maxime suscipit et numquam repudiandae aut,
            architecto veniam eveniet blanditiis ex, voluptas fugiat laboriosam
            assumenda illo illum debitis fuga?
          </ContentContainer>
        )}
        <Scrollbar />
      </div>
    </div>
  );
}
