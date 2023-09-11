import {
  PropsWithChildren,
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import * as auth from "firebase/auth";
import "../firebaseConfig";
import "./Authentication.css";
import { IonButton, IonIcon } from "@ionic/react";
import {
  loginViaApple,
  loginViaFacebook,
  loginViaGoogle,
} from "../firebaseConfig";
import { Device } from "@capacitor/device";

export const AuthContext = createContext<undefined | auth.User>(undefined);

export const Authentication: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [user, setUser] = useState<auth.User | undefined>(
    auth.getAuth().currentUser || undefined
  );
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

  const context = useContext(AuthContext);
  const setter = (newState: auth.User | undefined) => {
    setUser(newState);
    setUserDataLoaded(true);
  };

  let [showAppleSignIn, setShowAppleSignIn] = useState(false);

  useEffect(() => {
    //@ts-ignore
    auth.onAuthStateChanged(auth.getAuth(), setter);

    async () => {
      const device = await Device.getInfo();
      if (device.platform === "ios") {
        setShowAppleSignIn(true);
      } else {
        setShowAppleSignIn(false);
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {!user && userDataLoaded ? (
        <main className="auth-container">
          <h3>Sign In</h3>
          <div className="providers">
            <IonButton className="btn" onClick={loginViaGoogle} color="danger">
              <IonIcon className="icon" name="logo-google"></IonIcon>
              Google
            </IonButton>
            <IonButton
              className="btn"
              color="secondary"
              onClick={loginViaFacebook}
            >
              <IonIcon className="icon" name="logo-facebook"></IonIcon>
              Facebook
            </IonButton>
            {showAppleSignIn && (
              <IonButton className="btn" onClick={loginViaApple} color={"dark"}>
                <IonIcon className="icon" name="logo-apple"></IonIcon>
                Apple
              </IonButton>
            )}
          </div>
        </main>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
