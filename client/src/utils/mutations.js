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
mutation addPet($petname: String!, $description: String!, $price: Number!, $quantity: Number!) {
  addPet(petname: $petname, description: $description, price: $price, quantity: $quantity) {
user {
_id
  name
}
      pets{
        name
      }
    }
  }
`;
export const UPDATE_PET = gql`
mutation updatePet($name: String!, $description: String!, $price: Number!, $quantity: Number!, $image: String!) {
  updatePet(name: $name, description: $description, price: $price, quantity: $quantity, image: $image) {
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
    addPet(userId: $userId, petId: $petId) {
      _id
      name
      favorites {
        _id
      name
      description
      image
      price
      quantity
      }
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
  mutation removePet($petId: ID!) {
    removePet(petId: $petId) {
      pets{
        name
      }
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
    removeFavorite( userId: $userId, petId: $petId) {
      _id
      name
      favorites {
        _id
      name
      description
      image
      price
      quantity
      }
    }
  }
`;
