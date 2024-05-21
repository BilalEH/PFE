import { AppBar, Button, Dialog, DialogContent, Toolbar, Typography } from "@mui/material";

function PopupStudiantCourses({sethandleClose,handleClose,title,children}) {
    return (
        <Dialog fullScreen open={handleClose} onClose={sethandleClose} >
            <AppBar sx={{ position: 'relative' }} style={{backgroundColor: "#19647e",color:"white"}}>
            <Toolbar>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                    {title}
                </Typography>
                <Button edge="start" color="inherit" onClick={()=>sethandleClose(false)} aria-label="close">
                    X
                </Button>
            </Toolbar>
            </AppBar>
            <DialogContent style={{backgroundColor:"#dcd5d0"}}>
                {children}
            </DialogContent>
        </Dialog>
    );
}

export default PopupStudiantCourses;