import { PropsWithChildren, createContext, useState, useEffect } from "react";
import * as auth from "firebase/auth";
import "../firebaseConfig";
import "./Authentication.css";
import { IonButton, IonIcon } from "@ionic/react";
import { loginViaApple, loginViaGoogle } from "../firebaseConfig";
import { Device } from "@capacitor/device";

export const AuthContext = createContext<{
  user: undefined | auth.User;
  setter: (newState: auth.User | undefined) => void;
}>({ user: undefined, setter: () => {} });

export const Authentication: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [user, setUser] = useState<auth.User | undefined>(
    auth.getAuth().currentUser || undefined
  );
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

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

  if (!user && userDataLoaded)
    return (
      <AuthContext.Provider value={{ user: user, setter: setter }}>
        <main className="auth-container">
          <h3>Sign In</h3>
          <div className="providers">
            <IonButton className="btn" onClick={loginViaGoogle}>
              <IonIcon className="icon" name="logo-google"></IonIcon>
              Google
            </IonButton>
            {showAppleSignIn && (
              <IonButton className="btn" onClick={loginViaApple} color={"dark"}>
                <IonIcon className="icon" name="logo-apple"></IonIcon>
                Apple
              </IonButton>
            )}
          </div>
        </main>
      </AuthContext.Provider>
    );
  return children;
};
