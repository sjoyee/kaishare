import {
  IonContent,
  IonPage,
  IonCard,
  IonList,
  IonItem,
  IonLabel,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonCardContent,
  IonTextarea,
  IonInput,
  IonIcon,
  IonFab,
  IonFabButton,
  IonFabList,
} from "@ionic/react";
import { ellipsisVertical, paperPlane, trash, create } from "ionicons/icons";
import "./DetailPost.css";

import { useState } from "react";
import Tab from "../components/Tab";

const DetailPost = () => {
  // dummy post data
  const ContentPost = {
    title: "Let's eat!",
    writer: "Mr.Kim",
    content: "I want to delivery chicken...\nSo so...\nFinally...",
    product: "ABC Chicken",
    recruitsNo: 4,
    datetime: "2022-11-27T17:00",
    place: "XYZ dormitory",
    price: 18000,
    contactInfo: "kim@kaist.ac.kr",
  };
  const title = ContentPost.title;
  const writer = ContentPost.writer;
  const content = ContentPost.content;
  const product = ContentPost.product;
  const recruitsNo = ContentPost.recruitsNo;
  const datetime = ContentPost.datetime;
  const place = ContentPost.place;
  const price = ContentPost.price;
  const contactInfo = ContentPost.contactInfo;

  // dummy comment list
  const Comment1 = {
    writer: "William",
    comment:
      "Hi, everyone!ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    commentId: "1",
  };
  const Comment2 = {
    writer: "Kelly",
    comment: "Nice to meet you!",
    commentId: "2",
  };
  const commentList = [Comment1, Comment2];

  // for create new comment
  const [newComment, setNewComment] = useState([]);
  const submitNewComment = () => {
    const _newComment = {
      writer: "Elice",
      comment: newComment,
    };
    console.log(_newComment);
  };

  // for modify comment
  const [modifyComment, setModifyComment] = useState([]);
  const submitModifyComment = () => {
    const _modifyComment = {
      writer: "Elice",
      comment: modifyComment,
    };
    console.log(_modifyComment);
  };

  // for delete comment
  const [deleteComment, setDeleteComment] = useState([]);
  const submitDeleteComment = () => {
    const _deleteComment = {
      commentId: deleteComment,
    };
    console.log(_deleteComment);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonItem lines="none">
              <IonCardTitle>
                <IonInput value={title} readonly={true}></IonInput>
              </IonCardTitle>
              <IonButton slot="end" href="./EditPost">
                Edit
              </IonButton>
            </IonItem>
            <IonItem lines="none">
              <IonCardSubtitle>
                <IonInput value={writer} readonly={true}></IonInput>
              </IonCardSubtitle>
            </IonItem>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem lines="none">
                <IonTextarea
                  id="PostContent"
                  value={content}
                  readonly={true}
                  autoGrow={true}
                  rows="1"
                ></IonTextarea>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Product</b>
                </IonLabel>
                <IonInput value={product} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Time</b>
                </IonLabel>
                <IonInput value={datetime} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Place</b>
                </IonLabel>
                <IonInput value={place} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Price</b>
                </IonLabel>
                <IonInput value={price} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Participants</b>
                </IonLabel>
                <IonInput value={recruitsNo} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Contact Information</b>
                </IonLabel>
                <IonInput value={contactInfo} readonly={true}></IonInput>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonList>
              {commentList.map((comment) => (
                <IonList>
                  <IonFab vertical="top" horizontal="end">
                    <IonFabButton size="small" color="medium" id="commentMenu">
                      <IonIcon
                        icon={ellipsisVertical}
                        id="commentIcon"
                      ></IonIcon>
                    </IonFabButton>
                    <IonFabList side="start">
                      <IonFabButton size="small">
                        <IonIcon icon={create}></IonIcon>
                      </IonFabButton>
                      <IonFabButton size="small" onClick={submitDeleteComment}>
                        <IonIcon icon={trash}></IonIcon>
                      </IonFabButton>
                    </IonFabList>
                  </IonFab>
                  <h2 id="CommentWriter">{comment.writer}</h2>
                  <IonTextarea
                    value={comment.comment}
                    readonly={true}
                    autoGrow={true}
                    rows="1"
                  ></IonTextarea>
                </IonList>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonTextarea
                autoGrow={true}
                rows="1"
                onIonChange={(e) => {
                  setNewComment(e.detail.value);
                }}
              ></IonTextarea>
              <IonButton slot="end" fill="clear" onClick={submitNewComment}>
                <IonIcon icon={paperPlane}></IonIcon>
              </IonButton>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default DetailPost;
