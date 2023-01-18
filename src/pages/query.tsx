import { supabase } from "@/lib/supaBaseClient";

function Page({ study_areas }: any) {
  return (
    <ul>
      {study_areas.map((study_area: any) => {
        <li>{study_area.building_name}</li>;
      })}
    </ul>
  );
}

export async function getServerSideProps() {
  let { data } = await supabase.from("study-areas").select();

  return {
    props: {
      study_areas: data,
    },
  };
}

export default Page;
