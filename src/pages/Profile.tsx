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
  IonAlert,
} from "@ionic/react";
import { UserButton } from "../components/UserButton";
import { useContext, useState } from "react";
import { AuthContext } from "../components/Authentication";

import "./Profile.css";
import { getAuth } from "firebase/auth";
import { useRealmApp } from "../components/Realm";
import { useMutation } from "@apollo/client";
import { deleteAllTodosForUser } from "../data/tasks";
import { signOut } from "../firebaseConfig";
import { ErrorsContext } from "../components/ErrorsHandlingProvider";

export const ProfileComponent = () => {
  const user = useContext(AuthContext);

  const [
    isReassuringDeletingAccountOpened,
    setIsReassuringDeletingAccountOpened,
  ] = useState(false);

  const realmApp = useRealmApp();
  const [deleteAllTasksForCurrentUser, {}] = useMutation(
    deleteAllTodosForUser,
    {
      variables: {
        user_id: realmApp?.currentUser?.id!,
      },
    }
  );
  const { errorSetter } = useContext(ErrorsContext);
  const deleteAcc = async () => {
    try {
      await getAuth().currentUser?.delete();
      await deleteAllTasksForCurrentUser();
      setIsReassuringDeletingAccountOpened(false);
    } catch (error: any) {
      errorSetter({
        shortDescription: "Unable to delete account",
        error: `We were not able to delete your account. ${
          error.message.startsWith("Firebase: Error")
            ? "It is due to security reasons. Please SignIn again so we are able to Identify you."
            : "Please try again later. If the problem persists, please contact us."
        }`,
      });
    }
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
        <IonAlert
          isOpen={isReassuringDeletingAccountOpened}
          header="Delete Account?"
          subHeader="This is permanent!"
          message="Your account data and all of your tasks will be deleted from our servers. This data cannot be restored!"
          buttons={[
            {
              text: "Cancel",
              role: "cancel",
              handler: () => setIsReassuringDeletingAccountOpened(false),
            },
            {
              text: "Delete",
              role: "confirm",
              handler: deleteAcc,
            },
          ]}
          onDidDismiss={() => setIsReassuringDeletingAccountOpened(false)}
        />
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
        <IonButton expand="full" color={"warning"} onClick={signOut}>
          <IonIcon
            slot="start"
            name="log-out-outline"
            className="user-actions-icon"
          />
          <strong>Log Out</strong>
        </IonButton>
        <IonButton
          expand="full"
          color={"danger"}
          onClick={() => setIsReassuringDeletingAccountOpened(true)}
        >
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
