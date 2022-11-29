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
  } from "@ionic/react";
  import { paperPlane } from "ionicons/icons";
  import "./DetailPost.css";
  
  import { useState } from "react";
  
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
        contactInfo: "kim@kaist.ac.kr"
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
        comment: "Hi, everyone!ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss"
    }
    const Comment2 = {
        writer: "Kelly",
        comment: "Nice to meet you!"
    }
    const commentList = [Comment1, Comment2];

    // for save written comment
    const [comment, setComment] = useState([]);
    const saveComment = () => {
        const comment = {
            comment: comment
        };
        console.log(comment);
    };
  
    return (
      <IonPage>
        <IonContent fullscreen>
            <IonCard>
                <IonCardHeader>
                    <IonItem lines="none">
                        <IonCardTitle>
                            <IonInput
                            value={title}
                            readonly={true}
                            ></IonInput>
                        </IonCardTitle>
                        <IonButton slot="end">Edit</IonButton>
                    </IonItem>
                    <IonItem lines="none">
                        <IonCardSubtitle>
                            <IonInput
                            value={writer}
                            readonly={true}
                            ></IonInput>
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
                            rows="1"></IonTextarea>
                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel><b>Product</b></IonLabel>
                            <IonInput 
                            value={product}
                            readonly={true}></IonInput>
                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel><b>Time</b></IonLabel>
                            <IonInput 
                            value={datetime}
                            readonly={true}></IonInput>
                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel><b>Place</b></IonLabel>
                            <IonInput
                            value={place}
                            readonly={true}></IonInput>
                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel><b>Price</b></IonLabel>
                            <IonInput 
                            value={price}
                            readonly={true}></IonInput>
                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel><b>Participants</b></IonLabel>
                            <IonInput 
                            value={recruitsNo}
                            readonly={true}></IonInput>
                        </IonItem>

                        <IonItem lines="none">
                            <IonLabel><b>Contact Information</b></IonLabel>
                            <IonInput
                            value={contactInfo}
                            readonly={true}></IonInput>
                        </IonItem>
                    </IonList>
                </IonCardContent>
            </IonCard>

            <IonCard>
                <IonCardContent>
                    <IonList>
                        {commentList.map((comment) => (
                            <IonList>
                                <h2 id="CommentWriter">{comment.writer}</h2>
                                <IonTextarea 
                                    value={comment.comment}
                                    readonly={true}
                                    autoGrow={true}
                                    rows="1"></IonTextarea>
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
                            setComment(e.detail.value);
                        }}></IonTextarea>
                        <IonButton slot="end" fill="clear" onClick={saveComment}>
                            <IonIcon icon={paperPlane}></IonIcon>
                        </IonButton>
                    </IonItem>
                </IonCardContent>
            </IonCard>
        </IonContent>
      </IonPage>
    );
  };
  
  export default DetailPost;
  