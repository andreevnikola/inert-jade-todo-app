import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonContent,
  IonBackButton,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { UserButton } from "../components/UserButton";
import { useContext } from "react";
import { AuthContext } from "../components/Authentication";

import "./Profile.css";
import { getAuth } from "firebase/auth";

export const ProfileComponent = () => {
  const user = useContext(AuthContext);

  const logOut = () => {
    getAuth().signOut();
  };

  const deleteAcc = () => {
    getAuth().currentUser?.delete();
  };

  return (
    <IonPage id="home-page">
      <IonHeader collapse="fade">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="" defaultHref="/todos"></IonBackButton>
          </IonButtons>
          <IonTitle
            style={{
              textAlign: "left",
            }}
          >
            Profile
          </IonTitle>
          <IonButtons slot="end">
            <UserButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="user-info">
          <span>
            E-Mail: <strong>{user?.email || "not provided"}</strong>
          </span>
          <span>
            Phone number: <strong>{user?.phoneNumber || "not provided"}</strong>
          </span>
          <span>
            Display name: <strong>{user?.displayName || "not provided"}</strong>
          </span>
        </div>
        <IonButton expand="full" color={"warning"} onClick={logOut}>
          <IonIcon
            slot="start"
            name="log-out-outline"
            className="user-actions-icon"
          />
          <strong>Log Out</strong>
        </IonButton>
        <IonButton expand="full" color={"danger"} onClick={deleteAcc}>
          <IonIcon
            slot="start"
            name="trash-outline"
            className="user-actions-icon"
          />
          <strong>Delete account</strong>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
