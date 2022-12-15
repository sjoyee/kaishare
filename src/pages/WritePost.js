import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonTextarea,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

import { useState } from "react";
import { useHistory, useParams } from "react-router";
import serverRequest from "../common";
import Tab from "../components/Tab";

const WritePost = () => {
  const { category } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [product, setProduct] = useState("");
  const [recruitsNo, setRecruitsNo] = useState("1");
  const [datetime, setDatetime] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("0");
  const [nickname, setNickname] = useState("");

  const history = useHistory();

  const submitPost = () => {
    const post = {
      title: title,
      nickname: nickname,
      content: content,
      product: product,
      capacity: parseInt(recruitsNo),
      time: datetime,
      place: place,
      price: parseInt(price),
    };
    console.log(post);

    serverRequest(`/post/${category}/`, "POST", post)
      .then((r) => r.json())
      .then((r) => console.log(r))
      .then(() => history.push(`/list/${category}`));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/list/${category}`}></IonBackButton>
          </IonButtons>
          <IonGrid>
            <IonRow>
              <IonTitle>Write Event Post</IonTitle>
              <IonButton type="submit" onClick={submitPost}>
                Post
              </IonButton>
            </IonRow>
          </IonGrid>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonInput
                  placeholder="Post Title"
                  required={true}
                  onIonChange={(e) => {
                    setTitle(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonInput
                  placeholder="Nickname"
                  required={true}
                  onIonChange={(e) => {
                    setNickname(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem counter={true}>
                <IonTextarea
                  placeholder="Post Content"
                  rows={5}
                  autoGrow={true}
                  required={true}
                  onIonChange={(e) => {
                    setContent(e.detail.value);
                  }}
                ></IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Product</IonLabel>
                <IonInput
                  type="text"
                  placeholder="Enter the product name"
                  required={true}
                  onIonChange={(e) => {
                    setProduct(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Recruits No.</IonLabel>
                <IonInput
                  type="number"
                  placeholder="1"
                  min={1}
                  required={true}
                  onIonChange={(e) => {
                    setRecruitsNo(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Date & Time</IonLabel>
                <IonInput
                  type="datetime-local"
                  required={true}
                  onIonChange={(e) => {
                    setDatetime(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Place</IonLabel>
                <IonInput
                  type="text"
                  placeholder="Enter the place"
                  required={true}
                  onIonChange={(e) => {
                    setPlace(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">Price (won)</IonLabel>
                <IonInput
                  type="number"
                  placeholder="0"
                  min={0}
                  required={true}
                  onIonChange={(e) => {
                    setPrice(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default WritePost;
