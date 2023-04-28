"use client";
import React from "react";
import Button from "../Button/Button";
import styles from "./SubmitPaperForm.module.scss";
import UploadField from "../UploadField/UploadField";
import { useState } from "react";
import { useEffect } from "react";

export default function SubmitPaperForm({}) {
  const [coAuthors, setCoAuthors] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [affiliations, setAffiliations] = useState([]);
  const [emails, setEmails] = useState([]);
  const [users, setUsers] = useState([]);

  const getAffiliations = async () => {
    const response = await fetch("/api/institutions").then((response) =>
      response.json()
    );
    setAffiliations(await response);
  };

  const getUsers = async () => {
    const response = await fetch("/api/users?role=author").then((response) =>
      response.json()
    );
    setUsers(await response);
    setEmails((await response).map((email) => email.email));
  };

  useEffect(() => {
    getAffiliations();
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
  };
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
      const newCoAuthor = {
        name: name,
        email: email,
        affiliation: affiliation,
        presenter: markPresenter ? "yes" : "no",
      };
      setCoAuthors([...coAuthors, newCoAuthor]);
      setName("");
      setEmail("");
      setAffiliation("");
      setMarkPresenter(false);
    }
  };

  const handleDelete = (index) => {
    const newCoAuthors = [...coAuthors];
    newCoAuthors.splice(index, 1);
    setCoAuthors(newCoAuthors);
  };

  return (
    <form className={styles.form}>
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
          type="text"
          placeholder="Enter Link"
        />
      </div>
      {coAuthors.length > 0 && (
        <div className={styles.showCoAuthors}>
          <h5>CoAuthors:</h5>
          <div className={styles.coAuthorContainer}>
            {coAuthors?.map((coAuthor, index) => (
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

              <div>
                {/* <label htmlFor="email" className={styles.label}>
                  EMAIL:
                </label>
                <input
                  id="email"
                  className={styles.input}
                  type="email"
                  placeholder="Enter Email"
                  onChange={handleEmailChange}
                  value={email}
                /> */}
                <label htmlFor="email" className={styles.label}>
                  EMAIL:
                </label>
                <select
                  id="email"
                  name="email"
                  className={styles.affiliations}
                  value={email}
                  onChange={handleEmailChange}
                >
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
                <label htmlFor="affiliation" className={styles.label}>
                  AFFILIATION:
                </label>
                <select
                  id="affiliation"
                  name="affiliation"
                  className={styles.affiliations}
                  value={affiliation}
                  onChange={handleAffiliationChange}
                >
                  {affiliations?.map((affil, key) => (
                    <option
                      key={key}
                      onClick={handleAffiliationChange}
                      value={affil}
                    >
                      {affil}
                    </option>
                  ))}
                </select>
              </div>
              <div>
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
    </form>
  );
}
