import "../styles/CSS/auth.css";
import { GoogleButton, SpotifyButton } from "../Components";
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { set } from "firebase/database";

const SignIn = ({ ...props }: any) => {
  return (
    <>
      <p className="form-subtitle">Welcome back!</p>
      <div className="input-wrapper">
        <input
          id="email"
          className="input-auth"
          placeholder="email"
          type="text"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        />
      </div>
      {props.emailError === "empty" && (
        <p className="input-error-text">your email can't be empty</p>
      )}
      {props.emailError === "invalid" && (
        <p className="input-error-text">it must be a valid email</p>
      )}
      <div className="input-wrapper">
        <input
          id="password"
          className="input-auth"
          placeholder="password"
          type="password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
      </div>
      {props.passwordError === "empty" && (
        <p className="input-error-text">your password can't be empty</p>
      )}
      {props.error === "auth/invalid-credential" && (
        <p className="credential-error">
          Hmm, seems like the email/password is incorrect.
          <span onClick={() => props.setIsSignIn(false)}>
            create an account?
          </span>
        </p>
      )}
      {props.error === "auth/too-many-requests" && (
        <p className="credential-error">
          Slow it down Speedy... Try again in 5 sec.
        </p>
      )}
      <div className="button-wrapper">
        <button
          className="submit-button"
          type="submit"
          disabled={
            (props.isSubmit && !props.isValid) ||
            props.error === "auth/too-many-requests"
          }
        >
          sign in
        </button>
      </div>
      <p className="forgot-pw">forgot your password?</p>
      <div className="hr-with-text">
        <hr />
        <span>or</span>
        <hr />
      </div>
      <GoogleButton />
      <SpotifyButton />
    </>
  );
};
const SignUp = ({ ...props }: any) => {
  return (
    <>
      <p className="form-subtitle">Welcome to the fam!</p>
      <div className="input-wrapper">
        <input
          id="name"
          placeholder="full name"
          className="input-auth"
          type="text"
          value={props.name}
          onChange={(e) => props.setName(e.target.value)}
        />
      </div>
      {props.nameError === "empty" && (
        <p className="input-error-text">Your name can't be empty</p>
      )}
      <div className="input-wrapper">
        <input
          id="email-signUp"
          className="input-auth"
          placeholder="email"
          type="text"
          value={props.email}
          onChange={(e) => props.setEmail(e.target.value)}
        />
      </div>
      {props.emailError === "empty" && (
        <p className="input-error-text">your email can't be empty</p>
      )}
      {props.emailError === "invalid" && (
        <p className="input-error-text">it must be a valid email</p>
      )}
      <div className="input-wrapper">
        <input
          id="password-signUp"
          className="input-auth"
          placeholder="password"
          type="password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
        />
      </div>
      {props.passwordError === "empty" && (
        <p className="input-error-text">your password can't be empty</p>
      )}
      {props.passwordError === "length" && (
        <p className="input-error-text">
          it must be at least 8 characters long
        </p>
      )}
      <div className="input-wrapper">
        <input
          id="confirm-password"
          className="input-auth"
          placeholder="confirm password"
          type="password"
          value={props.confirmPassword}
          onChange={(e) => props.setConfirmPassword(e.target.value)}
        />
      </div>
      {props.confirmPasswordError === "match" && (
        <p className="input-error-text">passwords don't match</p>
      )}
    </>
  );
};

function Auth() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  //Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setIsValid] = useState(false);
  //Form errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const timeout = 1000;

  const validateForm = () => {
    //login inputs
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    //signup inputs
    const nameInput = document.getElementById("name");
    const emailSignUpInput = document.getElementById("email-signUp");
    const passwordSignUpInput = document.getElementById("password-signUp");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isSignIn) {
      let formValidation = true;
      if (email === "") {
        emailInput?.classList.remove("input-valid");
        emailInput?.classList.add("input-error");
        setEmailError("empty");
        formValidation = false;
      } else if (!emailRegex.test(email)) {
        emailInput?.classList.remove("input-valid");
        emailInput?.classList.add("input-error");
        setEmailError("invalid");
        formValidation = false;
      } else {
        emailInput?.classList.remove("input-error");
        emailInput?.classList.add("input-valid");

        setEmailError("");
      }
      if (password === "") {
        passwordInput?.classList.remove("input-valid");
        passwordInput?.classList.add("input-error");

        setPasswordError("empty");
        formValidation = false;
      } else if (password.length < 8) {
        passwordInput?.classList.remove("input-valid");
        passwordInput?.classList.add("input-error");
        setPasswordError("");
        formValidation = false;
      } else {
        passwordInput?.classList.remove("input-error");
        passwordInput?.classList.add("input-valid");
        setPasswordError("");
      }
      return formValidation;
    } else {
      let formValidation = true;
      if (name === "") {
        nameInput?.classList.remove("input-valid");
        nameInput?.classList.add("input-error");
        formValidation = false;
        setNameError("empty");
      } else {
        console.log("name is valid");
        nameInput?.classList.remove("input-error");
        nameInput?.classList.add("input-valid");
        setNameError("");
      }
      if (email === "") {
        emailSignUpInput?.classList.remove("input-valid");
        emailSignUpInput?.classList.add("input-error");
        formValidation = false;
        setEmailError("empty");
      } else if (!emailRegex.test(email)) {
        emailSignUpInput?.classList.remove("input-valid");
        emailSignUpInput?.classList.add("input-error");
        setEmailError("invalid");
        formValidation = false;
      } else {
        emailSignUpInput?.classList.remove("input-error");
        emailSignUpInput?.classList.add("input-valid");
        setEmailError("");
      }
      if (password === "") {
        passwordSignUpInput?.classList.remove("input-valid");
        passwordSignUpInput?.classList.add("input-error");
        formValidation = false;
        setPasswordError("empty");
      } else if (password.length < 8) {
        passwordSignUpInput?.classList.remove("input-valid");
        passwordSignUpInput?.classList.add("input-error");
        setPasswordError("length");
        formValidation = false;
      } else {
        passwordSignUpInput?.classList.remove("input-error");
        passwordSignUpInput?.classList.add("input-valid");
        setPasswordError("");
      }
      if (confirmPassword === "") {
        confirmPasswordInput?.classList.remove("input-valid");
        confirmPasswordInput?.classList.add("input-error");
        formValidation = false;
        setConfirmPasswordError("match");
      } else if (confirmPassword !== password) {
        confirmPasswordInput?.classList.remove("input-valid");
        confirmPasswordInput?.classList.add("input-error");
        setConfirmPasswordError("match");
        formValidation = false;
      } else {
        confirmPasswordInput?.classList.remove("input-error");
        confirmPasswordInput?.classList.add("input-valid");
        setConfirmPasswordError("");
      }
      return formValidation;
    }
  };
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
      }, timeout);
      setTimeout(() => {
        window.location.href = "/id/coming-soon";
      }, 5000);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.code);
      setError(error.code);
    }
  };
  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        setIsLoading(false);
        setSuccess(true);
      }, timeout);
      setTimeout(() => {
        window.location.href = "/id/coming-soon";
      }, 5000);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setIsSubmit(true);
    setError("");

    const formValidation = validateForm();

    if (formValidation) {
      setIsLoading(true);
      setIsValid(true);
      if (isSignIn) {
        console.log("signing in");
        signIn(email, password);
      } else {
        console.log("signing up");
        signUp(email, password);
      }
    }
  };

  useEffect(() => {
    setIsSubmit(false);
    setIsValid(false);
    setEmailError("");
    setPasswordError("");
    setNameError("");
    setConfirmPasswordError("");
  }, [isSignIn]);

  useEffect(() => {
    if (isSubmit) {
      const isFormValid = validateForm();
      setIsValid(isFormValid);
    }
  }, [name, email, password, confirmPassword]);

  useEffect(() => {
    if (error === "auth/too-many-requests") {
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }, [error]);

  return (
    <div className="auth-container">
      <section className="auth-title w-50 align-end">
        <h1>tnz.ID</h1>
        <h2>united by music</h2>
      </section>
      <section className="w-50 form-container">
        <div className="sign-switch">
          <h3
            className={isSignIn ? "active" : "inactive"}
            onClick={() => setIsSignIn(true)}
          >
            sign in
          </h3>
          <span>//</span>
          <h3
            className={!isSignIn ? "active" : "inactive"}
            onClick={() => setIsSignIn(false)}
          >
            sign up
          </h3>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          {isSignIn ? (
            <SignIn
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
              emailError={emailError}
              isValid={isValid}
              isSubmit={isSubmit}
              error={error}
              setIsSignIn={setIsSignIn}
            />
          ) : (
            <SignUp
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              nameError={nameError}
              emailError={emailError}
              passwordError={passwordError}
              confirmPasswordError={confirmPasswordError}
            />
          )}
          {isSignIn ? null : (
            <div className="button-wrapper">
              <button type="submit">sign up</button>
            </div>
          )}
        </form>
      </section>
      {isLoading && (
        <div className="loading">
          {isSignIn ? (
            <>
              <p>Logging in...</p>
              <div className="loading-spinner"></div>
            </>
          ) : (
            <>
              <p>Signing up..</p>
              <div className="loading-spinner"></div>
            </>
          )}
        </div>
      )}
      {success && (
        <div className="loading success">
          <p>
            {isSignIn
              ? "Good to see you again!"
              : "Glad you decided to join us!"}
          </p>
          <p>
            Hold tight while we take you to{" "}
            {isSignIn ? "the homepage." : "your profile."}
          </p>
          <button className="success-button">Go now</button>
        </div>
      )}
    </div>
  );
}

export default Auth;
