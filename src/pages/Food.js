import React, { useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonSegment,
  IonSegmentButton,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/react";
import { menu, fastFood } from "ionicons/icons";
import "./Food.css";

const Food = () => {
  const modal = useRef(null);
  const [items, setItems] = useState([]);
  const generateItems = () => {
    const newItems = [];
    for (let i = 0; i < 50; i++) {
      newItems.push(`Post ${1 + items.length + i}`);
    }
    setItems([...items, ...newItems]);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="./home"></IonBackButton>
          </IonButtons>
          <IonTitle id="board_title">
            <IonIcon class="icon" icon={fastFood}></IonIcon>Food Delivery
          </IonTitle>
          <IonButtons slot="end">
            <IonButton id="open-search">
              <IonIcon slot="icon-only" icon={menu}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonSearchbar
          color="light"
          animated={true}
          placeholder="Search"
        ></IonSearchbar>
        <IonSegment value="default">
          <IonSegmentButton value="default">
            <IonLabel>Opened</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="segment">
            <IonLabel>Closed</IonLabel>
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent className="event_list">
        <IonList>
          {items.map((item, index) => (
            <IonItem key={item} href="./Tab2">
              <IonLabel>{item}</IonLabel>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(ev) => {
            generateItems();
            setTimeout(() => ev.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>

        <IonContent className="advanced_search">
          <IonModal id="example-modal" ref={modal} trigger="open-search">
            <IonContent>
              <IonToolbar>
                <IonTitle id="modal_title">Advanced Search</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    color="warning"
                    onClick={() => modal.current?.dismiss()}
                  >
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>

              <IonList>
                <IonItem>
                  <IonLabel position="fixed">Text</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Writer</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Product</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Participants</IonLabel>
                  <IonInput type="number"></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Time</IonLabel>
                  <IonInput type="datetime-local"></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Place</IonLabel>
                  <IonInput></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Price</IonLabel>
                  <IonInput type="number"></IonInput>
                </IonItem>

                <IonButton id="modal_submit" fill="solid">
                  Search
                </IonButton>
              </IonList>
            </IonContent>
          </IonModal>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Food;
