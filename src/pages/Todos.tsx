import TaskListItem from "../components/TaskListItem";
import { useCallback, useState } from "react";
import { Task, getTasks } from "../data/tasks";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  RefresherEventDetail,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Todos.css";
import { UserButton } from "../components/UserButton";
import AddTask from "../components/AddTask";

const Todos: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const refetch = useCallback(() => {
    const tasks = getTasks();
    setTasks(tasks);
    setExpandedTask(tasks[0]?.id!);
    setExpandedTask(tasks[1]?.id!);
  }, []);

  useIonViewWillEnter(refetch);

  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const refreshTasks = (event: CustomEvent<RefresherEventDetail>) => {
    refetch();
    event.detail.complete();
  };

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
        <IonRefresher slot="fixed" onIonRefresh={refreshTasks}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonList>
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() =>
                setExpandedTask(expandedTask === task.id ? null : task.id!)
              }
            >
              <TaskListItem isSelected={expandedTask === task.id} task={task} />
            </div>
          ))}
        </IonList>
        <AddTask refetch={refetch} />
      </IonContent>
    </IonPage>
  );
};

export default Todos;
