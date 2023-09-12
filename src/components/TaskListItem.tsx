import { IonCheckbox, IonItem, IonLabel, IonNote } from "@ionic/react";
import { Task, getTask, setIsTaskDone } from "../data/tasks";
import "./TaskListItem.css";
import { useState } from "react";

interface MessageListItemProps {
  task: Task;
  isSelected: boolean;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  task,
  isSelected,
}) => {
  const [taskState, setTaskState] = useState(task);
  const changeIsTaskDone = (isDone: boolean) => {
    setIsTaskDone(taskState.id, isDone);
    setTaskState({
      ...taskState,
      done: isDone,
    });
  };
  return (
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
  );
};

export default MessageListItem;
