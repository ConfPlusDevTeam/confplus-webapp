"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Organizer() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    } else {
      const userRole = user.role;
      if (userRole !== "organizer") {
        router.push("/signin");
        return;
      }
    }
  }, []);
  router.push("/organizer/updateschedule");

  return <div>Organizer</div>;
}
