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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonText,
  IonSelectOption,
  IonSelect,
  IonFab,
  IonFabButton,
} from "@ionic/react";
import { fastFood, filterOutline, pencil, search } from "ionicons/icons";
import "./Food.css";
import Tab from "../components/Tab";

const Food = () => {
  const modal = useRef(null);

  // dummy post list
  const Post1 = {
    writer: "William",
    title: "abc",
    id: "1"
  };
  const Post2 = {
    writer: "Kelly",
    title: "defg",
    id: "2"
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

  // for normal search
  const [normalSearch, setNormalSearch] = useState([]);

  const submitNormalSearch = () => {
    const _normalSearch = {
      content: normalSearch,
    };
    console.log(_normalSearch);
  };

  // for advanced search
  const [title, setTitle] = useState([]);
  const [writer, setWriter] = useState([]);
  const [content, setContent] = useState([]);
  const [product, setProduct] = useState([]);
  const [recruitsNo, setRecruitsNo] = useState([]);
  const [datetime, setDatetime] = useState([]);
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
      datetime: datetime,
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
    setDatetime([]);
    setPlace([]);
    setPrice([]);
    setState([]);

    const advSearch = {
      title: title,
      writer: writer,
      content: content,
      product: product,
      recruitsNo: recruitsNo,
      datetime: datetime,
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
            <IonBackButton defaultHref="./home"></IonBackButton>
          </IonButtons>
          <IonTitle id="board_title">
            <IonIcon class="icon" icon={fastFood}></IonIcon>Food Delivery
          </IonTitle>
          <IonButtons slot="end">
            <IonButton id="open-search">
              <IonIcon slot="icon-only" icon={filterOutline}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>

        <IonItem>
          <IonInput 
            placeholder="Search"
            onIonChange={(e) => {
              setNormalSearch(e.detail.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") submitNormalSearch();
            }}>
          </IonInput>
          <IonButton fill="clear" onClick={submitNormalSearch} href="./Search">
            <IonIcon icon={search} slot="icon-only"></IonIcon>
          </IonButton>
        </IonItem>
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

        <IonFab slot="fixed" vertical="bottom" horizontal="end" id="writePost">
          <IonFabButton color="tertiary" href="./WritePost">
            <IonIcon icon={pencil}></IonIcon>
          </IonFabButton>
        </IonFab>
        <IonContent className="advanced_search">
          <IonModal id="example-modal" ref={modal} trigger="open-search">
            <IonContent>
              <IonToolbar>
                <IonTitle id="modal_title">Advanced Search</IonTitle>
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
                  <IonLabel position="fixed">Time</IonLabel>
                  <IonInput
                    type="datetime-local"
                    onIonChange={(e) => {
                      setDatetime(e.detail.value);
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

export default Food;
