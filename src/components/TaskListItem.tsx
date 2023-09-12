import { IonItem, IonLabel, IonNote } from "@ionic/react";
import { Task } from "../data/tasks";
import "./TaskListItem.css";

interface MessageListItemProps {
  task: Task;
  isSelected: boolean;
}

const MessageListItem: React.FC<MessageListItemProps> = ({
  task,
  isSelected,
}) => {
  return (
    <IonItem detail={false}>
      <div
        slot="start"
        className={`dot ${
          !task.done
            ? task.important
              ? "dot-important"
              : "dot-notdone"
            : "dot-done"
        }`}
      >
        {task.emoji}
      </div>
      <IonLabel className="ion-text-wrap">
        {task.done ? (
          <h2>
            <s>{task.title}</s>
          </h2>
        ) : (
          <h2>{task.title}</h2>
        )}
        <p className={isSelected ? "expanded" : "collapsed"}>
          {task.description}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
