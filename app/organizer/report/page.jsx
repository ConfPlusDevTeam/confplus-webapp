"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Tabs from "../../components/Tabs/Tabs";
import { useRouter } from "next/navigation";
import {
  BarList,
  Card,
  Bold,
  Flex,
  Title,
  Text,
  Grid,
  Col,
  DonutChart,
} from "@tremor/react";
import {
  getPapersCount,
  averageAuthorsinPapers,
  averagePresentationsinSessions,
  getSessionsCount,
} from "@/app/actions/actions";

export default async function Authors() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  const [papersCount, setPapersCount] = useState({
    accepted: 0,
    rejected: 0,
    pending: 0,
  });

  const papers = [
    {
      name: "Accepted",
      count: papersCount.accepted,
    },
    {
      name: "Rejected",
      count: papersCount.rejected,
    },
    {
      name: "Pending",
      count: papersCount.pending,
    },
  ];

  const data = [
    {
      name: "Average No. of authors/paper",
      value: 456,
    },
    {
      name: "No. of conference sessions ",
      value: 351,
    },
    {
      name: "Average No. of presentations/session",
      value: 271,
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
        <main className="w-full">
          <Title className="text-white">Statistics Report</Title>
          <Text className="text-slate-300">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
          </Text>

          <Grid numColsLg={6} className="gap-6 mt-6 ">
            <Col numColSpanLg={3}>
              <Card className="h-64">
                <Title>Papers Status</Title>
                <DonutChart
                  className=" text-black"
                  data={papers}
                  category="count"
                  index="name"
                  colors={["green", "red"]}
                />
              </Card>
            </Col>

            <Col numColSpanLg={3}>
              <div className="space-y-6">
                <Card className="h-64">
                  {" "}
                  <Title>Statistics</Title>
                  <Flex className="mt-4">
                    <Text>
                      <Bold>Title</Bold>
                    </Text>
                    <Text>
                      <Bold>Number</Bold>
                    </Text>
                  </Flex>
                  <BarList data={data} className="mt-2" />
                </Card>
              </div>
            </Col>
          </Grid>
        </main>
      </ContentContainer>
    </div>
  );
}
