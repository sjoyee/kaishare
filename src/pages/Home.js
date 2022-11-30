import React from "react";
import { IonContent, IonPage, IonItem, IonLabel, IonIcon, IonList } from "@ionic/react";
import { car, fastFood, bagHandle } from "ionicons/icons";
import "./Home.css";

const Home = () => {
  return (
    <IonPage>
      <IonContent>
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
    </IonPage>
  );
};

export default Home;
