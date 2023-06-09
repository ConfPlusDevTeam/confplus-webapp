"use client";
import React from "react";
import Button from "../Button/Button";
import styles from "./SubmitPaperForm.module.scss";
import UploadField from "../UploadField/UploadField";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmitPaperForm({}) {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("user"));

  const [authorsIDs, setAuthorsIDs] = useState([parseInt(user.id)]);

  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [affiliations, setAffiliations] = useState([]);
  const [emails, setEmails] = useState([]);
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [authorId, setAuthorId] = useState();
  const [coAuthors, setCoAuthors] = useState([]);

  const getUsers = async () => {
    const response = await fetch("/api/users?role=author").then((response) =>
      response.json()
    );
    setUsers(await response);
    setEmails((await response).map((email) => email.email));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [markPresenter, setMarkPresenter] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setName(
      users.filter((user) => user.email == event.target.value)[0].first_name +
        " " +
        users.filter((user) => user.email == event.target.value)[0].last_name
    );
    setAffiliation(
      users.filter((user) => user.email == event.target.value)[0]
        .institutionName
    );
    setAuthorId(users.find((user) => user.email == event.target.value).id);
  };

  console.log(authorId);
  const handleAffiliationChange = (event) => {
    setAffiliation(event.target.value);
  };
  const handleMarkPresenterChange = (event) => {
    setMarkPresenter(!markPresenter);
  };

  const handleShowButton = () => {
    setShowButton(!showButton);
  };

  const handleShow = () => {
    setShowForm(!showForm);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    if (name && email && affiliation) {
      const newCoAuthor = authorId;
      const newCoAuthor2 = {
        name: name,
        email: email,
      };
      setCoAuthors([...coAuthors, newCoAuthor2]);
      emails.splice(emails.indexOf(email), 1);
      setErrorMessage("");

      setAuthorsIDs([...authorsIDs, newCoAuthor]);
      setAuthorId(0);
      setName("");
      setEmail("");
      setAffiliation("");
      setMarkPresenter(false);
    } else setErrorMessage("Please fill all the fields");
  };

  const handleDelete = async (index) => {
    const newCoAuthors = [...authorsIDs];

    newCoAuthors.splice(index, 1);
    setAuthorsIDs(newCoAuthors);
  };

  console.log(authorsIDs);

  const handleSubmit = (event) => {
    event.preventDefault();
    const paper = {
      authorIDs: authorsIDs,
      paperTitle: event.target.title.value,
      abstract: event.target.abstract.value,
      fileLink: event.target.link.value,
      presenterID: parseInt(user.id),
    };
    fetch("/api/papers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paper),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        router.push(`/author`);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error submitting paper");
      });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.submitForm}> SUBMIT FORM</h3>
      <h4 className={styles.paperDetails}>PAPER DETAILS:</h4>
      <div>
        <label htmlFor="title" className={styles.label}>
          TITLE:
        </label>
        <input
          id="title"
          className={styles.input}
          type="text"
          placeholder="Enter Title"
          required
        />
      </div>
      <div>
        <label htmlFor="abstract" className={styles.label}>
          ABSTRACT:
        </label>
        <textarea
          id="abstract"
          className={styles.textArea}
          type="text"
          placeholder="Enter Abstract"
          required
        />
      </div>
      <div className={styles.uploadField}>
        <UploadField></UploadField>
      </div>
      <div>
        <label htmlFor="link" className={styles.label}>
          FILE LINK:
        </label>
        <input
          id="link"
          className={styles.input}
          type="url"
          placeholder="Enter Link"
          required
        />
      </div>
      {coAuthors.length > 0 && (
        <div className={styles.showCoAuthors}>
          <h5>CoAuthors:</h5>
          <div className={styles.coAuthorContainer}>
            {coAuthors.map((coAuthor, index) => (
              <div key={index}>
                <p className={styles.coAuthor}>
                  {index + 1 + "- "}
                  {coAuthor.name} ({coAuthor.email}){" "}
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

      <div>
        <div>
          <input
            type={"button"}
            onClick={handleShow}
            value="+"
            id="add-coauthor"
            className={styles.addCoAuthorBtn}
          ></input>
          <label htmlFor="add-coauthor" className={styles.paperDetails}>
            ADD CO-AUTHOR
          </label>
          {showForm && (
            <div className={styles.coAuthorForm}>
              <h4 className={styles.paperDetails}>CO-AUTHOR </h4>
              <div className={styles.errorMessage}>
                <p>{errorMessage}</p>
              </div>
              <div>
                <label htmlFor="email" className={styles.label}>
                  EMAIL:
                </label>
                <select
                  id="email"
                  name="email"
                  className={styles.affiliations}
                  value={email}
                  onChange={handleEmailChange}
                  defaultValue=""
                >
                  <option disabled hidden value="">
                    Choose Author Email
                  </option>
                  {emails?.map((em, key) => (
                    <option key={key} onClick={handleEmailChange} value={em}>
                      {em}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="name" className={styles.label}>
                  NAME:
                </label>
                <input
                  id="name"
                  className={styles.input}
                  type="text"
                  disabled
                  value={name}
                />
              </div>
              <div>
                <label htmlFor="institution" className={styles.label}>
                  Affiliation NAME:
                </label>
                <input
                  id="name"
                  className={styles.input}
                  type="text"
                  disabled
                  value={affiliation}
                />
              </div>
              <div className={styles.presenter}>
                <label htmlFor="mark-presenter" className={styles.label}>
                  Mark as Presenter:
                </label>
                <input
                  type="checkbox"
                  id="mark-presenter"
                  className={styles.checkbox}
                  onChange={handleMarkPresenterChange}
                  checked={markPresenter}
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
      <div className={styles.submitBtn}>
        <Button variant={1} type="submit" text="Submit Paper"></Button>
      </div>
    </form>
  );
}
