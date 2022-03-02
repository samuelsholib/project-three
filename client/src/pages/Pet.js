import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import '../style/main.css';

import { QUERY_SINGLE_PET } from '../utils/queries';


const Pet = () => {
  const { petId } = useParams();

  // If there is no `petId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    QUERY_SINGLE_PET
    , { variables: { petId: petId } }

  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const pet = data?.pet || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!pet?.name) {
    return (
      <h4>
        You need to be logged in to see your profile page. Use the navigation
        links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div className="card flex-column">
      <h2 className="card-header text-center">
        {pet.name}
      </h2>
      <img className="card-body align-self-center" src={pet.image} alt={pet.name} />
      <p className="card-footer text-center description">description: {pet.description}</p>
      <p className="card-price text-center price">price: {pet.price}</p>
      <p className="card-quantity text-center quantity">quantity: {pet.quantity}</p>
    </div>
  );
};

export default Pet;
