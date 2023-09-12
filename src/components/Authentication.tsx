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
import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonText,
} from "@ionic/react";
import {
  loginViaApple,
  loginViaFacebook,
  loginViaGoogle,
  loginViaPhone,
  validatePhoneNumber,
} from "../firebaseConfig";
import { Device } from "@capacitor/device";
import {
  callOutline,
  checkboxOutline,
  logoApple,
  logoFacebook,
  logoGoogle,
} from "ionicons/icons";
import tasksImage from "/images/tasks.png";

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

  const [showAppleSignIn, setShowAppleSignIn] = useState(false);

  const [error, setError] = useState<string | undefined>(undefined);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [phoneConfirmation, setPhoneConfirmation] = useState<
    auth.ConfirmationResult | undefined
  >(undefined);
  const loginWithPhoneAndStartValidation = async () => {
    const { data: phoneConfirmation } = await loginViaPhone(phoneNumber);
    setError("captcha");
    setPhoneConfirmation(phoneConfirmation);
  };

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
        <IonContent fullscreen className="auth-holder">
          <IonImg className="background-image" src={tasksImage} alt="ToDoApp" />
          <main className="auth-container">
            <h3>Sign In</h3>
            <div id="recaptcha-container"></div>
            {error === "captcha" && (
              <IonText color="danger" className="error">
                Please fill in the reCaptcha!
              </IonText>
            )}
            <div className="providers">
              <IonInput
                labelPlacement="stacked"
                placeholder="+359896603085"
                value={phoneNumber}
                type="tel"
                disabled={!!phoneConfirmation}
                onInput={(e: any) => {
                  setPhoneNumber(e.target.value);
                }}
              >
                <div slot="label">Phone number</div>
              </IonInput>
              {phoneConfirmation && (
                <>
                  <IonInput
                    labelPlacement="stacked"
                    placeholder="123456"
                    value={verificationCode}
                    type="tel"
                    onInput={(e: any) =>
                      setVerificationCode(e.target.value || "")
                    }
                  >
                    <div slot="label">Verification code</div>
                  </IonInput>
                  {error === "validation" && (
                    <IonText color="danger" className="error">
                      This code is not correct!
                    </IonText>
                  )}
                </>
              )}
              {!phoneConfirmation ? (
                <IonButton
                  className="btn"
                  onClick={loginWithPhoneAndStartValidation}
                  color="primary"
                >
                  <IonIcon
                    slot="start"
                    className="icon"
                    icon={callOutline}
                  ></IonIcon>
                  Continue with phone
                </IonButton>
              ) : (
                <IonButton
                  className="btn"
                  onClick={async () => {
                    const validated = await validatePhoneNumber(
                      phoneConfirmation,
                      verificationCode
                    );
                    if (validated.error) setError("validation");
                  }}
                  color="primary"
                >
                  <IonIcon
                    slot="start"
                    className="icon"
                    icon={checkboxOutline}
                  ></IonIcon>
                  Validate phone
                </IonButton>
              )}
              <div className="with-provider">
                <p>Or continue with:</p>
                <IonButton
                  className="btn"
                  onClick={loginViaGoogle}
                  color="danger"
                >
                  <IonIcon
                    className="icon"
                    slot="start"
                    icon={logoGoogle}
                  ></IonIcon>
                  Google
                </IonButton>
                <IonButton
                  className="btn"
                  color="secondary"
                  onClick={loginViaFacebook}
                >
                  <IonIcon
                    slot="start"
                    className="icon"
                    icon={logoFacebook}
                  ></IonIcon>
                  Facebook
                </IonButton>
                {showAppleSignIn && (
                  <IonButton
                    className="btn"
                    onClick={loginViaApple}
                    color={"dark"}
                  >
                    <IonIcon
                      slot="start"
                      className="icon"
                      icon={logoApple}
                    ></IonIcon>
                    Apple
                  </IonButton>
                )}
              </div>
            </div>
          </main>
        </IonContent>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
