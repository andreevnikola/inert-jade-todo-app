import { useRef, useState } from "react";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonModal,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { OverlayEventDetail } from "@ionic/core";
import "./AddTask.css";
import { Task, addTask } from "../data/tasks";

const AddToDoModal = ({
  onDismiss,
}: {
  onDismiss: (data?: Task | null, role?: string) => void;
}) => {
  const title = useRef<HTMLIonInputElement>(null);
  const emoji = useRef<HTMLIonInputElement>(null);
  const description = useRef<HTMLIonTextareaElement>(null);
  const important = useRef<HTMLIonCheckboxElement>(null);
  const [errors, setErrors] = useState(new Map());
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton color="danger" onClick={() => onDismiss(null, "cancel")}>
              Discard
            </IonButton>
          </IonButtons>
          <IonTitle>New Todo</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() => {
                let errors: Array<[string, true]> = [];
                if (
                  !title.current ||
                  (title.current!.value as string).length < 1
                )
                  errors.push(["title", true]);
                if (
                  !emoji.current ||
                  [...(emoji.current!.value as string)].length !== 1
                )
                  errors.push(["emoji", true]);
                setErrors(new Map(errors));
                if (errors.length > 0) return;
                return onDismiss(
                  {
                    title: title.current?.value! as string,
                    description: description.current?.value!,
                    emoji: emoji.current?.value! as string,
                    important: important.current?.checked!,
                  },
                  "add"
                );
              }}
              strong={true}
            >
              Add
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="modal">
          <div className="cluster">
            <IonInput
              className={`ion-touched ${
                errors.has("emoji") ? "ion-invalid" : ""
              }`}
              ref={emoji}
              labelPlacement="stacked"
              label="Emoji"
              placeholder="🐕"
              errorText="Choose 1 emoji"
            />
            <IonInput
              className={`ion-touched ${
                errors.has("title") ? "ion-invalid" : ""
              }`}
              ref={title}
              labelPlacement="stacked"
              label="Enter a title for the Todo:"
              placeholder="Feed the dog"
              errorText="Title is required"
            />
          </div>
          <IonTextarea
            ref={description}
            label="Enter a description for the Todo:"
            placeholder="Get the dog food from the cabinet and place 250gm in the dog's bowl!"
            labelPlacement="stacked"
          />
          <IonItem lines="inset" color="transparent">
            <IonCheckbox
              ref={important}
              justify="space-between"
              color="warning"
            >
              Is this task really important?
            </IonCheckbox>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default function AddTask({
  refetch = () => {},
}: {
  refetch: () => void;
}) {
  const [present, dismiss] = useIonModal(AddToDoModal, {
    onDismiss: (data: string, role: string) => dismiss(data, role),
  });
  function openModal() {
    present({
      onWillDismiss: (ev: CustomEvent<OverlayEventDetail>) => {
        if (ev.detail.role === "add") {
          addTask(ev.detail.data);
          refetch();
        }
      },
    });
  }

  return (
    <>
      <IonFab slot="fixed" horizontal="end" vertical="bottom">
        <IonFabButton onClick={() => openModal()}>
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
    </>
  );
}
