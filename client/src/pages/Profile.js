import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import FavoriteList from '../components/FavoriteList';

const Profile = () => {
    const { userId } = useParams();

    const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
        variables: { userId: userId },
    });

    const user = data?.me || data?.user || {};
    console.log("who is logged in $$$$$$$$$$$", user)
    console.log('datsa me', data?.me)
    // redirect to personal profile page if username is yours
    // if (Auth.loggedIn() && Auth.getProfile().data._id === user._id) {
    //     console.log('its the user!!!', user)
    //     return <Redirect to="/me" />;
    // }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?._id) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    console.log('USER FAVS in profules', user)
    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
                    Viewing {userId ? `${user.name}'s` : `your`} profile.
                </h2>
                <div className="col-12 col-md-10 mb-5">
                </div>
                {!userId && (
                    <div
                        className="col-12 col-md-10 mb-3 p-3"
                        style={{ border: '1px dotted #1a1a1a' }}
                    >
                        <FavoriteList showTitle={true} favorites={user.favorites}
                            title={`${user.name}'s Favorite Pets!`} />
                    </div>
                )}
            </div>
        </div >
    );
};

export default Profile;