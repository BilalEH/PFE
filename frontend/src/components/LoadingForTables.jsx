import { CircularProgress, TableCell, TableRow } from "@mui/material";
import React from "react";

export default function LoadingForTables() {
    return (
        <>
            <TableRow>
                <TableCell colSpan={8}>
                    <div className="empty-req-container text-muted d-flex justify-content-center py-5">
                        <CircularProgress />
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
}
