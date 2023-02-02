import React, { useState } from "react";
import SelectSearch from "react-select-search";

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
      <input
        className="timepicker border-2 rounded-lg text-lg w-full py-3"
        onChange={handleExpiresAtchange}
        value={expiresAt}
        type="time"
        id="time-picker"
      />
      <SelectSearch
        options={options}
        search={true}
        placeholder="Search for class"
      />
    </div>
  );
}
