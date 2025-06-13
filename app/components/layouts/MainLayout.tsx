import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar.tsx"
import Footer from "../Footer.tsx";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main style={{ padding: "20px" }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
