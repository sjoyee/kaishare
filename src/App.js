import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Food from "./pages/Food";
import Search from "./pages/Search";
import WritePost from "./pages/WritePost";
import EditPost from "./pages/EditPost";
import DetailPost from "./pages/DetailPost";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      {/* <IonTabs> */}
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/writepost">
          <WritePost />
        </Route>
        <Route exact path="/editpost/:id">
          <EditPost />
        </Route>
        <Route exact path="/detailpost/:id">
          <DetailPost />
        </Route>
        <Route exact path="/food">
          <Food />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/createaccount">
          <CreateAccount />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
      </IonRouterOutlet>
      {/* <IonTabBar slot="bottom">
          <IonTabButton tab="Home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
        </IonTabBar> */}
      {/* </IonTabs> */}
    </IonReactRouter>
  </IonApp>
);

export default App;
