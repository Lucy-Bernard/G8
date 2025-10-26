"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "./user";
/**
 * Represents the login page component.
 *
 * This component is responsible for rendering the login form and handling user authentication.
 * It uses the useState hook to manage form inputs and submission state.
 */
export default function Login() {

  // defined different states to track user input and interaction
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_loading, set_is_loading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, setUser } = useUser();

  /**
   * Handles the submission of the login form.
   * Sends a POST request to the backend API with the user's credentials (email and password).
   * On successful authentication, the user is redirected to the home page.
   *
   * @param {Object} event - The event object of the form submission.
   */
  const handleSubmit = async (event: { preventDefault: () => void }) => {

    // construct the data packet to send

    event.preventDefault();
    set_is_loading(true);
    setError("");
// construct the request headers and body
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      Email: email,
      Password_: password,
    });

    // POST request to the backend API with user credentials
    fetch("http://localhost:5165/api/user", {
      method: "POST",
      headers: myHeaders,
      body: raw,
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
  // Render the login form
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
          Don&apos;t have an account?{" "}
          <Link href="https://www.google.com">Sign up</Link>
        </p>
      </div>
    </main>
  );
}

function setError(arg0: string) {
  throw new Error("Function not implemented.");
}
