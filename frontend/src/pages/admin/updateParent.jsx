import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";


function UpdateParent({handleUpdate,data,UpdatePop}) {
    
    const [DataForme,setDataForme]=useState(data);
    return (
        // data
        <div >
            <div className="w-100">
                <div>
                    <TextField id="standard-basic" label="Standard" variant="standard" defaultValue={data.user_id.firstName} onChange={(e)=>setDataForme({...DataForme,user_id:{...DataForme.user_id,firstName:e.target.value}})}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Standard" variant="standard" defaultValue={data.user_id.lastName} onChange={(e)=>setDataForme({...DataForme,user_id:{...DataForme.user_id,lastName:e.target.value}})}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Standard" variant="standard" defaultValue={data.user_id.cin} onChange={(e)=>setDataForme({...DataForme,user_id:{...DataForme.user_id,cin:e.target.value}})}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Standard" variant="standard" defaultValue={data.user_id.email} onChange={(e)=>setDataForme({...DataForme,user_id:{...DataForme.user_id,email:e.target.value}})}/>
                </div>
                <div>
                    <TextField id="standard-basic" label="Standard" variant="standard" defaultValue={data.user_id.phone} onChange={(e)=>setDataForme({...DataForme,user_id:{...DataForme.user_id,phone:e.target.value}})}/>
                </div>
                <div>
                    {/* <TextField id="standard-basic" label="Standard" variant="standard" defaultValue={data.status==1?'Verified':'Not verified'}/> */}
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                        <Select labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" value={data.status} onChange={(e)=>setDataForme({...DataForme,status:e.target.value})} label="Age">
                            <MenuItem value={1}>Verified</MenuItem>
                            <MenuItem value={0}>Not verified</MenuItem>
                        </Select>
                </FormControl>
                </div>
            </div>
            <div>
                <button onClick={()=>UpdatePop(false)}>close</button>
                <button onClick={()=>handleUpdate(DataForme)}>update</button>
            </div>
        </div>
    );
}

export default UpdateParent;