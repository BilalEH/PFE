import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetParents } from '../../api/adminsStore/adminStore';
// import "./style/pages.css"

export default function AdminParents() {
    const dispatch = useDispatch();
    const parents = useSelector((state) => state.admins.parents);
    const status = useSelector((state) => state.status);

    useEffect(() => {
        dispatch(GetParents());
    }, [dispatch]);

    useEffect(() => {
        console.log('Parents:', parents);
    }, [parents]);

    const handleDelete = (parentId) => {
        // Add your delete logic here
        console.log(`Deleting parent with ID ${parentId}`);
    };

    const handleUpdate = (parentId) => {
        // Add your update logic here
        console.log(`Updating parent with ID ${parentId}`);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error loading data</div>;
    }

    if (parents.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <div className='page-title'>List of Parents</div>
            <table className="page-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>CIN</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parents.map((parent) => (
                        <tr key={parent.id}>
                            <td>{parent.id}</td>
                            <td>{parent.user_id.firstName}</td>
                            <td>{parent.user_id.lastName}</td>
                            <td>{parent.user_id.email}</td>
                            <td>{parent.user_id.phone}</td>
                            <td>{parent.user_id.cin}</td>
                            <td>
                                <button className='table-btn update' onClick={() => handleUpdate(parent.id)}>Update</button>
                                <button className='table-btn delete' onClick={() => handleDelete(parent.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
