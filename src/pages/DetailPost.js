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
  IonHeader,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonToolbar,
  IonPopover,
  useIonToast,
} from "@ionic/react";
import { fastFood, paperPlane } from "ionicons/icons";
import "./DetailPost.css";

import { useState } from "react";
import Tab from "../components/Tab";
import serverRequest from "../common";
import { useParams } from "react-router";

const placeHolder = {
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

const DetailPost = () => {
  const { id } = useParams();

  serverRequest("/login/", "POST", {
    id: "test@kaist.ac.kr",
    password: "test",
  })
    .then()
    .then();

  const [post, setPost] = useState(placeHolder);
  const [comments, setComments] = useState([]);

  serverRequest(`/post/food/${id}`, "GET")
    .then((r) => r.json())
    .then((r) => {
      if (post != placeHolder) return;
      console.log(r);

      const newPost = {
        title: r.title,
        writer: r.nickname,
        content: r.content,
        product: r.product,
        recruitsNo: r.capacity,
        datetime: r.time,
        place: r.place,
        price: r.price,
        contactInfo: "fixme",
      };
      setPost(newPost);

      const newComments = r.comments.map((comment) => {
        return {
          writer: comment.nickname,
          content: comment.content,
        };
      });

      setComments(newComments);
    });

  // for create new comment
  const [newCommentWriter, setNewCommentWriter] = useState([]);
  const [newCommentContent, setNewCommentContent] = useState([]);
  const submitNewComment = () => {
    serverRequest(`/post/food/${id}/comment`, "POST", {
      nickname: newCommentWriter,
      content: newCommentContent,
    }).then(() => {
      console.log("comment sent");
      window.location.reload();
    });
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

  const [presentToast] = useIonToast();
  const [handlerMessage, setHandlerMessage] = useState("");
  const [roleMessage, setRoleMessage] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/Food"></IonBackButton>
          </IonButtons>
          <IonTitle id="board_title">
            <IonIcon class="icon" icon={fastFood}></IonIcon>Food Delivery
          </IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                presentToast({
                  message: "Participate:",
                  duration: 5000,
                  buttons: [
                    {
                      text: "Join",
                      // handler: () => { setHandlerMessage('More Info clicked'); }
                    },
                    {
                      text: "Leave",
                      // handler: () => { setHandlerMessage('Dismiss clicked'); }
                    },
                  ],
                });
              }}
            >
              Join
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonItem lines="none">
              <IonCardTitle>
                <IonInput value={post.title} readonly={true}></IonInput>
              </IonCardTitle>
              <IonButton slot="end" href="/EditPost">
                Edit
              </IonButton>
            </IonItem>
            <IonItem lines="none">
              <IonCardSubtitle>
                <IonInput value={post.writer} readonly={true}></IonInput>
              </IonCardSubtitle>
            </IonItem>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem lines="none">
                <IonTextarea
                  id="PostContent"
                  value={post.content}
                  readonly={true}
                  autoGrow={true}
                  rows="1"
                ></IonTextarea>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Product</b>
                </IonLabel>
                <IonInput value={post.product} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Time</b>
                </IonLabel>
                <IonInput value={post.datetime} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Place</b>
                </IonLabel>
                <IonInput value={post.place} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Price</b>
                </IonLabel>
                <IonInput value={post.price} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Participants</b>
                </IonLabel>
                <IonInput value={post.recruitsNo} readonly={true}></IonInput>
              </IonItem>

              <IonItem lines="none">
                <IonLabel>
                  <b>Contact Information</b>
                </IonLabel>
                <IonButton id="click-trigger" slot="end">
                  Check info
                </IonButton>
                <IonPopover trigger="click-trigger" triggerAction="click">
                  <IonInput value={post.contactInfo} readonly={true}></IonInput>
                </IonPopover>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardContent>
            <IonList>
              {comments.map((comment, index) => (
                <IonList key={index}>
                  <h2 id="CommentWriter">{comment.writer}</h2>
                  <IonTextarea
                    value={comment.content}
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
                }}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonTextarea
                autoGrow={true}
                rows="1"
                onIonChange={(e) => {
                  setNewCommentContent(e.detail.value);
                }}
              >
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
