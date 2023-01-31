import { useEffect, useState } from "react";
import Layout from "@/components/layouts/Layout";
import { supabase } from "@/lib/supaBaseClient";

export default function StudyArea(props: any) {
  //   const [studyArea, setStudyArea] = useState(props.data[0]);

  return (
    <Layout>
      <div></div>
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  let { params } = context;
  let { data } = await supabase
    .from("study_areas")
    .select()
    .eq("id", params.id);

  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data,
    },
  };
}
