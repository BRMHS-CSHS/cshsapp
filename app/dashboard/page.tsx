import Dashboard from "@/components/dashboard";
import Navbar_user from "@/components/navbar/navbaruser";

export default function Home() {
  return (
    <main>
      <Navbar_user/>
      <div className="flex h-screen justify-center items-center">
        <Dashboard />
      </div>
    </main>
  );
}
