import courses from "../data/course_ids.json";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { object, date, string } from "yup";
import { useFormik } from "formik";
import { TimePicker } from "@mui/x-date-pickers";

const options = courses.course_ids;

const validationSchema = object({
  course: object(),
  time: date(),
  seats: string(),
});

export default function StatusUpdateButton() {
  const user = useUser();
  const formik = useFormik({
    initialValues: {
      course: { label: "", id: 0 },
      time: null,
      seats: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form
        className="flex flex-col gap-5 mt-10"
        onSubmit={formik.handleSubmit}
      >
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          value={formik.values.course}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) =>
            value
              ? formik.setFieldValue("course", value)
              : formik.setFieldValue("course", { label: "", id: 0 })
          }
          inputValue={formik.values.course.label}
          renderInput={(params) => <TextField {...params} label="Course" />}
        />
        <TimePicker
          className="w-full"
          label="Time"
          value={formik.values.time}
          onChange={(time) => {
            formik.setFieldValue("time", time);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField
          label="Number of seats"
          value={formik.values.seats}
          onChange={(event) => {
            formik.setFieldValue("seats", event.target.value);
          }}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
        <Button
          className="bg-blue-600 text-white focus:text-blue-600 hover:text-blue-600"
          variant="outlined"
          fullWidth
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

interface NewStudySession {
  study_area_id: string | undefined;
  profile_id: string | undefined | null;
  course: string | undefined;
  expires_at: string | null | undefined;
  available_seats: string | undefined;
}
