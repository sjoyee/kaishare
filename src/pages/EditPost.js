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
} from "@ionic/react";

import { useState } from "react";
import Tab from "../components/Tab";

const EditPost = () => {
  //   dummy data
  const postDetails = {
    title: "Let's eat!",
    content: "I want to delivery chicken...\nSo so...\nFinally...",
    product: "ABC Chicken",
    recruitsNo: 4,
    datetime: "2022-11-27T17:00",
    place: "XYZ dormitory",
    price: 18000,
  };

  const [title, setTitle] = useState(postDetails.title);
  const [content, setContent] = useState(postDetails.content);
  const [product, setProduct] = useState(postDetails.product);
  const [recruitsNo, setRecruitsNo] = useState(postDetails.recruitsNo);
  const [datetime, setDatetime] = useState(postDetails.datetime);
  const [place, setPlace] = useState(postDetails.place);
  const [price, setPrice] = useState(postDetails.price);

  const saveEditedPost = () => {
    const post = {
      title: title,
      content: content,
      product: product,
      recruitsNo: parseInt(recruitsNo),
      datetime: datetime,
      place: place,
      price: parseInt(price),
    };
    console.log(post);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonGrid>
            <IonRow>
              <IonTitle>Edit Event Post</IonTitle>
              <IonButton type="submit" onClick={saveEditedPost} color="success">
                Save
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
                  value={title}
                  required={true}
                  onIonChange={(e) => {
                    setTitle(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>

              <IonItem>
                <IonTextarea
                  placeholder="Post Content"
                  value={content}
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
                  value={product}
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
                  value={recruitsNo}
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
                  value={datetime}
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
                  value={place}
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
                  value={price}
                  min={0}
                  required={true}
                  onIonChange={(e) => {
                    setPrice(e.detail.value);
                  }}
                ></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="fixed">State</IonLabel>
                <IonButton>Close</IonButton>
                <IonButton color="danger">Delete</IonButton>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default EditPost;
