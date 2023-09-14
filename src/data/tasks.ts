import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

export interface Task {
  title: string;
  description: string;
  done?: boolean;
  important: boolean;
  _id?: string;
  emoji: string;
  deleted?: boolean;
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
  mutation SetIsTaskDoneForOneTodo($id: ObjectId, $done: Boolean!) {
    updateOneTodo(query: { _id: $id }, set: { done: $done }) {
      user_id
    }
  }
`;

export const deleteTaskMutation = gql`
  mutation DeleteOneTodo($id: ObjectId) {
    deleteOneTodo(query: { _id: $id }) {
      user_id
    }
  }
`;

export const isTaskImportantMutation = gql`
  mutation SetIsTaskImportantForOneTodo($id: ObjectId, $important: Boolean!) {
    updateOneTodo(query: { _id: $id }, set: { important: $important }) {
      user_id
    }
  }
`;

export const createNewTodoMutation = gql`
  mutation CreateOneTodo(
    $title: String!
    $user_id: String!
    $description: String!
    $done: Boolean!
    $emoji: String!
    $important: Boolean!
  ) {
    insertOneTodo(
      data: {
        title: $title
        user_id: $user_id
        description: $description
        done: $done
        emoji: $emoji
        important: $important
      }
    ) {
      user_id
    }
  }
`;

export function addTask(addTask: Task) {}
