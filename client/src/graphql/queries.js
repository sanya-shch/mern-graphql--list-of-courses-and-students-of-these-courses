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
