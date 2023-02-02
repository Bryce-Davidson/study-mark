import React, { useState } from "react";
// import SelectSearch from "react-select-search";

interface NewStudySession {
  study_area_id: string | undefined;
  profile_id: string | undefined;
  class: string | undefined;
  expires_at: string | undefined;
  available_seats: number | undefined;
}

const options = [
  { name: "Swedish", value: "sv" },
  { name: "English", value: "en" },
  {
    type: "group",
    name: "Group name",
    items: [{ name: "Spanish", value: "es" }],
  },
];

export default function StatusUpdateButton() {
  const [expiresAt, setExpiresAt] = useState<any>("");
  const [session, setSession] = useState<NewStudySession>({
    study_area_id: "",
    profile_id: "",
    class: "",
    expires_at: "",
    available_seats: 0,
  });

  const handleExpiresAtchange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    let date = event.target.valueAsDate?.toISOString();
    setExpiresAt(event.target.value);
    setSession({ ...session, expires_at: date });
    console.log(session);
  };
  return (
    <div className="flex flex-col items-center gap-5 justify-center mt-10">
      {/* <input
        className="timepicker border-2 text-lg w-full py-2"
        onChange={handleExpiresAtchange}
        value={expiresAt}
        type="time"
        id="time-picker"
      /> */}
      <div className="flex justify-center">
        <div className="timepicker relative form-floating mb-3 xl:w-96">
          <input
            type="time"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Select a date"
          />
        </div>
      </div>
      {/* <SelectSearch
        options={options}
        search={true}
        placeholder="Search for class"
      /> */}
    </div>
  );
}
