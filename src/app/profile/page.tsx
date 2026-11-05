import Navbar from "@/FrontEnd/Components/Navbar";
import Footer from "@/FrontEnd/Components/Footer";
import ProfilePage from "@/FrontEnd/Profile/ProfilePage";

export const metadata = {
  title: "My Sfeer Profile | Riyadh Air",
  description: "Manage your Riyadh Air Sfeer guest account, miles, and flight bookings.",
};

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-purple-900 selection:text-white">
      <Navbar />
      <div className="flex-1">
        <ProfilePage />
      </div>
      <Footer />
    </div>
  );
}
