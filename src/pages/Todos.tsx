import TaskListItem from "../components/TaskListItem";
import { useState } from "react";
import { Task, getTasks } from "../data/tasks";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Todos.css";
import { UserButton } from "../components/UserButton";

const Todos: React.FC = () => {
  const [tasks, setMessages] = useState<Task[]>([]);

  useIonViewWillEnter(() => {
    const tasks = getTasks();
    setMessages(tasks);
  });

  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  return (
    <IonPage id="home-page">
      <IonHeader collapse="fade" translucent={true}>
        <IonToolbar>
          <IonTitle
            style={{
              textAlign: "left",
              width: "100%",
              paddingLeft: "30px",
            }}
          >
            Todo 's
          </IonTitle>
          <IonButtons slot="end">
            <UserButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" className="collapsableHeader">
          <IonToolbar>
            <IonTitle size="large">Todo 's</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher> */}

        <IonList>
          {tasks.map((task) => (
            <div key={task.id} onClick={() => setExpandedTask(task.id)}>
              <TaskListItem isSelected={expandedTask === task.id} task={task} />
            </div>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Todos;
