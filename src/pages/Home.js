import React from "react";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonIcon,
  IonList,
  IonButton,
  IonRow,
  IonGrid,
} from "@ionic/react";
import "./Home.css";
import Tab from "../components/Tab";
import { categoryIcon, categoryTitle } from "../common";

const Home = () => {
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow style={{ justifyContent: "right" }}>
            <IonButton fill="clear" href="/login">
              Logout
            </IonButton>
          </IonRow>
        </IonGrid>

        <IonList id="boardList" lines="full">
          <IonItem class="board" href="./list/taxi">
            <IonIcon
              class="icon"
              slot="start"
              icon={categoryIcon("taxi")}
            ></IonIcon>
            <IonLabel class="label">{categoryTitle("taxi")}</IonLabel>
          </IonItem>
          <IonItem class="board" href="./list/food">
            <IonIcon
              class="icon"
              slot="start"
              icon={categoryIcon("food")}
            ></IonIcon>
            <IonLabel class="label">{categoryTitle("food")}</IonLabel>
          </IonItem>
          <IonItem class="board" href="./list/product">
            <IonIcon
              class="icon"
              slot="start"
              icon={categoryIcon("product")}
            ></IonIcon>
            <IonLabel class="label">{categoryTitle("product")}</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default Home;
