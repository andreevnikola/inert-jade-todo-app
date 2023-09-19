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
  layersOutline,
  logoApple,
  logoFacebook,
  logoGoogle,
} from "ionicons/icons";
import tasksImage from "/images/tasks.png";
import { useRealmApp } from "./Realm";
import * as Realm from "realm-web";
import { ErrorsContext } from "./ErrorsHandlingProvider";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";

export const AuthContext = createContext<undefined | auth.User>(undefined);

export const Authentication: React.FC<PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { errorSetter } = useContext(ErrorsContext);

  const [user, setUser] = useState<auth.User | undefined>(
    auth.getAuth().currentUser || undefined
  );
  const [userDataLoaded, setUserDataLoaded] = useState<boolean>(false);

  const realmApp = useRealmApp();

  const context = useContext(AuthContext);
  const setter = async (newState: auth.User | undefined) => {
    setUser(newState);
    setUserDataLoaded(true);
    if (newState) {
      const credentials = Realm.Credentials.jwt(await newState?.getIdToken()!);
      realmApp?.logIn!(credentials);
    }
  };

  const [showAppleSignIn, setShowAppleSignIn] = useState(true);

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

    const isOnAppleDevice = async () => {
      const device = await Device.getInfo();
      if (device.platform !== "android") {
        setShowAppleSignIn(true);
      } else {
        setShowAppleSignIn(false);
      }
    };
    isOnAppleDevice();
  }, []);

  const signInError = (error: string) =>
    error.includes("auth/account-exists-with-different-credential")
      ? "The E-Mail address or the Phone Number linked to this profile is already used in another profile!"
      : // : JSON.stringify(error);
        "We were not able to sign you in! Try again later!";

  const errorHandledLogin = async (
    loginFn: () => Promise<{
      user: auth.UserCredential | undefined;
      error: string | undefined;
    }>
  ) => {
    let { user, error } = await loginFn();
    if (error) {
      errorSetter({
        error: signInError(error),
      });
    }
    setter(user?.user!);
  };

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
                  onClick={() => errorHandledLogin(loginViaGoogle as any)}
                  // onClick={async () => {
                  //   let googleUser = await GoogleAuth.signIn();
                  //   setUser(googleUser as any);
                  // }}
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
                  onClick={() => errorHandledLogin(loginViaFacebook)}
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
                    onClick={() => errorHandledLogin(loginViaApple)}
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
