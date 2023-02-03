import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useRef } from "react";

interface NewStudySession {
  study_area_id: string | undefined;
  profile_id: string | undefined;
  class: string | undefined;
  expires_at: string | undefined;
  available_seats: number | undefined;
}

const options = [
  { label: "The Godfather", id: 1 },
  { label: "Pulp Fiction", id: 2 },
];

export default function StatusUpdateButton() {
  const time = useRef<any>();
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

  const handleDateOnFocus = (event: React.FocusEvent<HTMLTimeElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <div className="timepicker relative mt-10 w-full">
      <input
        type="time"
        ref={time}
        className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-slate-700 focus:outline-none"
        placeholder="Select a date"
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
    </div>
  );
}
