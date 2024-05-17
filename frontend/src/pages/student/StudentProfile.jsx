import useAuthContext from '../../api/auth';

function StudentProfile() {

  const {importUser} =useAuthContext()
  return (
    <div>
      <h2>Student Profile</h2>
      <div>
        <p><strong>lastName:</strong> {importUser().lastName}</p>
        <p><strong>firstName:</strong> {importUser().firstName}</p>
        <p><strong>cin:</strong> {importUser().cin}</p>
        <p><strong>Email:</strong> {importUser().email}</p>
        <p><strong>phone:</strong> {importUser().phone}</p>
        <p><strong>role:</strong> {importUser().role}</p>
      </div>
  </div>
  );
}

export default StudentProfile;
