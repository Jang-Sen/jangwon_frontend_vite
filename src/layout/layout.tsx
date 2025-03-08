import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./header.tsx";
import './layout.css';

const Layout: React.FC = () => {
    return (
        <div>
            <Header/>
            <main>
                <Outlet/>
            </main>

        </div>
    );
};

export default Layout;