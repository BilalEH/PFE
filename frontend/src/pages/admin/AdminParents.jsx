import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetParents } from '../../api/adminsStore/adminStore';
import { Alert, CircularProgress } from '@mui/material';

export default function AdminParents() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(GetParents());
    }, [dispatch]);

    const parentsData = useSelector((state) => state.admins);

    return (
        <div>
            <h2>List of Parents</h2>
            {
                parentsData.status === 'loading' ?<div className='w-100 text-center'><CircularProgress /></div>:parentsData.status === 'failed' ?<div><Alert severity="error">Error</Alert></div>:(
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>lastName</th>
                                <th>firstName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parentsData.parents.map((parent,index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{parent.user_id.lastName}</td>
                                    <td>{parent.user_id.firstName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 
                )
            }

        </div>
    );
}
