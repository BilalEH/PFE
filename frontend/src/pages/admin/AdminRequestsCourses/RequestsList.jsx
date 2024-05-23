import { useEffect, useState } from "react";

function ListOfReqJoin({data}) {
    const [Data,setData]=useState([]);
    useEffect(() => {
        if (data.length > 0) {
            let tabG=[];
            data.forEach(tab1 => {
                return tab1.forEach(tab2 => {
                    let studentData = {
                        courseId: tab2.id,
                        courseName: tab2.courseName,
                        coursePrix: tab2.amount,
                        studentCIN: tab2.pivot.student_id.user_id.cin,
                        studentId: tab2.pivot.student_id.id,
                        studentName: tab2.pivot.student_id.user_id.firstName + " " + tab2.pivot.student_id.user_id.lastName,
                        ReqDate: tab2.pivot.created_at&&(new Date(tab2.pivot.created_at)),
                    };
                    if (tab2.pivot.student_id.absparent_id) {
                        studentData = {
                            ...studentData,
                            parentName: tab2.pivot.student_id.absparent_id.user_id.firstName + " " + tab2.pivot.student_id.absparent_id.user_id.lastName
                        };
                    }
                    return tabG.push(studentData);
                });
            });
            return setData(tabG);
        }
    }, [data]);

    // aymane ha data li 5as tdahra (hiya li Data li fuseState) 3andk tadi f useEffect li fo9 😡
    console.log(Data);

    return <div className="w-100 h-100">Data kayna ra dahar had xi</div>;
}

export default ListOfReqJoin;
