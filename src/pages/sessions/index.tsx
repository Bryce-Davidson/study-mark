import Layout from "@/components/layouts/Layout";
import { supabase } from "@/lib/supaBaseClient";
import StudySessionCard from "@/components/StudySessionCard";
import Link from "next/link";

export default function Sessions({ data }: { data: StudySessionProps[] }) {
  return (
    <Layout>
      {data.length > 0 ? (
        data.map((session: StudySessionProps) => {
          return <StudySessionCard key={session.id} session={session} />;
        })
      ) : (
        <div className="flex flex-col items-center gap-5 justify-center mt-10">
          <p>No sessions posted</p>
          <Link
            className="p-5 bg-slate-200 text-center w-2/3 shadow-md"
            href="/sessions/new"
          >
            Post Study Session
          </Link>
        </div>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  let { data, error } = await supabase
    .from("study_sessions")
    .select(
      `id,
      course,
      available_seats,
      created_at,
      expires_at,
      Profile:profile_id(
          id
      ),
      StudyArea:study_area_id(
          id,
          building_name,
          area_name
      )`
    )
    .order("created_at", { ascending: false })
    .gt("expires_at", new Date().toISOString());
  if (error) {
    console.log(error);
  }

  console.log(data);
  return {
    props: {
      data,
    },
  };
}

export interface StudySessionProps {
  id: number;
  Profile: {
    id: number;
  };
  course: string;
  StudyArea: {
    id: number;
    building_name: string;
    area_name: string;
  };
  available_seats: number;
  created_at: string;
  expires_at: string;
}
