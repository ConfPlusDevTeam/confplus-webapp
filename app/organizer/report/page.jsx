"use client";
import React, { useEffect } from "react";
import styles from "./page.module.scss";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Tabs from "../../components/Tabs/Tabs";
import { useRouter } from "next/navigation";
import { Card, Title, DonutChart } from "@tremor/react";

export default function Authors() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  const cities = [
    {
      name: "New York",
      sales: 9800,
    },
    {
      name: "London",
      sales: 4567,
    },
    {
      name: "Hong Kong",
      sales: 3908,
    },
    {
      name: "San Francisco",
      sales: 2400,
    },
    {
      name: "Singapore",
      sales: 1908,
    },
    {
      name: "Zurich",
      sales: 1398,
    },
  ];

  //   useEffect(() => {
  //     if (!user) {
  //       router.push("/signin");
  //       return;
  //     } else {
  //       const userRole = user.role;
  //       if (userRole !== "author") {
  //         router.push("/signin");
  //         return;
  //       } else {
  //       }
  //     }
  //   }, []);

  const links = [
    {
      name: "Report",
      link: "/organizer/report",
    },
    {
      name: "Update Schedule",
      link: "/organizer/updateschedule",
    },
  ];

  return (
    <div className={styles.profile}>
      <WelcomeMessage
        props={JSON.parse(localStorage.getItem("user")).first_name}
      />
      <ContentContainer variant={2} className={styles}>
        <Tabs links={links} className={styles} />
        <Card className="max-w-lg bg-transparent">
          <Title className="text-white-500">Sales</Title>
          <DonutChart
            className="mt-6 text-white-500"
            data={cities}
            category="sales"
            index="name"
            colors={["slate", "violet", "indigo", "rose", "cyan", "amber"]}
          />
        </Card>
      </ContentContainer>
    </div>
  );
}
