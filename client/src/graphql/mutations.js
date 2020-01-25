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
