import courses from "../data/course_ids.json";
import { supabase } from "@/lib/supaBaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { object, date, string } from "yup";
import { useFormik } from "formik";
import { TimePicker } from "@mui/x-date-pickers";
import { StudyAreaProps } from "./StudyAreaCard";
import { useRouter } from "next/router";

const options = courses.course_ids;

const validationSchema = object({
  course: object(),
  time: date(),
  seats: string(),
});

export default function SessionForm({ areas }: { areas: StudyAreaProps[] }) {
  const user = useUser();
  const router = useRouter();

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

  function areaInput() {
    if (formik.values.area.building_name.length == 0) {
      return "";
    } else {
      return (
        formik.values.area.building_name + " - " + formik.values.area.area_name
      );
    }
  }

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
          className="w-full"
          label="Time Ending"
          value={formik.values.time}
          onChange={(time) => {
            formik.setFieldValue("time", time);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <h1>Pick the location you are studying</h1>
        <Autocomplete
          className="w-full"
          options={areaOptions}
          groupBy={(option) => option.building_name}
          getOptionLabel={(option) => option.area_name}
          value={formik.values.area}
          inputValue={areaInput()}
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
          Post
        </Button>
      </form>
    </div>
  );
}
