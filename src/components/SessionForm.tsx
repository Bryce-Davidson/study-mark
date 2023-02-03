import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import courses from "../data/course_ids.json";
import Fuse from "fuse.js";

const options = courses.course_ids;

const fuseOptions = {
  ignoreLocation: true,
  keys: ["label"],
};
const fuse = new Fuse(options, fuseOptions);

const filterOptions = (
  options: { label: string; id: number }[],
  { inputValue }: { inputValue: any }
) => {
  const results = fuse.search(inputValue).map((res) => {
    return res.item;
  });
  return results;
};

export default function StatusUpdateButton() {
  const [expiresAt, setExpiresAt] = useState<any>(Date.now());
  const [session, setSession] = useState<NewStudySession>({
    study_area_id: "",
    profile_id: "",
    class: "",
    expires_at: "",
    available_seats: 0,
  });

  const handleExpiresAtchange = (new_value: any) => {
    setSession({ ...session, expires_at: moment(new_value).toISOString() });
    setExpiresAt(new_value);
    console.log(session);
  };

  return (
    <div className="flex flex-col gap-5 items-center mt-10 w-full">
      <TimePicker
        className="w-full"
        ampmInClock={true}
        label="Time"
        value={expiresAt}
        onChange={handleExpiresAtchange}
        renderInput={(params) => <TextField {...params} />}
      />
      <Autocomplete
        className="w-full"
        disablePortal
        filterOptions={filterOptions}
        id="combo-box-demo"
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Course ID" />}
      />
    </div>
  );
}

interface NewStudySession {
  study_area_id: string | undefined;
  profile_id: string | undefined;
  class: string | undefined;
  expires_at: string | undefined;
  available_seats: number | undefined;
}
