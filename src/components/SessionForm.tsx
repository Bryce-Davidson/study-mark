import React, { useState } from "react";
import { Autocomplete, TextField, FormControl } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import courses from "../data/course_ids.json";
import Fuse from "fuse.js";
import { useEffect } from "react";
import { log } from "console";

const options = courses.course_ids;

const fuseOptions = {
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
  if (results.length == 0) {
    return options;
  }
  return results;
};

export default function StatusUpdateButton() {
  const [session, setSession] = useState<NewStudySession>({
    study_area_id: "",
    profile_id: "",
    course: "",
    expires_at: null,
    available_seats: "",
  });

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <FormControl
      required={true}
      className="flex flex-col gap-5 items-center mt-10 w-full"
    >
      <h1>Pick the class you are studying</h1>
      <Autocomplete
        inputValue={session.course}
        onInputChange={(_, newInputValue) => {
          setSession({ ...session, course: newInputValue });
        }}
        className="w-full"
        filterOptions={filterOptions}
        options={options}
        renderInput={(params) => <TextField {...params} label="Course ID" />}
      />
      <h1>Set the time you will be done today</h1>
      <TimePicker
        className="w-full"
        label="Time"
        value={session.expires_at}
        onChange={(time) => {
          setSession({ ...session, expires_at: moment(time).toISOString() });
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <h1>Pick the location you are studying</h1>
      <Autocomplete
        className="w-full"
        disablePortal
        filterOptions={filterOptions}
        id="combo-box-demo"
        options={options}
        renderInput={(params) => <TextField {...params} label="Location" />}
      />
      <h1>How many seats are available</h1>
      <TextField
        className="w-full"
        value={session.available_seats}
        onChange={(event) => {
          setSession({ ...session, available_seats: event.target.value });
        }}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        label={"Seats Available"}
      />
    </FormControl>
    // </div>
  );
}

interface NewStudySession {
  study_area_id: string | undefined;
  profile_id: string | undefined;
  course: string | undefined;
  expires_at: string | null | undefined;
  available_seats: string | undefined;
}
