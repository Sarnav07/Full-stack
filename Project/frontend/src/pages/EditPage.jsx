import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon } from "lucide-react";

const EditPage = () => {
  const [resource, setResource] = useState({ title: "", status: "", understandingScore: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/resources/${id}`);
        setResource(res.data);
      } catch (error) {
        toast.error("Failed to load resource");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, [id, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`http://localhost:5000/api/resources/${id}`, resource);
      toast.success("Resource updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update resource");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center mt-10 text-[#00FF9D]">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 py-8">
      <Link to="/" className="text-zinc-400 hover:text-white mb-6 inline-flex items-center gap-2">
        <ArrowLeftIcon className="h-5 w-5" /> Back to Dashboard
      </Link>

      <div className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 mt-4">
        <h2 className="text-2xl font-bold mb-4 text-white">Edit Resource</h2>
        
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div>
            <label className="block text-zinc-400 mb-1">Status</label>
            <select
              className="w-full bg-zinc-900 border border-zinc-700 p-2 rounded text-white"
              value={resource.status}
              onChange={(e) => setResource({ ...resource, status: e.target.value })}
            >
              <option value="To read">To read</option>
              <option value="In progress">In progress</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">Understanding Score (0-10): {resource.understandingScore}</label>
            <input
              type="range"
              min="0"
              max="10"
              className="w-full"
              value={resource.understandingScore}
              onChange={(e) => setResource({ ...resource, understandingScore: Number(e.target.value) })}
            />
          </div>

          <button type="submit" disabled={saving} className="bg-blue-500 text-white font-bold p-2 rounded mt-2 hover:bg-blue-600">
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPage;