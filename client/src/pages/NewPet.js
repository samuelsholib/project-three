import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Redirect, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_PET } from '../utils/mutations';
//import style from '../style/main.css'
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const NewPet = () => {
  const [formState, setFormState] = useState({
    petname: '',
    description: '',
    price: '',
    quantity: ''
  });
  const { userId } = useParams();
  const [addPet, { error }] = useMutation(ADD_PET);
  const { loading, data } = useQuery(userId ? QUERY_USER : QUERY_ME, {
    variables: { userId: userId },
});
  

  const user = data?.me || data?.user || {};
//   if (Auth.loggedIn() && Auth.getProfile().data._id === user._id) {
//     console.log('its the user!!!', user.me)
//     console.log()
//     return <Redirect to="/newPet" user={user.me} />;
// }
  console.log('its the REAL user', user)
  if (loading) {
      return <div>Loading...</div>;
  }

  if (!user?._id) {
      return (
          <h4>
              You need to be logged in to add a new pet. Use the navigation links above to
              sign up or log in!
          </h4>
      );
  }
  if (Auth.loggedIn() && Auth.getProfile().data._id === user._id) {
      console.log('USER FAVS in profiles', user.name)
  }

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addPet({
        variables: { ...formState },
      });

      Auth.login(data.addPet.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center mb-6">
      <div className="col-10 col-lg-8">
        <div className="form">
          <h4 className="card-header bg-light text-dark p-2">Add New Pet</h4>
          <div className="form-body">
            {/* {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p> */}
            
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Pet Name"
                  name="petname"
                  type="text"
                  value={formState.petname}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Describe your pet"
                  name="description"
                  type="text"
                  value={formState.description}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Price"
                  name="price"
                  type="number"
                  value={formState.price}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Quantity"
                  name="quantity"
                  type="number"
                  value={formState.quantity}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-info"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NewPet;