import React, {  } from 'react';
import { IonContent, IonPage, IonItem, IonLabel, IonIcon} from '@ionic/react';
import { car, fastFood, bagHandle } from 'ionicons/icons';
import './Home.css';



const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <IonItem class='board'>
          <IonIcon class="icon" slot="start" icon={car}></IonIcon>
          <IonLabel>Taxi Pool</IonLabel>
        </IonItem>
        <IonItem class='board' href="./food">
          <IonIcon class="icon" slot="start" icon={fastFood}></IonIcon>
          <IonLabel>Food Delivery</IonLabel>
        </IonItem>
        <IonItem class='board'>
          <IonIcon class="icon" slot="start" icon={bagHandle}></IonIcon>
          <IonLabel>Product Delivery</IonLabel>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Home;
