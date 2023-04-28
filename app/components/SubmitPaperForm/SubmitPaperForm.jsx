"use client";
import React from "react";
import Button from "../Button/Button";
import styles from "./SubmitPaperForm.module.scss";
import UploadField from "../UploadField/UploadField";
import { useState } from "react";

export default function SubmitPaperForm({ affiliations }) {
  const [coAuthors, setCoAuthors] = useState([]);
  const [showButton, setShowButton] = useState(true);
  const elements = [];
  const [count, setCount] = useState(0);

  const handleShowButton = () => {
    setShowButton(!showButton);
  };

  const handleClick = () => {
    setCount(count + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCoAuthor = {
      name: event.target[0].value,
      email: event.target[1].value,
      affiliation: event.target[2].value,
      markPresenter: event.target[3].value,
    };
    console.log(newCoAuthor);
    setCoAuthors([...coAuthors, newCoAuthor]);
  };

  const handleDelete = (index) => {
    const newCoAuthors = [...coAuthors];
    newCoAuthors.splice(index, 1);
    setCoAuthors(newCoAuthors);
    elements.splice(index, 1);
  };

  const renderHTML = () => {
    for (let i = 0; i < count; i++) {
      elements.push(
        <div className={styles.coAuthorForm} onSubmit={handleSubmit}>
          <h4 className={styles.paperDetails}>CO-AUTHOR {count}</h4>
          <div>
            <label htmlFor="name" className={styles.label}>
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
            <label htmlFor="email" className={styles.label}>
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
            <label htmlFor="affiliation" className={styles.label}>
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
            <label htmlFor="mark-presenter" className={styles.label}>
              Mark as Presenter:
            </label>
            <input
              type="checkbox"
              id="mark-presenter"
              className={styles.checkbox}
            />
          </div>
          <Button
            className={styles.saveBtn}
            variant={1}
            type="submit"
            text="Save"
            onClick={handleSubmit}
          ></Button>
        </div>
      );
    }
    return elements;
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
        <label htmlFor="title" className={styles.label}>
          FILE LINK:
        </label>
        <input
          id="title"
          className={styles.input}
          type="text"
          placeholder="Enter Link"
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
          <label htmlFor="add-coauthor" className={styles.paperDetails}>
            ADD CO-AUTHOR
          </label>
          {renderHTML().map((element) => element)}
        </div>
      </div>
    </form>
  );
}
