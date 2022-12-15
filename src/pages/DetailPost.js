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
import { paperPlane } from "ionicons/icons";
import "./DetailPost.css";

import { useState } from "react";
import Tab from "../components/Tab";
import { categoryIcon, categoryTitle, serverRequest } from "../common";
import { useParams } from "react-router";

const placeHolder = {
  title: "",
  writer: "",
  content: "",
  product: "",
  recruitsNo: 1,
  joins: 1,
  datetime: "",
  place: "",
  price: 1,
  status: "active",
  joined: false,
  poster: false,
};

const DetailPost = () => {
  const { category, id } = useParams();

  const [post, setPost] = useState(placeHolder);
  const [comments, setComments] = useState([]);
  const [contactMessage, setContactMessage] = useState(
    "cannot find contact info"
  );

  serverRequest(`/post/${category}/${id}`, "GET")
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
        joins: r.joins,
        datetime: r.time,
        place: r.place,
        price: r.price,
        status: r.status,
        joined: r.joined,
        poster: r.poster,
      };
      setPost(newPost);

      if (r.status == "closed") onClickContact();

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
    serverRequest(`/post/${category}/${id}/comment`, "POST", {
      nickname: newCommentWriter,
      content: newCommentContent,
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        window.location.reload();
      });
  };

  function onClickJoin() {
    serverRequest(`/post/${category}/${id}/join`, "POST")
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        window.location.reload();
      });
  }

  function onClickLeave() {
    serverRequest(`/post/${category}/${id}/leave`, "POST")
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        window.location.reload();
      });
  }

  function onClickContact() {
    serverRequest(`/post/${category}/${id}/share`, "GET")
      .then((r) => r.json())
      .then((r) => {
        if (r == "Only closed event can see the information.")
          setContactMessage(r);
        else {
          setContactMessage(
            r.map((contact) => {
              return `${contact.id} : ${contact.phone}  \n`;
            })
          );
        }
      });
  }

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
            <IonBackButton defaultHref={`/list/${category}`}></IonBackButton>
          </IonButtons>
          <IonTitle id="board_title">
            <IonIcon class="icon" icon={categoryIcon(category)}></IonIcon>
            {categoryTitle(category)}
          </IonTitle>

          <IonButtons slot="end"></IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonItem lines="none">
              <IonCardTitle>
                <IonInput value={post.title} readonly={true}></IonInput>
              </IonCardTitle>
              {post.poster && post.status == "active" ? (
                <IonButton slot="end" href={`/EditPost/${category}/${id}`}>
                  Edit
                </IonButton>
              ) : null}
              {!post.poster && !post.joined ? (
                <IonButton slot="end" onClick={onClickJoin}>
                  Join
                </IonButton>
              ) : null}
              {!post.poster && post.joined ? (
                <IonButton slot="end" onClick={onClickLeave}>
                  Leave
                </IonButton>
              ) : null}
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
                <IonInput
                  value={`${post.joins} / ${post.recruitsNo}`}
                  readonly={true}
                ></IonInput>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>
                  <b>Contact Information</b>
                </IonLabel>
                <IonInput value={post.status} readonly={true}></IonInput>
                {(post.joined || post.poster) && post.status == "closed" ? (
                  <>
                    <IonButton id="click-trigger" slot="end">
                      Check Contact Info
                    </IonButton>
                    <IonPopover trigger="click-trigger" triggerAction="click">
                      <IonContent>{contactMessage}</IonContent>
                    </IonPopover>
                  </>
                ) : null}
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
