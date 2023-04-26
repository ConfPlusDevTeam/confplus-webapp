## **Summary**

- **URL:**
  - `(GET) /users/:email`
  - `(GET) /users?type=[userType]`
  - `(GET) /institutions`
  - `(POST) /papers`
  - `(GET) /papers?assigned=[reviewerEmail]`
  - `(PUT) /papers/review`
  - `(GET) /papers/review?paperTitle=[paperTitle]`
  - `(GET) /papers/accepted`
  - `(GET) /schedule/dates`
  - `(GET) /schedule`
  - `(PUT) /schedule`
  - `(GET) /locations`

## **Verify User**

returns success if the provided credentials are valid.

- **URL**

  /users/:email

- **Method:**

  `GET`

- **Request Body**

  `hashed-password`

## **Get Users**

returns a list of all users.

- **URL**

  /users

- **Method:**

  `GET`

## **Get Users by type**

returns a list of all authors/reviewers/organizers based on the type in the query.

- **URL**

  /users?type=[userType]

- **Method:**

  `GET`

## **Get Institutions**

returns a list of institutions from `institutions.json`.

- **URL**

  /institutions

- **Method:**

  `GET`

## **Submit Paper**

accepts a paper object to be assigned 2 random reviewrs and saved in `papers.json`.

- **URL**

  /papers

- **Method:**

  `POST`

- **Request Body**

  `paper object`

## **Get Assigned Papers**

returns a list of papers from `papers.json` where the assigned reviewer maatches the passed `reviewerEmail` in the query.

- **URL**

  /papers?assigned=[reviewerEmail]

- **Method:**

  `GET`

- **Response Body**

  `list of paper objects with the paper title, authors, abstract and a link to download the paper.`

## **Submit Paper Review**

accepts a paper object and writes to `papers.json`.

- **URL**

  /papers/review

- **Method:**

  `PUT`

- **Request Body**

  `a paper object with a review attribute that contains an object with the review details.`

## **Get Review Details**

returns a paper from `papers.json` where the paper title matches the passed `paperTitle` in the query and the paper review status should be `true`.

- **URL**

  /papers/review?paperTitle=[paperTitle]

- **Method:**

  `GET`

- **Response Body**

  `a paper object with a review attribute that contains the review details.`

## **Get Schedule**

returns the schedule defined in `schedule.json`.

- **URL**

  /schedule

- **Method:**

  `GET`

- **Response Body**

  `schedule object with the details.`

## **Save Schedule**

save the schedule to `schedule.json`.

- **URL**

  /schedule

- **Method:**

  `PUT`

- **Request Body**

  `schedule object with the details.`

## **Get Locations**

returns list of locations from `locations.json`.

- **URL**

  /locations

- **Method:**

  `GET`

- **Response Body**

  `list of locations.`

## **Get Conference Dates**

returns list of the conference dates from `conference-dates.json`.

- **URL**

  /schedule/dates

- **Method:**

  `GET`

- **Response Body**

  `list of conference dates.`

## **Get Accepted Papers**

returns a list of the accepted papers and associated presenters from `papers.json`.

- **URL**

  /papers/accepted

- **Method:**

  `GET`

- **Response Body**

  `list of accepted papers with presenters.`
