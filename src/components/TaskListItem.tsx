import {
  IonCheckbox,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
} from "@ionic/react";
import {
  Task,
  deleteTaskMutation,
  isTaskDoneMutation,
  isTaskImportantMutation,
} from "../data/tasks";
import "./TaskListItem.css";
import { useContext, useEffect, useRef, useState } from "react";
import {
  alertCircleOutline,
  arrowDownCircleOutline,
  trash,
} from "ionicons/icons";
import { useMutation } from "@apollo/client";
import { ErrorsContext } from "./ErrorsHandlingProvider";

interface MessageListItemProps {
  task: Task;
  isSelected: boolean;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  task,
  isSelected,
}) => {
  const [taskState, setTaskState] = useState<Task | null>(task);
  const { errorSetter } = useContext(ErrorsContext);
  const slideItemRef = useRef<HTMLIonItemSlidingElement>(null);

  const [setIsTaskDone, { error: setIsTaskDoneError }] = useMutation<{
    todos: Task[];
  }>(isTaskDoneMutation, {
    variables: { id: taskState!._id, done: !taskState!.done },
  });

  const [deleteTask, { error: deleteTaskError }] = useMutation<{
    todos: Task[];
  }>(deleteTaskMutation, {
    variables: { id: taskState!._id! },
  });

  const [setIsTaskImportant, { error: setIsTaskImportantError }] = useMutation<{
    todos: Task[];
  }>(isTaskImportantMutation, {
    variables: { id: taskState!._id!, important: !taskState!.important },
  });

  const changeIsTaskDone = (isDone: boolean) => {
    setIsTaskDone();
    setTaskState({
      ...taskState,
      done: isDone,
    } as any);
  };
  const deleteAndHideTask = () => {
    deleteTask();
    setTaskState({
      ...taskState,
      deleted: true,
    } as any);
  };
  const makeTaskImportantAndUpdate = () => {
    slideItemRef.current!.close();
    setIsTaskImportant();
    setTaskState({
      ...taskState,
      important: !taskState!.important,
    } as Task);
  };

  useEffect(() => {
    if (setIsTaskDoneError) {
      errorSetter({
        error: setIsTaskDoneError.message,
      });
      setTaskState({
        ...taskState,
        done: !taskState!.done,
      } as Task);
    }

    if (deleteTaskError) {
      errorSetter({
        error: deleteTaskError.message,
      });
      setTaskState({
        ...taskState,
        deleted: false,
      } as Task);
    }

    if (setIsTaskImportantError) {
      errorSetter({
        error: setIsTaskImportantError.message,
      });
      setTaskState({
        ...taskState,
        important: !taskState!.important,
      } as Task);
    }
  }, [setIsTaskDoneError]);

  if (taskState?.deleted || !taskState) return <></>;
  return (
    <IonItemSliding ref={slideItemRef}>
      <IonItem detail={false}>
        <div
          slot="start"
          className={`dot ${
            !taskState.done
              ? taskState.important
                ? "dot-important"
                : "dot-notdone"
              : "dot-done"
          }`}
        >
          {taskState.emoji}
        </div>
        <IonLabel className="ion-text-wrap">
          {taskState.done ? (
            <h2>
              <s>{taskState.title}</s>
            </h2>
          ) : (
            <h2>{taskState.title}</h2>
          )}
          <p className={isSelected ? "expanded" : "collapsed"}>
            {taskState.description}
          </p>
        </IonLabel>
        <IonItem className="is-done-holder">
          <IonCheckbox
            checked={taskState.done}
            onIonChange={(e) => changeIsTaskDone(e.detail.checked)}
          />
        </IonItem>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="warning" onClick={makeTaskImportantAndUpdate}>
          {task.important ? (
            <IonIcon className="action-icon" icon={arrowDownCircleOutline} />
          ) : (
            <IonIcon className="action-icon" icon={alertCircleOutline} />
          )}
        </IonItemOption>
        <IonItemOption color="danger" onClick={deleteAndHideTask}>
          <IonIcon className="action-icon" icon={trash} />
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default MessageListItem;
