import { useState } from "react";
import StudyAreaCard from "./StudyAreaCard";
import Fuse from "fuse.js";
import type { StudyAreaProps } from "./StudyAreaCard";

const options = {
  ignoreLocation: true,
  keys: ["building_name", "area_name"],
};

export default function SearchArea(props: any) {
  const { study_data }: { study_data: StudyAreaProps[] } = props;
  const [searchInput, setSearchInput] = useState("");
  const [studyAreas, setStudyAreas] = useState(study_data);

  const fuse = new Fuse(study_data, options);

  const handleChange = (e: any) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    console.log(searchInput);
    if (searchInput.length == 0) {
      return setStudyAreas(study_data);
    }
    const results = fuse.search(searchInput).map((res) => {
      return res.item;
    });
    return setStudyAreas(results);
  };

  const handleSubmit = (e: any) => {
    e.target[0].blur();
    e.preventDefault();
    return;
  };

  return (
    <div>
      <form action="" className="flex rounded py-10" onSubmit={handleSubmit}>
        <input
          className="block w-full px-4 py-2 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
          type="search"
          placeholder="search study spots"
          onChange={handleChange}
          onKeyUp={handleChange}
          value={searchInput}
        />
        <input
          type="submit"
          value="Search"
          className="px-4 text-white bg-blue-300 border-l rounded"
        />
      </form>
      <h2 className="text-2xl mx-auto text-center">Least Busy Spots</h2>
      <div>
        {studyAreas.length > 0 ? (
          studyAreas.map((area: StudyAreaProps, index: number) => {
            return <StudyAreaCard key={index} area={area} />;
          })
        ) : (
          <div>No results</div>
        )}
      </div>
    </div>
  );
}
