import { Link } from "react-router";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const ResourcesCard = ({ resource, onDelete }) => {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this resource?")) return;
    
    try {
      await axios.delete(`http://localhost:5000/api/resources/${resource.id}`);
      toast.success("Resource deleted");
      onDelete(resource.id);
    } catch (error) {
      console.log("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    }
  };

  return (
    <div className="bg-zinc-800 p-5 rounded-lg border border-zinc-700 shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{resource.title}</h3>
          <p className="text-sm text-zinc-400 mt-1">Status: {resource.status}</p>
          <p className="text-lg font-bold text-[#00FF9D] mt-2">Score: {resource.understandingScore}/10</p>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 mt-4">
        <Link to={`/edit/${resource.id}`} className="flex items-center gap-1 text-blue-400 hover:text-blue-300 px-3 py-1 rounded bg-blue-500/10">
          <Edit2Icon className="h-4 w-4" />
          Edit
        </Link>
        <button onClick={handleDelete} className="flex items-center gap-1 text-red-500 hover:text-red-400 px-3 py-1 rounded bg-red-500/10">
          <Trash2Icon className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  );
};

export default ResourcesCard;