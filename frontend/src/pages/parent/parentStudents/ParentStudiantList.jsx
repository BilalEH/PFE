
function P_StudentsList({StudentsData}) {
    return (
        <table className="w-100">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>CIN</th>
                    <th>Date of Birth</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    StudentsData.map((student) => {
                        return (
                            <tr key={student.id}>
                                <td>{student.user_id.firstName}</td>
                                <td>{student.user_id.lastName}</td>
                                <td>{student.user_id.email}</td>
                                <td>{student.user_id.phone}</td>
                                <td>{student.user_id.cin}</td>
                                <td>{student.dateN}</td>
                                <td>{student.status==1?"verifie":"non verifie"}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default P_StudentsList;