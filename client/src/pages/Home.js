import React from 'react';
import { useQuery } from '@apollo/client';

import PetList from '../components/PetList';

import { QUERY_PETS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_PETS);
  console.log(data)
  const pets = data?.pets || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PetList
              pets={pets}
              title="Here's the current Lists of Pets..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
