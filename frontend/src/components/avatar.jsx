import { Avatar, Divider, IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import useAuthContext from "../api/auth";
import { useState } from "react";
import Logout from "../pages/Logout";

function HeaderAvatar() {
    const { importUser } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);
    console.log(importUser());
    return (
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
    );
}

export default HeaderAvatar;