import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteList = ({
    favorites,
    title,
    showTitle
}) => {
    console.log('object_id', favorites)

    if (!favorites.length) {
        return <h3>No Favorites Yet</h3>;
    } else {
        console.log('the list !!!!!!', favorites)
        return (
            <div>
                {showTitle && <h3>{title}</h3>}
                {favorites &&
                    favorites.map((favorite) => {
                        console.log('fav', favorite)
                        return (
                            <div className="card mb-3">
                                <h4 className="card-header bg-primary text-light p-2 m-0">{favorite.name}</h4></div>
                        )

                    })

                }

            </div>
        )
    };
};

export default FavoriteList;
