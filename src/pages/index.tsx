import Layout from "@/components/layouts/Layout";
import SearchArea from "@/components/SearchArea";
import type { StudyAreaProps } from "@/components/StudyAreaCard";
import { supabase } from "@/lib/supaBaseClient";
import Link from "next/link";

export default function Home({ data }: { data: StudyAreaProps[] }) {
  return (
    <Layout>
      <div className="flex flex-col justify-center items-center gap-4 mt-5">
        <Link className="p-5 bg-slate-200 text-center w-2/3" href="/sessions">
          Find Study Session
        </Link>
        <Link
          className="p-5 bg-slate-200 text-center w-2/3"
          href="/sessions/new"
        >
          Post Study Session
        </Link>
      </div>
      <SearchArea study_data={data} />
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  //   let { data } = await supabase
  // .from("study_areas")
  // .select()
  // .order("id", { ascending: true });

  const { data, error } = await supabase.rpc("study_areas_ordered_by_seating");

  if (error) {
    console.log(error);
  }

  return {
    props: {
      data,
    },
  };
}
