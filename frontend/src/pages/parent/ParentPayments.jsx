import  { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useAuthContext from '../../api/auth';
import { PGetPaymentList } from '../../api/parentsStore/parentStore';
import ErrorData from './../../components/ErrorData';
import LoadingForTables from './../../components/LoadingForTables';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import EmptyTable from './../../components/EmptyTable';


export default function ParentPayments() {
  const dispatch = useDispatch();
  const { importUser } = useAuthContext();

  useEffect(() => {
    dispatch(PGetPaymentList(importUser().id));
  }, [dispatch, importUser]);

  const { payment_status, payments } = useSelector(state => state.parents);
  // console.log(payment_status,payments);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns = [
    { id: 'studentName', name: 'Student Name' },
    { id: 'courseName', name: 'Course Name' },
    { id: 'description', name: 'Description' },
    { id: 'niveau', name: 'Niveau' },
    { id: 'amount', name: 'Amount' },
    { id: 'datePay', name: 'Payment Date' },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="page-title">Payments</div>
      <Paper style={{ background: "none", border: "2px solid #afafaf", borderRadius: "12px", overflow: "hidden" }} sx={{ width: "100%" }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell
                    style={{ padding: "22px 18px", fontWeight: "bold", fontFamily: "Montserrat", fontSize: "16px" }}
                    key={col.id}
                  >
                    {col.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {payment_status === "loading" ? (
                    <LoadingForTables />
              ) : payment_status === "failed" ? (
                    <ErrorData />
              ) : payments.length === 0 ? (
                  <EmptyTable />
              ) :payment_status === "succeeded"&& (
                payments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student, i) => {
                    return student.payments.map((payment,i)=>{
                      const { student_id, course_id, datePay } = payment;
                      const studentName = `${student_id.user_id.firstName} ${student_id.user_id.lastName}`;
                      return (
                        <TableRow key={i}>
                            <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>
                              {studentName}
                            </TableCell>
                            <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>
                              {course_id.courseName}
                            </TableCell>
                            <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>
                              {course_id.description}
                            </TableCell>
                            <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>
                              {course_id.niveau}
                            </TableCell>
                            <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>
                              {course_id.amount}Dh
                            </TableCell>
                            <TableCell style={{ padding: "22px 18px", fontFamily: "Montserrat", fontSize: "16px" }}>
                              {new Date(datePay).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                      );
                    })
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ paddingTop: "20px", paddingBottom: "10px" }}
          rowsPerPageOptions={[1, 5, 10]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={payments.length}
          component="div"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </>
  );
}
