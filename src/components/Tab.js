import React from "react";
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { home } from "ionicons/icons";

const Tab = () => {
  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="Home" href="/home">
        <IonIcon icon={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default Tab;
