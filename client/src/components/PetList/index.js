import React from 'react';
import { Link } from 'react-router-dom';
//import style from '../../style/main.css';
import bckgImg from '../../images/bckg.png';

const PetList = ({ pets, title }) => {
  if (!pets.length) {
    return <h3>No Pets Yet</h3>;
  } else

    return (
      <div className="petList">
        <h3 className="text-primary">{title}</h3>
        <div className="flex-row justify-space-between my-4">
           {/* <img className='background' src={bckgImg} alt="" /> */}
          {pets &&
            pets.map((pet) => (

              < div className="col-12 col-xl-6" >
                <div className="card mb-3">
                  <h4 className="card-header bg-dark text-light p-2 m-0">
                    {pet.name} <br />
                    <span className="text-white" style={{ fontSize: '1rem' }}>
                      <img src={pet.image} alt={pet.name} width="500" height="600" />
                    </span>
                  </h4>

                  <Link
                    className="btn btn-block btn-squared btn-light text-dark"
                    to={`/pet/${pet._id}`}
                  >
                    Add into your favorites list if you like this pet.
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div >
    );
};

export default PetList;
