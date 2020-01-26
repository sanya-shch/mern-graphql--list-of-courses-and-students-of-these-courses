import { gql } from 'apollo-boost';

export const coursesQuery = gql`
  query coursesQuery($name: String) {
    courses(name: $name){
      id
      name
      code
      users {
        name
        id
      }
    }
  }
`;

export const shortCoursesQuery = gql`
  query shortCoursesQuery($name: String) {
    courses(name: $name) {
      id
      name
    }
  }
`;


export const usersQuery = gql`
  query usersQuery($name: String) {
    users(name: $name) {
      id
      name
      email
      status
      course {
        name
        id
      }
    }
  }
`;
