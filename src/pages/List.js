import React, { useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonIcon,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonText,
  IonSelectOption,
  IonSelect,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { bagHandle, car, fastFood, pencil, search } from "ionicons/icons";
import "./List.css";
import Tab from "../components/Tab";
import { serverRequest } from "../common";
import { useParams } from "react-router";

const List = () => {
  const modal = useRef(null);

  const { category } = useParams();

  const [posts, setPosts] = useState([]);

  const categoryIcon = (() => {
    switch (category) {
      case "food":
        return fastFood;
      case "taxi":
        return car;
      case "product":
        return bagHandle;
    }
  })();

  const categoryTitle = (() => {
    switch (category) {
      case "food":
        return "Food Delivery";
      case "taxi":
        return "Taxi Pool";
      case "product":
        return "Product Delivery";
    }
  })();

  function responseToPosts(response) {
    console.log(response);
    const newPosts = response.map((post) => {
      return {
        writer: post.nickname,
        title: post.title,
        pid: post.p_id,
      };
    });

    if (newPosts.length > posts.length) {
      setPosts(newPosts);
    }
  }

  serverRequest(`/post/${category}/`, "GET")
    .then((r) => r.json())
    .then((r) => responseToPosts(r));

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

  // for advanced search
  const [title, setTitle] = useState([]);
  const [writer, setWriter] = useState([]);
  const [content, setContent] = useState([]);
  const [product, setProduct] = useState([]);
  const [recruitsNo, setRecruitsNo] = useState([]);
  const [datetimeFrom, setDatetimeFrom] = useState([]);
  const [datetimeTo, setDatetimeTo] = useState([]);
  const [place, setPlace] = useState([]);
  const [price, setPrice] = useState([]);
  const [state, setState] = useState([]);

  const submitAdvancedSearch = () => {
    const advSearch = {
      title: title,
      writer: writer,
      content: content,
      product: product,
      recruitsNo: recruitsNo,
      datetimeFrom: datetimeFrom,
      datetimeTo: datetimeTo,
      place: place,
      price: price,
      state: state,
    };
    console.log(advSearch);
  };

  const clearAdvancedSearch = () => {
    // if popup is closed, previous inserted datas are cleared
    setTitle([]);
    setWriter([]);
    setContent([]);
    setProduct([]);
    setRecruitsNo([]);
    setDatetimeFrom([]);
    setDatetimeTo([]);
    setPlace([]);
    setPrice([]);
    setState([]);

    const advSearch = {
      title: title,
      writer: writer,
      content: content,
      product: product,
      recruitsNo: recruitsNo,
      datetimeFrom: datetimeFrom,
      datetimeTo: datetimeTo,
      place: place,
      price: price,
      state: state,
    };
    console.log(advSearch);
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle id="board_title">
            <IonIcon class="icon" icon={categoryIcon}></IonIcon>
            {categoryTitle}
          </IonTitle>
          <IonButtons slot="end">
            <IonButton id="open-search">
              <IonIcon slot="icon-only" icon={search}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList>
          {posts.map((post, index) => (
            <IonItem href={`/DetailPost/${category}/${post.pid}`} key={index}>
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

        <IonFab slot="fixed" vertical="bottom" horizontal="end" id="writePost">
          <IonFabButton color="tertiary" href={`/WritePost/${category}`}>
            <IonIcon icon={pencil}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonContent className="advanced_search">
          <IonModal id="example-modal" ref={modal} trigger="open-search">
            <IonContent>
              <IonToolbar>
                <IonTitle id="modal_title">Search</IonTitle>
                <IonButtons slot="end">
                  <IonButton
                    color="warning"
                    onClick={() => {
                      modal.current?.dismiss();
                      clearAdvancedSearch();
                    }}
                  >
                    Close
                  </IonButton>
                </IonButtons>
              </IonToolbar>

              <IonList>
                <IonItem>
                  <IonLabel position="fixed">Title</IonLabel>
                  <IonInput
                    onIonChange={(e) => {
                      setTitle(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Writer</IonLabel>
                  <IonInput
                    onIonChange={(e) => {
                      setWriter(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Content</IonLabel>
                  <IonInput
                    onIonChange={(e) => {
                      setContent(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Product</IonLabel>
                  <IonInput
                    onIonChange={(e) => {
                      setProduct(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Participants</IonLabel>
                  <IonInput
                    type="number"
                    onIonChange={(e) => {
                      setRecruitsNo(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Time (from)</IonLabel>
                  <IonInput
                    type="datetime-local"
                    onIonChange={(e) => {
                      setDatetimeFrom(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Time (to)</IonLabel>
                  <IonInput
                    type="datetime-local"
                    onIonChange={(e) => {
                      setDatetimeTo(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Place</IonLabel>
                  <IonInput
                    onIonChange={(e) => {
                      setPlace(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">Price</IonLabel>
                  <IonInput
                    type="number"
                    onIonChange={(e) => {
                      setPrice(e.detail.value);
                    }}
                  ></IonInput>
                </IonItem>

                <IonItem>
                  <IonLabel position="fixed">State</IonLabel>
                  <IonSelect
                    placeholder="Select state"
                    interface="popover"
                    onIonChange={(e) => {
                      setState(e.detail.value);
                    }}
                  >
                    <IonSelectOption value="opened">Opened</IonSelectOption>
                    <IonSelectOption value="closed">Closed</IonSelectOption>
                    <IonSelectOption value="All">All</IonSelectOption>
                  </IonSelect>
                </IonItem>
                <IonButton
                  id="modal_submit"
                  fill="solid"
                  onClick={submitAdvancedSearch}
                  href="./Search"
                >
                  Search
                </IonButton>
              </IonList>
            </IonContent>
          </IonModal>
        </IonContent>
      </IonContent>
      <Tab />
    </IonPage>
  );
};

export default List;
