import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetParents } from '../../api/adminsStore/adminStore';
function ParentProfile() {
  const dispatch = useDispatch();
  const parents = useSelector((state) => state.studentsSlice.parents); // Assuming the key is 'parents' in your slice state
  const status = useSelector((state) => state.studentsSlice.status);

  useEffect(() => {
    dispatch(GetParents());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error loading data</div>;
  }

  const parent = parents[0]; // Assuming there's only one parent, adjust accordingly if needed

  if (!parent) {
    return <div>No parent data available</div>;
  }

  return (
    <div>
      <h2>Parent Profile</h2>
      <div>
        <p><strong>Name:</strong> {parent.name}</p>
        <p><strong>Email:</strong> {parent.email}</p>
        {/* Add more profile information here */}
      </div>
    </div>
  );
}

export default ParentProfile;
