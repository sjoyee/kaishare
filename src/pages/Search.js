import React, { useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonText,
} from "@ionic/react";
import "./Search.css";
import Tab from "../components/Tab";
import { useParams } from "react-router";

const Search = () => {
  const { category } = useParams();

  // dummy post list
  const Post1 = {
    writer: "William",
    title: "abc",
    id: "1",
  };
  const Post2 = {
    writer: "Kelly",
    title: "defg",
    id: "2",
  };
  const [posts, setPosts] = useState([Post1, Post2]);

  // show more post lists
  const addPosts = () => {
    const newPosts = [];
    for (let i = 0; i < 50; i++) {
      newPosts.push({
        writer: `Writer ${1 + posts.length + i}`,
        title: `Post ${1 + posts.length + i}`,
        id: 1 + posts.length + i,
      });
    }
    setPosts([...posts, ...newPosts]);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/list/${category}`}></IonBackButton>
          </IonButtons>
          <IonTitle id="board_title">Search Result</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {posts.map((post) => (
            <IonItem href="./DetailPost" key={post.id}>
              <IonText id="postWriter">{post.writer}</IonText>
              <IonText>{post.title}</IonText>
            </IonItem>
          ))}
        </IonList>
        <IonInfiniteScroll
          onIonInfinite={(e) => {
            addPosts();
            setTimeout(() => e.target.complete(), 500);
          }}
        >
          <IonInfiniteScrollContent></IonInfiniteScrollContent>
        </IonInfiniteScroll>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default Search;
