import courses from "../data/course_ids.json";
import { supabase } from "@/lib/supaBaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { object, date, string } from "yup";
import { useFormik } from "formik";
import { TimePicker } from "@mui/x-date-pickers";
import { StudyAreaProps } from "./StudyAreaCard";
import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";

const options = courses.course_ids;

export default function SessionForm({ areas }: { areas: StudyAreaProps[] }) {
  const user = useUser();
  const router = useRouter();
  const [errorDate, setErrorDate] = useState(false);
  const [currentError, setCurrentError] = useState("");

  const validationSchema = object({
    course: object().nullable().required("Required"),
    time: date().nullable().required("Required"),
    location: object()
      .nullable()
      .typeError("Invalid date")
      .required("Required"),
    seats: string().max(1, "Max seats 9").required("Required"),
  });

  const areaOptions = areas.map((area) => ({
    id: String(area.id),
    building_name: area.building_name,
    area_name: area.area_name,
  }));

  const formik = useFormik({
    initialValues: {
      course: null,
      time: null,
      location: null,
      seats: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { id }: any = values.location;
      const { error } = await supabase.from("study_sessions").insert({
        profile_id: user?.id,
        study_area_id: id,
        expires_at: values.time,
        available_seats: Number(values.seats),
        course: values.course,
      });
      if (error) {
        console.log(error);
      }
      router.push("/sessions");
    },
  });

  return (
    <div>
      <form
        className="flex flex-col gap-5 mt-10 mb-20"
        onSubmit={formik.handleSubmit}
      >
        <h1>Pick the class you are studying</h1>
        <Autocomplete
          id="course"
          className="w-full"
          options={options}
          getOptionLabel={(option) => option.label ?? ""}
          value={formik.values.course}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) => {
            formik.setFieldValue("course", value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Course"
              error={formik.touched.course && Boolean(formik.errors.course)}
              helperText={formik.touched.course && formik.errors.course}
            />
          )}
        />
        <h1>Set the time you will be done today</h1>
        <TimePicker
          className="w-full"
          label="Time Ending"
          minTime={moment()}
          value={formik.values.time}
          onChange={(time) => {
            formik.setFieldValue("time", time);
          }}
          onError={(reason, value) => {
            if (reason) {
              setErrorDate(true);
              setCurrentError("Time is already expired");
            } else {
              setErrorDate(false);
              setCurrentError("");
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Time"
              error={
                formik.touched.time &&
                (errorDate || Boolean(formik.errors.time))
              }
              helperText={formik.errors.time ?? currentError}
            />
          )}
        />
        <h1>Pick the location you are studying</h1>
        <Autocomplete
          id="location"
          className="w-full"
          options={areaOptions}
          groupBy={(option) => (option ? option.building_name : "")}
          getOptionLabel={(option) => (option ? option.area_name : "")}
          value={formik.values.location}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value: any) => {
            formik.setFieldValue("location", value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Location"
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.errors.location}
            />
          )}
        />
        <h1>How many seats are available?</h1>
        <TextField
          id="seats"
          className="w-full"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Seats"
          value={formik.values.seats}
          onBlur={() => {
            formik.setTouched({ seats: true }, true);
          }}
          onChange={(event) => {
            formik.setFieldValue("seats", event.target.value);
          }}
          error={formik.touched.seats && Boolean(formik.errors.seats)}
          helperText={formik.errors.seats}
        />
        <Button variant="outlined" fullWidth type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}
