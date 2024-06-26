import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./api/auth.jsx";
// import './index.css';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { AdminSlice } from "./api/adminsStore/adminStore.js";
import { ParentsSlice } from "./api/parentsStore/parentStore.js";
import StudentsSlice from "./api/StudentStore/Student.js";
import { TeacherSlice } from "./api/TeacherStore/TeacherStore.js";
import Aos from "aos";

Aos.init();

const store = configureStore({
    reducer: {
        admins: AdminSlice.reducer,
        parents: ParentsSlice.reducer,
        students: StudentsSlice.reducer,
        teachers: TeacherSlice.reducer,
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthProvider>
                <App />
            </AuthProvider>
        </Provider>
    </React.StrictMode>
);
