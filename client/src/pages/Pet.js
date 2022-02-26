import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


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
    <div>
      <h2 className="card-header">
        {pet.name}
      </h2>
      <img src={pet.image} alt={pet.name} />
      <p>description: {pet.description}</p>
    </div>
  );
};

export default Pet;
