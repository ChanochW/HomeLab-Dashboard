import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom/dist";
import {Error} from "./components/Error";
import {Dashboard} from "./pages/Dashboard";
import {NotFound} from "./components/NotFound";
import {SystemStatus} from "./pages/SystemStatus";
import {Layout} from "./layout/Layout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout/>} errorElement={<Error/>}>
            <Route path={'/'} element={<Dashboard/>}/>
            <Route path={'/status'} element={<SystemStatus/>}/>
            <Route path={'*'} element={<NotFound/>}/>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
        <RouterProvider router={router}/>
    // </React.StrictMode>,
)
