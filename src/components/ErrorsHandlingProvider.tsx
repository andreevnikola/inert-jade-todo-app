import { IonAlert } from "@ionic/react";
import { createContext, useState } from "react";

interface IError {
  shortDescription?: string;
  error?: string;
}

export const ErrorsContext = createContext<{
  error: IError | null;
  errorSetter: (error: IError) => void;
}>({
  error: null,
  errorSetter: ({}) => {},
});
export default function ErrorsHandlingProvider({
  children,
}: {
  children: JSX.Element;
}) {
  const [error, setError] = useState<IError | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const setter = (error: IError) => {
    setIsOpen(true);
    setError(error);
  };
  return (
    <ErrorsContext.Provider
      value={{
        error: error,
        errorSetter: setter,
      }}
    >
      {error ? (
        <IonAlert
          isOpen={isOpen}
          header="An Error Has Occurred!"
          subHeader={error?.shortDescription}
          message={error?.error}
          buttons={["OK"]}
          onDidDismiss={() => setIsOpen(false)}
        />
      ) : (
        <></>
      )}
      {children}
    </ErrorsContext.Provider>
  );
}
