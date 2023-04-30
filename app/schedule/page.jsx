"use client";
import React from "react";
// import styles from "./page.module.scss";
import FullSchedule from "../components/FullSchedule/FullSchedule";
import { useEffect } from "react";

export default function Schdeule() {
  const [schedule, setSchedule] = React.useState([]);
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

  return <FullSchedule schedule={schedule} />;
}
