import Navbar from "@/FrontEnd/Components/Navbar";
import Footer from "@/FrontEnd/Components/Footer";
import Hero from "@/FrontEnd/Home/Hero";
import AirportNotice from "@/FrontEnd/Home/AirportNotice";
import WhereWeFly from "@/FrontEnd/Home/WhereWeFly";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-purple-900 selection:text-white">
      {/* Riyadh Air Navbar */}
      <Navbar />

      {/* Main Content (White Background) */}
      <main className="flex-1 bg-white">
        {/* Hero Section */}
        <Hero />

        {/* Airport Change Notice (Image 1) */}
        <AirportNotice />

        {/* Where We Fly & Manage Your Order (Image 2) */}
        <WhereWeFly />
      </main>

      {/* Riyadh Air Luxury Footer */}
      <Footer />
    </div>
  );
}
