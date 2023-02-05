import courses from "../data/course_ids.json";
import { supabase } from "@/lib/supaBaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { object, date, string } from "yup";
import { useFormik } from "formik";
import { TimePicker } from "@mui/x-date-pickers";
import { StudyAreaProps } from "./StudyAreaCard";

const options = courses.course_ids;

const validationSchema = object({
  course: object(),
  time: date(),
  seats: string(),
});

export default function SessionForm({ areas }: { areas: StudyAreaProps[] }) {
  const user = useUser();

  const areaOptions = areas.map((area) => ({
    id: area.id,
    building_name: area.building_name,
    area_name: area.area_name,
  }));

  const formik = useFormik({
    initialValues: {
      user: user?.id,
      course: { label: "", id: 0 },
      area: { id: 0, building_name: "", area_name: "" },
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
          renderInput={(params) => <TextField {...params} label="Course" />}
        />
        <TimePicker
          className="w-full"
          label="Time Ending"
          value={formik.values.time}
          onChange={(time) => {
            formik.setFieldValue("time", time);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <Autocomplete
          options={areaOptions}
          groupBy={(option) => option.building_name}
          getOptionLabel={(option) => option.area_name}
          value={formik.values.area}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(event, value) =>
            value
              ? formik.setFieldValue("area", value)
              : formik.setFieldValue("area", {
                  id: null,
                  building_name: "",
                  area_name: "",
                })
          }
          renderInput={(params) => <TextField {...params} label="Location" />}
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
