"use client";

import {useEffect, useState} from "react";
import styles from "./page.module.css";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useUser} from "./user";

export default function Login() {
  const [email, setEmail] = useState(""); //holds username and pw provided by user
  const [password, setPassword] = useState("");
  const [is_loading, set_is_loading] = useState(false); // loading state for API call
  const [error, setError] = useState("");
  const router = useRouter(); // router to redirect users to other pages
  const {user, setUser} = useUser();
  //-----------------------------------------------------------------------------

  /**
   * When form is submitted (login button) this function will construct a fetch request to send these
   * credentials to the backend. The email and password states which now contain the user's input. are
   * used to create a json payload. The payload is included in the body of the fetch request. The api
   * then receives the data, processes the login request, and sends back a response.
   * @param event
   */
  const handleSubmit = async (event: {preventDefault: () => void}) => {
    event.preventDefault();

    // tracks whether a post/get request is loading or not
    set_is_loading(true);
    setError(""); // informs users of any potential errors

    // sets up HTTP headers and indicates that the payload is json
    //  the header stuff is saying "HEY this is json"
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // converts user input into a json string and stores it into raw, preparing it for transmission in the HTTP req
    var raw = JSON.stringify({
      Email: email,
      Password_: password,
    });

    // this sends a post request to the backend API with the users credentials
    fetch("http://localhost:5165/api/user", {
      method: "POST", //  the body of this is the payload
      headers: myHeaders,
      body: raw, // raw is the user input coverted into json format
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(`result: ${result}`);
        setUser(result);
        router.push("/home");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginContainer}>
        <h2 className={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.formControl}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.formControl}
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Log In
          </button>
        </form>
      </div>
      <div className={styles.links}>
        <p>
          Forgot <Link href="https://www.google.com">Username / Password?</Link>
        </p>
        <p>
          Don't have an account?{" "}
          <Link href="https://www.google.com">Sign up</Link>
        </p>
      </div>
    </main>
  );
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
