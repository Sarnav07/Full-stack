import { useState } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("To read");
  const [understandingScore, setUnderstandingScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/resources", {
        title,
        status,
        understandingScore: Number(understandingScore),
      });
      toast.success("Resource created successfully!");
      navigate("/");
    } catch (error) {
      console.log("Error creating resource", error);
      toast.error("Failed to create resource");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <Link to="/" className="text-zinc-400 hover:text-white mb-6 inline-flex items-center gap-2">
        <ArrowLeftIcon className="h-5 w-5" />
        Back to Dashboard
      </Link>

      <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mt-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Create New Resource</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-zinc-400 mb-1">Title</label>
            <input
              type="text"
              className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. React Tutorial"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">Status</label>
            <select
              className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="To read">To read</option>
              <option value="In progress">In progress</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">Understanding Score (0-10): {understandingScore}</label>
            <input
              type="range"
              min="0"
              max="10"
              className="w-full"
              value={understandingScore}
              onChange={(e) => setUnderstandingScore(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="bg-[#00FF9D] text-black font-bold p-2 rounded mt-2 hover:bg-green-400">
            {loading ? "Creating..." : "Create Resource"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;