import React from "react";
import { Outlet } from "react-router-dom";

export default function ParentLayout() {
    return (
        <>
            <header>{/* <Heading></Heading> */}</header>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
}
