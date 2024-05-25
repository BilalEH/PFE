import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SStudentClasses, StuRemoveSInClass } from '../../api/StudentStore/Student';
import useAuthContext from '../../api/auth';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import ErrorData from './../../components/ErrorData';
import LoadingForTables from './../../components/LoadingForTables';
import EmptyTable from './../../components/EmptyTable';

export default function StudentSeance() {
  const dispatch = useDispatch();
  const { importUser } = useAuthContext();

  useEffect(() => {
    dispatch(SStudentClasses(importUser().id));
  }, [dispatch, importUser]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);

  const handleOpenDialog = (classId) => {
    setSelectedClass(classId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedClass(null);
    setOpenDialog(false);
  };

  const handleConfirmLeave = () => {
    dispatch(StuRemoveSInClass({ stuId: importUser().id, classID: selectedClass }));
    handleCloseDialog();
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { Classes_status, studentClasses } = useSelector((state) => state.students);

  const columns = [
    { id: 'className', name: 'Class Name' },
    { id: 'courseName', name: 'Course Name' },
    { id: 'teacherName', name: 'Teacher Name' },
    { id: 'dateJoin', name: 'Date Joined' },
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
    <div className='page-title'>Your Classes</div>
      <Paper style={{ background: 'none', border: '2px solid #afafaf', borderRadius: '12px', overflow: 'hidden' }} sx={{ width: '100%' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} style={{ padding: '22px 18px', fontWeight: 'bold', fontFamily: 'Montserrat', fontSize: '16px' }}>
                    {col.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Classes_status === 'loading' ? (
                <LoadingForTables />
              ) : Classes_status === 'failed' ? (
                <ErrorData />
              ) : studentClasses.length === 0 ? (
                <EmptyTable content="classes" />
              ) : (
                studentClasses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => (
                  <TableRow key={i}>
                    <TableCell style={{ padding: '22px 18px', fontFamily: 'Montserrat', fontSize: '16px' }}>{row.className}</TableCell>
                    <TableCell style={{ padding: '22px 18px', fontFamily: 'Montserrat', fontSize: '16px' }}>{row.course_id.courseName}</TableCell>
                    <TableCell style={{ padding: '22px 18px', fontFamily: 'Montserrat', fontSize: '16px' }}>{`${row.teacher_id.user_id.firstName} ${row.teacher_id.user_id.lastName}`}</TableCell>
                    <TableCell style={{ padding: '22px 18px', fontFamily: 'Montserrat', fontSize: '16px' }}>{row.pivot.dateJoin}</TableCell>
                    <TableCell style={{ padding: '22px 18px', fontFamily: 'Montserrat', fontSize: '16px' }}>
                      <Button variant="contained" color="error" onClick={() => handleOpenDialog(row.id)}>Leave</Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          style={{ paddingTop: '20px', paddingBottom: '10px' }}
          rowsPerPageOptions={[2, 5]}
          rowsPerPage={rowsPerPage}
          page={page}
          count={studentClasses.length}
          component="div"
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Leave</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to leave this class?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleConfirmLeave} color="error">Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
