import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { StuPayList } from "../../api/StudentStore/Student";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import useAuthContext from "../../api/auth";
import EmptyCoursesPage from './../parent/ParentCourses/components/EmptyCoursesPage';
import LoadingForTables from './../../components/LoadingForTables';
import ErrorData from './../../components/ErrorData';

export default function StudentPayment() {
  const dispatch = useDispatch();
  const { importUser } = useAuthContext();
  useEffect(() => {dispatch(StuPayList(importUser().id))}, []);

  const { payments_status, payments } = useSelector((state) => state.students);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const columns = [
    { id: 'courseName', name: 'Course Name' },
    { id: 'description', name: 'Course Description' },
    { id: 'niveau', name: 'Niveau' },
    { id: 'amount', name: 'Amount' },
    { id: 'datePay', name: 'Payment Date' },
    { id: 'actions', name: '' },
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
              {payments_status === "loading" ? (
                    <LoadingForTables />
              ) : payments_status === "failed" ? (
                    <ErrorData />
              ) : payments.length === 0 ? (
                    <EmptyCoursesPage content={'payments'} />
              ) : (
                payments
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((payment, i) => {
                    const { course_id, datePay } = payment;
                    return (
                      <TableRow key={i}>
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
                          {new Date(datePay).getFullYear()}/{new Date(datePay).getMonth() + 1}/{new Date(datePay).getDate() } {new Date(datePay).getHours()}:{new Date(datePay).getMinutes()}
                        </TableCell>
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ paddingTop: "20px", paddingBottom: "10px" }}
          rowsPerPageOptions={[2, 5, 10]}
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
