import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const ResourceNotFound = () => {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-white mb-2">No Resources Yet</h2>
      <p className="text-zinc-400 mb-6">Start tracking your learning by creating a new one</p>
      <Link to="/create" className="bg-[#00FF9D] text-black px-4 py-2 rounded-lg font-bold inline-flex items-center gap-2 hover:bg-green-400">
        <PlusIcon className="h-5 w-5" />
        Create Resource
      </Link>
    </div>
  );
};

export default ResourceNotFound;