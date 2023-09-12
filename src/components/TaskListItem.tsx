import {
  IonCheckbox,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonNote,
} from "@ionic/react";
import {
  Task,
  deleteTask,
  getTask,
  getTasks,
  setIsTaskDone,
  setIsTaskImportant,
} from "../data/tasks";
import "./TaskListItem.css";
import { useRef, useState } from "react";
import {
  alertCircleOutline,
  arrowDownCircleOutline,
  trash,
} from "ionicons/icons";

interface MessageListItemProps {
  task: Task;
  isSelected: boolean;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  task,
  isSelected,
}) => {
  const [taskState, setTaskState] = useState<Task | null>(task);
  const slideItemRef = useRef<HTMLIonItemSlidingElement>(null);

  // console.log("===================");
  // const tasks = getTasks();
  // tasks.forEach((task) => {
  //   console.log(task.title + ": " + task.important);
  // });

  const changeIsTaskDone = (isDone: boolean) => {
    const changed = setIsTaskDone(taskState!.id, isDone);
    setTaskState({
      ...taskState,
      done: changed,
    } as any);
  };
  const deleteAndHideTask = () => {
    deleteTask(taskState!.id);
    setTaskState(null);
  };
  const makeTaskImportantAndUpdate = () => {
    slideItemRef.current!.close();
    const changed = setIsTaskImportant(taskState!.id, !taskState!.important);
    setTaskState({
      ...taskState,
      important: changed,
    } as any);
  };
  if (!taskState) return <></>;
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
