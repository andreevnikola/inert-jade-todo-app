import {
  IonAvatar,
  IonButton,
  IonChip,
  IonIcon,
  IonImg,
  IonLabel,
} from "@ionic/react";
import { useContext, useState } from "react";
import { AuthContext } from "./Authentication";
import { getAuth } from "firebase/auth";
import defaultProfilePicture from "/images/user-profile.png";

export const UserButton = () => {
  const user = useContext(AuthContext);
  return (
    <IonButton shape="round" routerLink="/profile">
      <IonChip>
        <IonLabel>
          {user?.displayName || user?.phoneNumber || "Local user"}
        </IonLabel>
        <IonAvatar style={{ height: "30px", width: "30px" }}>
          <IonImg
            src={getAuth().currentUser?.photoURL || defaultProfilePicture}
            style={{ height: "30px", width: "30px" }}
          />
        </IonAvatar>
      </IonChip>
    </IonButton>
  );
};
