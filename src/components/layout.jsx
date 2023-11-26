import Footer from "./footer";
import Navbar from "./navbar";

export default function Layout({ children }) {
  return (
    <div className="w-full h-screen bg-white text-neutral-800 overflow-auto">
      <Navbar />
      <div className="w-full h-full">{children}</div>
      <Footer />
    </div>
  );
}
