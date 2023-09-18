import TaskListItem from "../components/TaskListItem";
import { useCallback, useContext, useState } from "react";
import { Task, getTasks } from "../data/tasks";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonList,
  IonLoading,
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
import { ErrorsContext } from "../components/ErrorsHandlingProvider";

import AllTasksDone from "/images/all-work-done.png";
import { useRealmApp } from "../components/Realm";

// !INFO - LOADING from the apollo client ain't working! So I must do this in an inconvinient way!

const Todos: React.FC = () => {
  const { errorSetter } = useContext(ErrorsContext);
  const app = useRealmApp();
  const { tasks, error, refetch } = getTasks(app.currentUser?.id || "dasd");

  const hydrate = useCallback(() => {
    if (error) {
      errorSetter({
        error: error.message,
      });
      return;
    }

    if (!tasks || tasks.length < 1) return;
    setExpandedTask(tasks![0]?._id!);
    setExpandedTask(tasks![1]?._id!);
  }, []);

  useIonViewWillEnter(hydrate);

  const [expandedTask, setExpandedTask] = useState<string | null>(null);

  const refreshTasks = async (event: CustomEvent<RefresherEventDetail>) => {
    await refetch();
    hydrate();
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
        <IonLoading isOpen={!tasks} message="Loading..." spinner="circles" />
        {!tasks ? (
          <></>
        ) : tasks.length < 1 ? (
          <div className="tasks-done">
            <IonImg src={AllTasksDone} />
            <h1>No tasks left! Good job!</h1>
          </div>
        ) : (
          <IonList>
            {tasks!.map((task) => (
              <div
                key={task._id}
                onClick={() =>
                  setExpandedTask(expandedTask === task._id ? null : task._id!)
                }
              >
                <TaskListItem
                  isSelected={expandedTask === task._id}
                  task={task}
                />
              </div>
            ))}
          </IonList>
        )}
        <AddTask refetch={refetch} />
      </IonContent>
    </IonPage>
  );
};

export default Todos;
