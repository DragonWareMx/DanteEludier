import React, { useEffect } from "react";

import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Layout({ title, pageTitle, children }) {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <React.Fragment>
            {/* contenido */}
            <div className="content" id="content">
                <Navbar />
                {children}
                <Footer />
            </div>
        </React.Fragment>
    );
}
