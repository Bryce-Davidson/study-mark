import courses from "../data/course_ids.json";
import { supabase } from "@/lib/supaBaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { object, date, string } from "yup";
import { useFormik } from "formik";
import { TimePicker } from "@mui/x-date-pickers";
import { StudyAreaProps } from "./StudyAreaCard";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import moment from "moment";

const options = courses.course_ids;

const validationSchema = object({
  course: object().required("Select your course"),
  time: date().required("Select the time you will finish studying"),
  seats: string()
    .max(1, "Maximum 9 seats")
    .required("Add the number of seats available"),
});

export default function SessionForm({ areas }: { areas: StudyAreaProps[] }) {
  const user = useUser();
  const router = useRouter();
  const [currentError, setCurrentError] = useState<string | null>(null);
  const [errorDate, setErrorDate] = useState(false);

  const areaOptions = areas.map((area) => ({
    id: area.id,
    building_name: area.building_name,
    area_name: area.area_name,
  }));

  const formik = useFormik({
    initialValues: {
      course: { label: "", id: 0 },
      area: { id: 0, building_name: "", area_name: "" },
      time: null,
      seats: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const { error } = await supabase.from("study_sessions").insert({
        profile_id: user?.id,
        study_area_id: values.area.id,
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
          className="w-full"
          options={options}
          getOptionLabel={(option) => option.label}
          value={formik.values.course}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) =>
            value
              ? formik.setFieldValue("course", value)
              : formik.setFieldValue("course", { label: "", id: 0 })
          }
          renderInput={(params) => <TextField {...params} label="Course" />}
        />
        <h1>Set the time you will be done today</h1>
        <TimePicker
          minTime={moment()}
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
        />
        <h1>Pick the location you are studying</h1>
        <Autocomplete
          className="w-full"
          options={areaOptions}
          groupBy={(option) => option.building_name}
          getOptionLabel={(option) => option.area_name}
          value={formik.values.area}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) =>
            value
              ? formik.setFieldValue("area", value)
              : formik.setFieldValue("area", {
                  id: 0,
                  building_name: "",
                  area_name: "",
                })
          }
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
        <h1>How many seats are available?</h1>
        <TextField
          className="w-full"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          label="Number of seats"
          value={formik.values.seats}
          onChange={(event) => {
            formik.setFieldValue("seats", event.target.value);
          }}
          error={formik.touched.seats && Boolean(formik.errors.seats)}
          helperText={formik.touched.seats && formik.errors.seats}
        />
        <Button
          className="bg-blue-600 text-white focus:text-blue-600 hover:text-blue-600"
          variant="outlined"
          fullWidth
          type="submit"
        >
          Post
        </Button>
      </form>
    </div>
  );
}
