import {
  IonButton,
  IonCol,
  IonGrid,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import serverRequest from "../common";

const CreateAccount = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(undefined);
  const [isValidPassword, setIsValidPassword] = useState(undefined);
  const [matchedPassword, setMatchedPassword] = useState(undefined);
  const [isValidPhoneNum, setIsValidPhoneNum] = useState(undefined);

  const [isTouchedEmail, setIsTouchedEmail] = useState(false);
  const [isTouchedPassword, setIsTouchedPassword] = useState(false);
  const [isTouchedConfPassword, setIsTouchedConfPassword] = useState(false);
  const [isTouchedPhoneNum, setIsTouchedPhoneNum] = useState(false);

  const validateEmailFormat = (email) => {
    return email.match(/^[a-z0-9]+@kaist\.ac\.kr$/);
  };

  const validatePasswordFormat = (pw) => {
    return pw.match(/^.{8,12}$/);
  };

  const validatePhoneNumFormat = (num) => {
    return num.match(/^[0-9]{10,11}$/);
  };

  const validateEmail = (ev) => {
    const value = ev.target.value;

    setIsValidEmail(undefined);

    value !== "" && validateEmailFormat(value) !== null
      ? setIsValidEmail(true)
      : setIsValidEmail(false);
  };

  const validatePassword = (ev) => {
    const value = ev.target.value;

    setIsValidPassword(undefined);

    value !== "" && validatePasswordFormat(value) !== null
      ? setIsValidPassword(true)
      : setIsValidPassword(false);
  };

  const validateConfirmPassword = (ev) => {
    const value = ev.target.value;

    setMatchedPassword(undefined);

    value !== "" && password === value
      ? setMatchedPassword(true)
      : setMatchedPassword(false);
  };

  const validatePhoneNumber = (ev) => {
    const value = ev.target.value;

    setIsValidPhoneNum(undefined);

    value !== "" && validatePhoneNumFormat(value) !== null
      ? setIsValidPhoneNum(true)
      : setIsValidPhoneNum(false);
  };

  const markTouchedEmail = () => {
    setIsTouchedEmail(true);
  };

  const markTouchedPassword = () => {
    setIsTouchedPassword(true);
  };

  const markTouchedConfPassword = () => {
    setIsTouchedConfPassword(true);
  };

  const markTouchedPhoneNum = () => {
    setIsTouchedPhoneNum(true);
  };

  const createAccount = () => {
    serverRequest("/signin/", "POST", {
      id: email,
      password: password,
      phone: phoneNum,
    })
      .then((r) => r.json())
      .then((r) => console.log(r))
      .then(() => history.push("/login/"));
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IonGrid>
        <IonRow style={{ justifyContent: "center" }}>
          <IonText>
            <h1>KAIShare 7800</h1>
          </IonText>
        </IonRow>
        <IonRow style={{ justifyContent: "center" }}>
          <IonCol size="10">
            <IonList class="ion-align-items-center">
              <IonItem
                fill="outline"
                class="ion-margin-top"
                className={`${isValidEmail && "ion-valid"} ${
                  isValidEmail === false && "ion-invalid"
                } ${isTouchedEmail && "ion-touched"}`}
              >
                <IonLabel position="floating">KAIST Email</IonLabel>
                <IonInput
                  placeholder="Enter your KAIST email"
                  type="email"
                  onIonInput={(event) => validateEmail(event)}
                  onIonBlur={() => markTouchedEmail()}
                  onIonChange={(e) => {
                    setEmail(e.detail.value);
                  }}
                ></IonInput>
                <IonNote slot="error">Please enter a valid email</IonNote>
              </IonItem>
              <IonItem
                fill="outline"
                class="ion-margin-top"
                className={`${isValidPassword && "ion-valid"} ${
                  isValidPassword === false && "ion-invalid"
                } ${isTouchedPassword && "ion-touched"}`}
              >
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  placeholder="Enter your password"
                  type="password"
                  onIonChange={(e) => {
                    setPassword(e.detail.value);
                  }}
                  onIonInput={(event) => validatePassword(event)}
                  onIonBlur={() => markTouchedPassword()}
                ></IonInput>
                <IonNote slot="helper">
                  Password must consist of 8 to 12 characters.
                </IonNote>
                <IonNote slot="error">Please enter a valid password.</IonNote>
              </IonItem>
              <IonItem
                fill="outline"
                class="ion-margin-top"
                className={`${matchedPassword && "ion-valid"} ${
                  matchedPassword === false && "ion-invalid"
                } ${isTouchedConfPassword && "ion-touched"}`}
              >
                <IonLabel position="floating">Confirm Password</IonLabel>
                <IonInput
                  placeholder="Re-enter your password"
                  type="password"
                  onIonInput={(event) => validateConfirmPassword(event)}
                  onIonBlur={() => markTouchedConfPassword()}
                ></IonInput>
                <IonNote slot="error">
                  Please re-enter the correct password.
                </IonNote>
              </IonItem>
              <IonItem
                fill="outline"
                class="ion-margin-top"
                className={`${isValidPhoneNum && "ion-valid"} ${
                  isValidPhoneNum === false && "ion-invalid"
                } ${isTouchedPhoneNum && "ion-touched"}`}
              >
                <IonLabel position="floating">Phone Number</IonLabel>
                <IonInput
                  type="tel"
                  placeholder="Enter your phone number"
                  onIonInput={(event) => validatePhoneNumber(event)}
                  onIonBlur={() => markTouchedPhoneNum()}
                  onIonChange={(e) => {
                    setPhoneNum(e.detail.value);
                  }}
                ></IonInput>
                <IonNote slot="helper">Enter number only.</IonNote>
                <IonNote slot="error">
                  Please enter a valid Korean phone number.
                </IonNote>
              </IonItem>
            </IonList>
            {isValidEmail === (false || undefined) ||
            isValidPassword === (false || undefined) ||
            matchedPassword === (false || undefined) ||
            isValidPhoneNum === (false || undefined) ? (
              <IonButton
                class="ion-margin-top"
                expand="block"
                color="success"
                disabled={true}
              >
                Create Account
              </IonButton>
            ) : (
              <IonButton
                class="ion-margin-top"
                expand="block"
                color="success"
                onClick={createAccount}
                // href="login"
              >
                Create Account
              </IonButton>
            )}

            <IonRow class="ion-justify-content-center">
              <IonText>
                <h6>or</h6>
              </IonText>
            </IonRow>
            <IonButton expand="block" href="/login">
              Log In
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default CreateAccount;
