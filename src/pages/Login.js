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
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(undefined);
  const [isValidPassword, setIsValidPassword] = useState(undefined);

  const validateEmailFormat = (email) => {
    return email.match(/^[a-z0-9]+@kaist\.ac\.kr$/);
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

    value !== "" ? setIsValidPassword(true) : setIsValidPassword(false);
  };

  const login = () => {
    console.log({
      email: email,
      password: password,
    });
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
                } `}
              >
                <IonLabel position="floating">KAIST Email</IonLabel>
                <IonInput
                  placeholder="Enter your KAIST email"
                  type="email"
                  onIonInput={(event) => validateEmail(event)}
                  onIonChange={(e) => {
                    setEmail(e.detail.value);
                  }}
                ></IonInput>
                <IonNote slot="error">Please enter a valid KAIST email</IonNote>
              </IonItem>
              <IonItem
                fill="outline"
                class="ion-margin-top"
                className={`${isValidPassword && "ion-valid"} ${
                  isValidPassword === false && "ion-invalid"
                } `}
              >
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  placeholder="Enter your password"
                  type="password"
                  onIonChange={(e) => {
                    setPassword(e.detail.value);
                  }}
                  onIonInput={(event) => validatePassword(event)}
                ></IonInput>
              </IonItem>
            </IonList>
            <IonRow>
              <IonText>
                <p>Forgot your password?</p>
              </IonText>
            </IonRow>
            {isValidEmail === (false || undefined) ||
            isValidPassword === (false || undefined) ? (
              <IonButton expand="block" disabled="true">
                Log In
              </IonButton>
            ) : (
              <IonButton expand="block" onClick={login} href="/home">
                Log In
              </IonButton>
            )}

            <IonRow class="ion-justify-content-center">
              <IonText>
                <h6>or</h6>
              </IonText>
            </IonRow>
            <IonButton color="success" expand="block" href="/createaccount">
              Create Account
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default Login;
