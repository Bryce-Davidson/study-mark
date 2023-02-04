import courses from "../data/course_ids.json";
import Fuse from "fuse.js";
import { useUser } from "@supabase/auth-helpers-react";
import { Button, TextField, Autocomplete } from "@mui/material";
import { object, string } from "yup";
import { useFormik } from "formik";

const options = courses.course_ids;

const validationSchema = object({
  email: string().email("Enter a valid email"),
  password: string().min(
    8,
    "Password should be of minimum 8 characters length"
  ),
});

export default function StatusUpdateButton() {
  const user = useUser();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      movie: { label: "", id: 0 },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div>
      <form className="flex flex-col gap-5" onSubmit={formik.handleSubmit}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          value={formik.values.movie}
          isOptionEqualToValue={(option, value) =>
            option.label === value.label || value.label == ""
          }
          onChange={(event, value) => formik.setFieldValue("movie", value)}
          //   inputValue={formik.values.movie.label}
          //   onInputChange={formik.handleChange}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
