"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";
import styles from "./page.module.scss";
import Button from "@/app/components/Button/Button";
import WelcomeMessage from "../../components/WelcomeMessage/WelcomeMessage";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import Tabs from "../../components/Tabs/Tabs";

export default function UpdateSchedule() {
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

  const [dates, setDates] = useState([]);
  const [date, setDate] = useState("");

  const [schedule, setSchedule] = useState([]);

  const [sessions, setSessions] = useState([]);
  const [session, setSession] = useState({});

  const [papers, setPapers] = useState([]);
  const [paper, setPaper] = useState({});

  const handlePaperChange = (e) => {
    setPaper(e.target.value);
    getSessions(date);
  };

  const [session2, setSession2] = useState({});

  const handleSessionChange = (e) => {
    setSession2(e.target.value);
  };

  const [showForm, setShowForm] = useState(false);
  const handleShow = () => {
    setShowForm(!showForm);
  };

  const [showForm2, setShowForm2] = useState(false);
  const handleShow2 = () => {
    setShowForm2(!showForm2);
  };

  const [errorMessage, setErrorMessage] = useState("");

  const [errorMessage2, setErrorMessage2] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
    getSessions(e.target.value);
  };

  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");

  const [name, setName] = useState("");
  const [sTime, setSTime] = useState("");
  const [fTime, setFTime] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const getLocations = async () => {
    const response = await fetch("/api/locations")
      .then((response) => response.json())
      .then((data) => {
        setLocations(data);
      });
  };

  const getDates = async () => {
    const response = await fetch("/api/schedule/")
      .then((response) => response.json())
      .then((data) => {
        setDates(
          data[0].scheduleDates.map((day) =>
            new Date(day.date).toLocaleDateString()
          )
        );
      });
  };

  const getSessions = async (date) => {
    const response = await fetch(`/api/schedule`)
      .then((response) => response.json())
      .then((data) => {
        setSchedule(data[0].scheduleDates);
        return data[0].scheduleDates.find(
          (day) =>
            new Date(day.date).toLocaleDateString() ==
            new Date(date).toLocaleDateString()
        );
      })
      .then((data) => {
        return data.sessions;
      });

    setSessions(await response);
  };

  const getAcceptedPapers = async (session) => {
    const response = await fetch(`/api/papers/accepted`)
      .then((response) => response.json())
      .then((data) => {
        setPapers(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getDates();
    getLocations();
    getAcceptedPapers();
  }, []);

  const handleDelete = (index) => {
    const list = [...sessions];
    list.splice(index, 1);
    setSessions(list);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    if (location === "") {
      setErrorMessage("Please choose a location");
      return;
    }
    if (sTime === "") {
      setErrorMessage("Please choose a starting time");
      return;
    }
    if (fTime === "") {
      setErrorMessage("Please choose a finishing time");
      return;
    }
    if (name === "") {
      setErrorMessage("Please enter a session name");
      return;
    }
    const list = [...sessions];
    list.push({
      name: name,
      location: location,
      fromTime: sTime,
      endTime: fTime,
      presenters: [
        {
          name: "Presenter 1",
        },
        {
          name: "Presenter 2",
        },
      ],
      assignedPapers: [
        {
          title: "Paper 1",
        },
        {
          title: "Paper 2",
        },
      ],
    });
    setSessions(list);
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (date === "") {
      alert("Please choose a date");
      return;
    }
    if (sessions.length === 0) {
      alert("Please add at least one session");
      return;
    }
    const response = await fetch("/api/schedule", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          name: date,
          sessions: sessions,
        },
      ]),
    }).then((response) => response.json());
    if (response.error) {
      setErrorMessage(response.error);
      return;
    }
    router.push("/schedule");
  };

  return (
    <div className={styles.profile}>
      <WelcomeMessage
        props={JSON.parse(localStorage.getItem("user")).first_name}
      />
      <ContentContainer variant={2} className={styles}>
        <Tabs links={links} className={styles} />

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.submitForm}> Update Schedule</h3>
          <div>
            <div>
              <label htmlFor="day" className={styles.label}>
                Date:
              </label>
              <select
                id="day"
                name="day"
                className={styles.affiliations}
                value={date}
                onChange={handleDateChange}
                defaultValue=""
              >
                <option disabled hidden value="">
                  Choose Date
                </option>
                {dates?.map((em, key) => (
                  <option key={key} onClick={handleDateChange} value={em}>
                    {em}
                  </option>
                ))}
              </select>
            </div>
            {sessions?.length > 0 && (
              <div className={styles.showCoAuthors}>
                <h5>Sessions:</h5>
                <div className={styles.coAuthorContainer}>
                  {sessions?.map((session, index) => (
                    <div key={index}>
                      <p className={styles.coAuthor}>
                        {index + 1 + "- "}
                        {session.name} (Starting time: {session.fromTime}){" "}
                      </p>{" "}
                      <span
                        onClick={() => handleDelete(index)}
                        className={styles.deleteCoAuthor}
                      >
                        X
                      </span>
                    </div>
                  ))}{" "}
                </div>
              </div>
            )}
          </div>

          <div>
            <div>
              {sessions?.length > 0 && (
                <>
                  <input
                    type={"button"}
                    onClick={handleShow}
                    value="+"
                    id="add-coauthor"
                    className={styles.addCoAuthorBtn}
                  ></input>
                  <label htmlFor="add-coauthor" className={styles.paperDetails}>
                    ADD SESSION
                  </label>
                </>
              )}
              {showForm && (
                <div className={styles.coAuthorForm}>
                  <h4 className={styles.paperDetails}>SESSION </h4>
                  <div className={styles.errorMessage}>
                    <p>{errorMessage}</p>
                  </div>
                  <div>
                    <label htmlFor="name" className={styles.label}>
                      Session Name:
                    </label>
                    <input
                      id="name"
                      className={styles.input}
                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div>
                    <label htmlFor="location" className={styles.label}>
                      Location:
                    </label>
                    <select
                      id="location"
                      name="location"
                      className={styles.affiliations}
                      value={location}
                      onChange={handleLocationChange}
                      defaultValue=""
                    >
                      <option disabled hidden value="">
                        Choose Session Location
                      </option>
                      {locations?.map((em, key) => (
                        <option
                          key={key}
                          onClick={handleLocationChange}
                          value={em}
                        >
                          {em}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="toTime" className={styles.label}>
                      Starting Time:
                    </label>
                    <input
                      id="toTime"
                      className={styles.input}
                      type="text"
                      onChange={(e) => setSTime(e.target.value)}
                      value={sTime}
                    />
                  </div>
                  <div>
                    <label htmlFor="fromTime" className={styles.label}>
                      Finishing Time:
                    </label>
                    <input
                      id="fromTime"
                      className={styles.input}
                      type="text"
                      onChange={(e) => setFTime(e.target.value)}
                      value={fTime}
                    />
                  </div>

                  <Button
                    className={styles.saveBtn}
                    variant={1}
                    type="submit"
                    text="Save"
                    onClick={handleAdd}
                  ></Button>
                </div>
              )}
            </div>
          </div>

          {/* <div>
          <div>
            {papers?.length > 0 && (
              <>
                <input
                  type={"button"}
                  onClick={handleShow2}
                  value="+"
                  id="add-coauthor"
                  className={styles.addCoAuthorBtn}
                ></input>
                <label htmlFor="add-coauthor" className={styles.paperDetails}>
                  ADD PAPER
                </label>
              </>
            )}
            {showForm2 && (
              <div className={styles.coAuthorForm}>
                <h4 className={styles.paperDetails}>PAPER </h4>
                <div className={styles.errorMessage}>
                  <p>{errorMessage2}</p>
                </div>
                <div>
                  <label htmlFor="paper" className={styles.label}>
                    Paper:
                  </label>
                  <select
                    id="paper"
                    name="paper"
                    className={styles.affiliations}
                    value={paper}
                    onChange={handlePaperChange}
                    defaultValue=""
                  >
                    <option disabled hidden value="">
                      Choose Paper
                    </option>
                    {papers?.map((em, key) => (
                      <option
                        key={key}
                        onClick={handlePaperChange}
                        value={em.paperTitle}
                      >
                        {em.paperTitle}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="session" className={styles.label}>
                    Session:
                  </label>
                  <select
                    id="session"
                    name="session"
                    className={styles.affiliations}
                    value={session2}
                    onChange={handleSessionChange}
                    defaultValue=""
                  >
                    <option disabled hidden value="">
                      Choose Session
                    </option>
                    {sessions?.map((em, key) => (
                      <option
                        key={key}
                        onClick={handleSessionChange}
                        value={em.name}
                      >
                        {em.name}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  className={styles.saveBtn}
                  variant={1}
                  type="submit"
                  text="Save"
                  onClick={handleAdd2}
                ></Button> 
              </div>
            )}
          </div>
        </div> */}

          <div className={styles.submitBtn}>
            <Button variant={1} type="submit" text="Update Schedule"></Button>
          </div>
        </form>
      </ContentContainer>
    </div>
  );
}
