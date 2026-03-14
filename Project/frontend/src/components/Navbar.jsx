import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800">
      <div className="mx-auto max-w-6xl p-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold tracking-tight text-white hover:text-zinc-300">
          Resource<span className="text-[#00FF9D]">Tracker</span>
        </Link>
        <Link to="/create" className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-green-400">
          <PlusIcon className="h-5 w-5" />
          <span>New Resource</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;