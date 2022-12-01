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
import { car, fastFood, bagHandle } from "ionicons/icons";
import "./Home.css";
import Tab from "../components/Tab";

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

        <IonList id="boardList">
          <IonItem class="board">
            <IonIcon class="icon" slot="start" icon={car}></IonIcon>
            <IonLabel class="label">Taxi Pool</IonLabel>
          </IonItem>
          <IonItem class="board" href="./food">
            <IonIcon class="icon" slot="start" icon={fastFood}></IonIcon>
            <IonLabel class="label">Food Delivery</IonLabel>
          </IonItem>
          <IonItem class="board">
            <IonIcon class="icon" slot="start" icon={bagHandle}></IonIcon>
            <IonLabel class="label">Product Delivery</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default Home;
