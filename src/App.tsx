import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

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
import { Authentication } from "./components/Authentication";
import { ProfileComponent } from "./pages/Profile";
import Todos from "./pages/Todos";
import { RealmAppProvider } from "./components/Realm";
import RealmApolloProvider from "./data/RealmApolloProvider";
import ErrorsHandlingProvider from "./components/ErrorsHandlingProvider";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <ErrorsHandlingProvider>
      <RealmAppProvider appId="inertjadetodoapp-oplmb">
        <RealmApolloProvider>
          <Authentication>
            <IonReactRouter>
              <IonRouterOutlet>
                <Route path="/" exact={true}>
                  <Redirect to="/todos" />
                </Route>
                <Route path="/todos" exact={true}>
                  <Todos />
                </Route>
                <Route path="/profile">
                  <ProfileComponent />
                </Route>
              </IonRouterOutlet>
            </IonReactRouter>
          </Authentication>
        </RealmApolloProvider>
      </RealmAppProvider>
    </ErrorsHandlingProvider>
  </IonApp>
);

export default App;
