"use client";
import React from "react";
import Button from "../Button/Button";
import styles from "./SubmitPaperForm.module.scss";
import { useState } from "react";
import dangerouslySetInnerHTML from "react-dom/server";

export default function SubmitPaperForm({ affiliations }) {
  const [coAuthors, setCoAuthors] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [markPresenter, setMarkPresenter] = useState(false);

  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
  };

  const renderHTML = () => {
    const elements = [];
    for (let i = 0; i < count; i++) {
      elements.push(
        <div className={styles.coAuthorForm}>
          <h4 className={styles.paperDetails}> CO-AUTHOR</h4>
          <div>
            <label for="name" className={styles.label}>
              NAME:
            </label>
            <input
              id="name"
              className={styles.input}
              type="text"
              placeholder="Enter Name"
            />
          </div>
          <div>
            <label for="email" className={styles.label}>
              EMAIL:
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              placeholder="Enter Email"
            />
          </div>
          <div>
            <label for="affiliation" className={styles.label}>
              AFFILIATION:
            </label>
            <select
              id="affiliation"
              name="affiliation"
              className={styles.affiliations}
            >
              {affiliations?.map((affiliation) => (
                <option value={affiliation}>{affiliation}</option>
              ))}
            </select>
          </div>
          <div>
            <label for="mark-presenter" className={styles.label}>
              Mark as Presenter:
            </label>
            <input
              type={"checkbox"}
              id="mark-presenter"
              className={styles.checkbox}
            />
          </div>
          <input type={"button"} value="save" onClick={handleSubmit}></input>
        </div>
      );
    }
    return elements;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCoAuthor = { name: name, email: email };
    setCoAuthors([...coAuthors, newCoAuthor]);
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
        <label for="title" className={styles.label}>
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
        <label for="abstract" className={styles.label}>
          ABSTRACT:
        </label>
        <textarea
          id="abstract"
          className={styles.textArea}
          type="text"
          placeholder="Enter Abstract"
        />
      </div>
      <div>
        <div>
          <input
            type={"button"}
            onClick={handleClick}
            value="+"
            id="add-coauthor"
            className={styles.addCoAuthorBtn}
          ></input>
          <label for="add-coauthor" className={styles.paperDetails}>
            {" "}
            ADD CO-AUTHOR
          </label>
          {renderHTML()}
        </div>
      </div>
    </form>
  );
}
