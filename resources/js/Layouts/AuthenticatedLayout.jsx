import Navbar from "@/Components/Navbar";
import Footer from "@/Components/ui/Footer";

export default function Authenticated({ auth, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar auth={auth} />

            <main>{children}</main>
            <Footer/>
        </div>
    );
}
