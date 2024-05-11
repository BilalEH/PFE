import { useState } from 'react';
import "./header.css";
import { useNavigate } from 'react-router-dom';
import { Avatar, Button, Divider, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import useAuthContext from '../api/auth';
import Logout from '../pages/Logout';
import BrandLogo from './BrandLogo';

export default function Heading() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { importUser } = useAuthContext();
  const navigate = useNavigate();


  return (
    <div>
      <div className="container-fluid w-100 m-0" >
        <div className="bg-white navbar navbar-expand-lg shadow-lg mt-4 mx-auto">
          <div style={{transform:"scale(.5)"}} className=" navbar-brand display-1 fs-2">
            <BrandLogo/>
          </div>
          <div className="d-flex">
            {!importUser() ? (
              <>
                <div className="nav-item mx-2 login">
                  <Button onClick={() => navigate("/login")}>Log In</Button>
                </div>
                <div className="nav-item mx-2 signup">
                  <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                </div>
              </>
            ) : (
              <>
                <IconButton onClick={(e)=>setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
                  <Avatar alt={`${importUser().firstName} ${importUser().lastName}`} src={importUser().avatar} />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  onClose={()=>setAnchorEl(null)}>
                  
                  <MenuItem onClose={()=>setAnchorEl(null)} className='ShowFullName'>{`${importUser().firstName} ${importUser().lastName}`}</MenuItem>
                  <MenuItem onClose={()=>setAnchorEl(null)} className='ShowRole'>{`${importUser().role}`}</MenuItem>
                  <Divider />
                  <MenuItem onClick={()=>console.log('test')}><ListItemIcon><Avatar sx={{width: 20, height: 20}}/></ListItemIcon>Profile</MenuItem>
                  <Logout remove={setAnchorEl}/>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
