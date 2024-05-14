import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchParentData } from './parentSlice'; // Adjust the path as per your file structure

function ParentProfile() {
  const dispatch = useDispatch();
  const parent = useSelector(state => state.parent.data); // Assuming your parent reducer stores parent data under 'data'

  useEffect(() => {
    dispatch(fetchParentData());
  }, [dispatch]);

  return (
    <div>
      <h2>Parent Profile</h2>
      {parent ? (
        <div>
          <p>Name: {parent.name}</p>
          <p>Email: {parent.email}</p>
          {/* Add other fields as per your parent data structure */}
        </div>
      ) : (
        <p>Loading parent data...</p>
      )}
    </div>
  );
}

export default ParentProfile;
