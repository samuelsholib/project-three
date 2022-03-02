import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const ADD_PET = gql`
mutation updatePet($name: String!, $description: String!, $price: Number!, quantity: Number, image: String) {
  updatePet($name: String!, $description: String!, $price: Number!, quantity: Number, image: String) {
      _id
      name
      pets
    }
  }
`;
export const UPDATE_PET = gql`
mutation updatePet($name: String!, $description: String!, $price: Number!, quantity: Number, image: String) {
  updatePet($name: String!, $description: String!, $price: Number!, quantity: Number, image: String) {
    token
    pet {
      _id
      name
    }
  }
}
`;


export const ADD_FAVORITE = gql`
  mutation addFavorite($userId: ID!, $petId: ID!) {
    addPet(userId: $userId, pet: $petID) {
      _id
      name
      favorites
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
      }
    }
  }
`;

export const REMOVE_PET = gql`
  mutation removePet($pet: ID!) {
    removePet(pet: $pet) {
      pets
    }
  }
`;

export const REMOVE_USER = gql`
  mutation removeUser($user: ID!) {
    removeUser(user: $user) {
      user
    }
  }
`;

export const REMOVE_FAVORITE = gql`
  mutation removeFavorite($userId: ID!, $petId: ID!)  {
    removeFavorite( userId: $userId, pet: $pet) {
      _id
      name
      favorites
    }
  }
`;
