import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_FAVORITE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const FavoritesForm = ({ profileId }) => {
  const [favorite, setFavorite] = useState('');

  const [addFavorite, { error }] = useMutation(ADD_FAVORITE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = await addFavorite({
        variables: { profileId, favorite },
      });

      setFavorite('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h4>Endorse some more favorites below.</h4>

      {Auth.loggedIn() ? (
        <form
          className="flex-row justify-center justify-space-between-md align-center"
          onSubmit={handleFormSubmit}
        >
          <div className="col-12 col-lg-9">
            <input
              placeholder="Endorse some skills..."
              value={favorite}
              className="form-input w-100"
              onChange={(event) => setFavorite(event.target.value)}
            />
          </div>

          <div className="col-12 col-lg-3">
            <button className="btn btn-info btn-block py-3" type="submit">
              Endorse favorite
            </button>
          </div>
          {error && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <p>
          You need to be logged in to endorse favorite. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default FavoritesForm;
