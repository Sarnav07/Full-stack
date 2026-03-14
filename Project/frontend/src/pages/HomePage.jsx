import { useState, useEffect } from "react";
import axios from "axios";
import ResourcesCard from "../components/ResourcesCard.jsx";
import ResourceNotFound from "../components/ResourceNotFound.jsx";

const HomePage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resources");
        setResources(res.data);
      } catch (error) {
        console.log("Error fetching resources", error);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  const handleDelete = (id) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6">
      {loading && <div className="text-center text-[#00FF9D] py-10">Loading resources...</div>}
      
      {!loading && resources.length === 0 && <ResourceNotFound />}
      
      {!loading && resources.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <ResourcesCard key={resource.id} resource={resource} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;