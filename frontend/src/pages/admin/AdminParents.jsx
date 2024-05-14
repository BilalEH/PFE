import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetParents } from '../../api/adminsStore/adminStore';

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
            <h2>List of Parents</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>CIN</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
