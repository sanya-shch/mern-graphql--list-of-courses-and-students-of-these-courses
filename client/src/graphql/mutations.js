import { gql } from 'apollo-boost';

export const deleteCourseMutation = gql`
  mutation deleteCourse($id: ID) {
    deleteCourse(id: $id) {
      id
    }
  }
`;

export const addCourseMutation = gql`
  mutation addCourse($name: String!, $code: String!) {
    addCourse(name: $name, code: $code) {
      name
    }
  }
`;

export const updatedCourseMutation = gql`
  mutation updateCourse($id: ID, $name: String!, $code: String!) {
    updateCourse(id: $id, name: $name, code: $code) {
      name
    }
  }
`;


export const deleteUserMutation = gql`
  mutation deleteUser($id: ID) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const addUserMutation = gql`
  mutation addUser($name: String!, $email: String!, $status: Boolean!, $courseId: ID) {
    addUser(name: $name, email: $email, status: $status, courseId: $courseId) {
      name
    }
  }
`;

export const updateUserMutation = gql`
  mutation updateUser($id: ID, $name: String!, $email: String!, $status: Boolean!, $courseId: ID) {
    updateUser(id: $id, name: $name, email: $email, status: $status, courseId: $courseId) {
      name
    }
  }
`;
