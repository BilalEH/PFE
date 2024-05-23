import { useEffect, useState } from "react";

function ListOfReqJoin({ data }) {
    const [Data, setData] = useState([]);

    useEffect(() => {
        if (data.length > 0) {
            data.forEach((course) => {
                course.forEach((student) => {
                    let studentData = {
                        courseId: student.id,
                        courseName: student.courseName,
                        coursePrix: student.amount,
                        studentCIN: student.pivot.student_id.user_id.cin,
                        studentId: student.pivot.student_id.id,
                        studentName:
                            student.pivot.student_id.user_id.firstName +
                            " " +
                            student.pivot.student_id.user_id.lastName,
                        ReqDate:
                            student.pivot.created_at &&
                            new Date(student.pivot.created_at),
                    };
                    if (student.pivot.student_id.absparent_id) {
                        studentData = {
                            ...studentData,
                            parentName:
                                student.pivot.student_id.absparent_id.user_id
                                    .firstName +
                                " " +
                                student.pivot.student_id.absparent_id.user_id
                                    .lastName,
                        };
                    }
                    return setData([...Data, studentData]);
                });
            });
        }
    }, [data]);

    // aymane ha data li 5as tdahra (hiya li Data li fuseState) 3andk tadi f useEffect li fo9 😡
    console.log(Data);

    return <div className="w-100 h-100">Data kayna ra dahar had xi</div>;
}

export default ListOfReqJoin;
