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
  useIonAlert,
  IonBackButton,
  IonButtons,
} from "@ionic/react";

import { useState } from "react";
import { useHistory, useParams } from "react-router";
import serverRequest from "../common";
import Tab from "../components/Tab";

const EditPost = () => {
  const { id } = useParams();

  const history = useHistory();

  serverRequest(`/post/food/${id}`, "GET")
    .then((r) => r.json())
    .then((r) => {
      if (content != "") return;
      console.log(r);
      setTitle(r.title);
      setNickname(r.nickname);
      setContent(r.content);
      setProduct(r.product);
      setCapacity(r.capacity);
      setDatetime(r.time);
      setPlace(r.place);
      setPrice(r.price);
      setStatus(r.status);
    });

  const [title, setTitle] = useState("");
  const [nickname, setNickname] = useState("");
  const [content, setContent] = useState("");
  const [product, setProduct] = useState("");
  const [capacity, setCapacity] = useState("");
  const [datetime, setDatetime] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState(0);
  const [status, setStatus] = useState("active");

  const ACTIVE = "active";
  const CLOSED = "closed";
  const DISABLED = "disabled";

  const saveEditedPost = () => {
    const post = {
      title: title,
      nickname: nickname,
      content: content,
      product: product,
      time: datetime,
      place: place,
      price: parseInt(price),
      capacity: capacity,
    };
    serverRequest(`/post/food/${id}`, "PATCH", post)
      .then((r) => r.json())
      .then((r) => console.log(r))
      .then(() => history.push(`/food/${id}`));
  };

  const closePost = () => {
    setStatus(CLOSED);
    serverRequest(`/post/food/${id}/close`, "PATCH")
      .then((r) => r.json())
      .then((r) => console.log(r))
      .then(() => history.push(`/food/${id}`));
  };

  const disablePost = () => {
    setStatus(DISABLED);
    serverRequest(`/post/food/${id}/disable`, "PATCH")
      .then((r) => r.json())
      .then((r) => console.log(r))
      .then(() => history.push("/food/"));
  };

  const deletePost = () => {
    serverRequest(`/post/food/${id}`, "DELETE")
      .then((r) => r.json())
      .then((r) => console.log(r))
      .then(() => history.push("/food/"));
  };

  const [presentAlert] = useIonAlert();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Food"></IonBackButton>
          </IonButtons>
          <IonGrid>
            <IonRow>
              <IonTitle>Edit Event Post</IonTitle>
              <IonButton
                type="submit"
                onClick={() =>
                  presentAlert({
                    header: "Are you sure you want to save the changes?",
                    buttons: [
                      {
                        text: "Cancel",
                        role: "cancel",
                      },
                      {
                        text: "OK",
                        role: "confirm",
                        handler: () => {
                          saveEditedPost();
                        },
                      },
                    ],
                  })
                }
                color="success"
              >
                SAVE
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
                <IonInput
                  placeholder="Nickname"
                  value={nickname}
                  required={true}
                  onIonChange={(e) => {
                    setNickname(e.detail.value);
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
                  value={capacity}
                  min={1}
                  required={true}
                  onIonChange={(e) => {
                    setCapacity(e.detail.value);
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
                <IonLabel position="fixed">Status</IonLabel>
                {status === CLOSED ? (
                  <IonButton
                    color="light"
                    href="/Food"
                    onClick={() => disablePost()}
                  >
                    Disable
                  </IonButton>
                ) : (
                  <IonButton
                    onClick={() =>
                      presentAlert({
                        header: "Are you sure you want to close the post?",
                        buttons: [
                          {
                            text: "Cancel",
                            role: "cancel",
                          },
                          {
                            text: "OK",
                            role: "confirm",
                            handler: () => {
                              closePost();
                            },
                          },
                        ],
                      })
                    }
                  >
                    Close
                  </IonButton>
                )}
                {status === CLOSED ? null : (
                  <IonButton
                    color="danger"
                    onClick={() =>
                      presentAlert({
                        header: "Are you sure you want to delete the post?",
                        buttons: [
                          {
                            text: "Cancel",
                            role: "cancel",
                          },
                          {
                            text: "OK",
                            role: "confirm",
                            handler: () => {
                              deletePost();
                            },
                          },
                        ],
                      })
                    }
                  >
                    Delete
                  </IonButton>
                )}
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
