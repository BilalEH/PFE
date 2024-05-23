import { TableCell, TableRow } from "@mui/material";
import React from "react";

export default function EmptyCoursesPage() {
    return (
        <>
            <TableRow>
                <TableCell colSpan={6}>
                    <div className="empty-req-container text-muted">
                        <div className="empty-icon my-2">{windIcon}</div>
                        <div className="empty-text my-2">
                            There is no courses at the moment
                        </div>
                    </div>
                </TableCell>
            </TableRow>
        </>
    );
}
