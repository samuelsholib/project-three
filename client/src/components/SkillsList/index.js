import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_FAVORITE } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const FavoritesList = ({ favorites, isLoggedInUser = false }) => {
  const [removeFavorite, { error }] = useMutation(REMOVE_FAVORITE, {
    update(cache, { data: { removeFavorite } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeFavorite },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveFavorite = async (favorite) => {
    try {
      const { data } = await removeFavorite({
        variables: { favorite },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!favorites.length) {
    return <h3>No favorites Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {favorites &&
          favorites.map((favorite) => (
            <div key={favorite} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{favorite}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveFavorite(favorite)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default FavoritesList;
