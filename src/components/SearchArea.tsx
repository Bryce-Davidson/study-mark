import { useState } from "react";
import study_areas_data from "@/data/study_areas_data";
import StudyAreaCard from "./StudyAreaCard";
import type { StudyAreaProps } from "./StudyAreaCard";
import Fuse from "fuse.js";

const options = {
  ignoreLocation: true,
  keys: ["building_name", "area_name"],
};

const fuse = new Fuse(study_areas_data, options);

export default function SearchArea(props: { data: StudyAreaProps[] }) {
  const [searchInput, setSearchInput] = useState("");
  const [studyAreas, setStudyAreas] = useState(study_areas_data);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    const results = fuse.search(searchInput).map((res) => {
      return res.item;
    });
    setStudyAreas(results);
  };

  const handleSubmit = (e: any) => {
    return;
  };

  return (
    <div>
      <div className="flex rounded py-10">
        <input
          className="block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          type="search"
          placeholder="search study spots"
          onChange={handleChange}
          value={searchInput}
        />
        <button
          className="px-4 text-white bg-blue-300 border-l rounded "
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      <h2 className="text-2xl mx-auto text-center">Least Busy Spots</h2>
      <div>
        {studyAreas.map((area: StudyAreaProps, index: number) => {
          return <StudyAreaCard key={index} area={area} />;
        })}
      </div>
    </div>
  );
}
