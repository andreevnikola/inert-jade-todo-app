export interface Task {
  title: string;
  description: string;
  done: boolean;
  important: boolean;
  id: string;
  emoji: string;
}

let tasks: Task[] = [
  {
    title: "Feed the dog",
    description: "The dog is hungry! Buy food for him and feed it!",
    done: true,
    important: false,
    id: "gjuieru#jkf7fsg",
    emoji: "🐕",
  },
  {
    title: "Dance with Lily",
    description:
      "Train for the dancing with her and show her your new incredible mooves!",
    done: false,
    important: false,
    id: "fjasIjfaKF34_fd5",
    emoji: "🕺",
  },
  {
    title: "Dance with Marta",
    description:
      "Train for the dancing with her and show her your new incredible mooves!",
    done: false,
    important: false,
    id: "fdasfjklSDJfk;ld54_",
    emoji: "🕺",
  },
  {
    title: "Take a shit",
    description:
      "Do not forget how impotant it is for you to POOP at least twice a day!",
    done: false,
    important: true,
    id: "fsadSfasdf_f87fads",
    emoji: "💩",
  },
];

export const getTasks = () =>
  tasks
    .sort((a, b) => (b.important ? -1 : 1))
    .sort((a, b) => (!a.done ? -1 : 1));

export const getTask = (id: string) => tasks.find((task) => task.id === id);

export const setIsTaskDone = (id: string, isDone: boolean) => {
  if (tasks.find((task) => task.id === id)) {
    tasks.find((task) => task.id === id)!.done = isDone;
    return isDone;
  }
  return !isDone;
};
