import { gql } from '@apollo/client';


export const QUERY_PROFILES = gql`
  query allUsers {
    user {
      _id
      name
      pets
      favorites
    }
  }
`;
export const QUERY_PETS = gql`
  query allPets {
    pets {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      pets
      favorites
    }
  }
`;
export const QUERY_SINGLE_PET = gql`
  query singlePet($petId: ID!) {
    pet(petId: $petId) {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      pets
      favorites {
        name
      }
    }
  }
`;
