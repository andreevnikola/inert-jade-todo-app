import { IonAvatar, IonButton, IonChip, IonIcon, IonLabel } from "@ionic/react";
import { useContext, useState } from "react";
import { AuthContext } from "./Authentication";
import { getAuth } from "firebase/auth";

export const UserButton = () => {
  const user = useContext(AuthContext);
  return (
    <IonButton shape="round" routerLink="/profile">
      <IonChip>
        <IonLabel>{user?.displayName || "Local user"}</IonLabel>
        <IonAvatar style={{ height: "30px", width: "30px" }}>
          <img
            src={
              getAuth().currentUser?.photoURL || "/resources/user-profile.png"
            }
            style={{ height: "30px", width: "30px" }}
          />
        </IonAvatar>
      </IonChip>
    </IonButton>
  );
};
