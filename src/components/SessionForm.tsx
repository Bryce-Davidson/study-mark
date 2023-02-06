import courses from "../data/course_ids.json";
import { supabase } from "@/lib/supaBaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { object, date, string, number, boolean } from "yup";
import { useFormik } from "formik";
import { TimePicker } from "@mui/x-date-pickers";
import { StudyAreaProps } from "./StudyAreaCard";
import { useRouter } from "next/router";

const options = courses.course_ids;

export default function SessionForm({ areas }: { areas: StudyAreaProps[] }) {
  const user = useUser();
  const router = useRouter();

  const validationSchema = object({
    course: object().nullable().required("Required"),
    location: object().nullable().required("Required"),
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
      location: null,
      seats: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      //   const { error } = await supabase.from("study_sessions").insert({
      //     profile_id: user?.id,
      //     study_area_id: values.area.id,
      //     expires_at: values.time,
      //     available_seats: Number(values.seats),
      //     course: values.course,
      //   });
      //   if (error) {
      //     console.log(error);
      //   }
      //   router.push("/sessions");
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
        {/* <h1>Set the time you will be done today</h1>
        <TimePicker
          className="w-full"
          label="Time Ending"
          value={formik.values.time}
          onChange={(time) => {
            formik.setFieldValue("time", time);
          }}
          onError={(reason, value) => {
            if (reason) {
              setCurrentError("Time is already expired");
              setErrorDate(true);
            } else {
              setCurrentError(null);
              setErrorDate(false);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorDate}
              helperText={currentError ?? currentError}
            />
          )}
        /> */}
        {/* <h1>Pick the location you are studying</h1>
        <Autocomplete
          className="w-full"
          options={areaOptions}
          groupBy={(option) => option.building_name}
          getOptionLabel={(option) => option.area_name ?? ""}
          value={formik.values.location}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) => {
            console.log(formik.errors);
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
        /> */}
        <h1>How many seats are available?</h1>
        <TextField
          id="seats"
          className="w-full"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Number of seats"
          value={formik.values.seats}
          onChange={(event) => {
            formik.setFieldValue("seats", event.target.value);
          }}
          error={formik.touched.seats && Boolean(formik.errors.seats)}
          //   error={Boolean(formik.errors.seats)}
          //   helperText={formik.touched.seats && formik.errors.seats}
          helperText={formik.errors.seats}
        />
        <Button variant="outlined" fullWidth type="submit">
          Post
        </Button>
      </form>
    </div>
  );
}
