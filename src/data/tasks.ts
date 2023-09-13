import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export interface Task {
  title: string;
  description: string;
  done?: boolean;
  important: boolean;
  _id?: string;
  emoji: string;
}

export const getTasks = () => {
  const { data, error, refetch } = useQuery<{ todos: Task[] }>(
    gql`
      query {
        todos {
          _id
          description
          done
          emoji
          important
          title
        }
      }
    `
  );
  let tasks;
  if (data?.todos) {
    tasks = [...data!.todos]
      .sort((a, b) => (b.important ? -1 : 1))
      .sort((a, b) => (!a.done ? -1 : 1));
  }
  return {
    tasks,
    error,
    refetch,
  };
};

export const isTaskDoneMutation = gql`
  mutation UpdateOneTodo($id: ObjectId, $done: Boolean!) {
    updateOneTodo(query: { _id: $id }, set: { done: $done }) {
      user_id
    }
  }
`;

export const setIsTaskImportant = (id: string, isImportant: boolean) => {
  return !isImportant;
};

export const deleteTask = (id: string) => {};

export function addTask(addTask: Task) {}
