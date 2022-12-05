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
  IonAlert,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { fastFood, paperPlane, trash } from "ionicons/icons";
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
  const [newCommentWriter, setNewCommentWriter] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState([]);
  const submitNewComment = () => {
    const _newComment = {
      writer: newCommentWriter,
      comment: newCommentContent,
    };
    console.log(_newComment);
  };

  // for delete comment
  const [deleteCommentAlert, setDeleteCommentAlert] = useState(false);
  const [deleteComment, setDeleteComment] = useState();
  const submitDeleteComment = () => {
    const _deleteComment = {
      commentId: deleteComment,
    };
    console.log(_deleteComment);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="./Food"></IonBackButton>
          </IonButtons>
          <IonTitle id="board_title">
            <IonIcon class="icon" icon={fastFood}></IonIcon>Food Delivery
          </IonTitle>
        </IonToolbar>
      </IonHeader>

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
                <IonList key={comment.commentId}>
                  <IonFab vertical="top" horizontal="end">
                    <IonFabButton 
                      size="small" 
                      color="medium" 
                      id="commentMenu"
                      onClick={() => {
                        setDeleteCommentAlert(true);
                        setDeleteComment();
                        }}>
                      <IonAlert
                        isOpen={deleteCommentAlert}
                        onDidDismiss={() => setDeleteCommentAlert(false)}
                        header="Delete this comment"
                        message="Continue?"
                        buttons={[{
                          text: 'Cancel'
                          },
                          {text: 'Delete',
                          handler: () => {submitDeleteComment()},
                        }]}/>
                      <IonIcon
                        icon={trash}
                        id="commentIcon"
                      ></IonIcon>
                    </IonFabButton>
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
              <IonButton slot="end" fill="clear" onClick={submitNewComment}>
                <IonIcon icon={paperPlane}></IonIcon>
              </IonButton>
              <IonLabel position="floating">Nickname</IonLabel>
              <IonInput
                onIonChange={(e) => {
                  setNewCommentWriter(e.detail.value);
                  }}>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonTextarea
                autoGrow={true}
                rows="1"
                onIonChange={(e) => {
                  setNewCommentContent(e.detail.value);
                }}>
                <IonLabel position="floating">Comment</IonLabel>
              </IonTextarea>
            </IonItem>
          </IonCardContent>
        </IonCard>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default DetailPost;
