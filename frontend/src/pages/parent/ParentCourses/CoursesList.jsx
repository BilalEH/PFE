
function ParentCouresList({CouresData}) {


    return (
        <table className="w-100">
            <thead>
                <tr>
                    <th>Course Name</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Niveau</th>
                    <th>actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    CouresData.map((course) =>{
                        return (
                            <tr key={course.id}>
                                <td>{course.courseName}</td>
                                <td>{course.description}</td>
                                <td>{course.amount}Dh</td>
                                <td>{course.niveau}</td>
                                <td>actions</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default ParentCouresList;