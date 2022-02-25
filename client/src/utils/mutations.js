import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_PET = gql`
  mutation addPet($userId: ID!, $petId: ID!) {
    addPet(userId: $userId, pet: $petID) {
      _id
      name
      pets
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_PET = gql`
  mutation removePet($pet: ID!) {
    removePet(pet: $pet) {
      _id
      name
      pets
    }
  }
`;
