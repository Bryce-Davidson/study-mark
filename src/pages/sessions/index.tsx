import Layout from "@/components/layouts/Layout";
import { supabase } from "@/lib/supaBaseClient";
import StudySessionCard from "@/components/StudySessionCard";
import type { StudyAreaProps } from "@/components/StudyAreaCard";

export interface StudySessionProps {
  id: number;
  Profile: {
    id: number;
  };
  class: string;
  StudyArea: {
    id: number;
    building_name: string;
    area_name: string;
  };
  available_seats: number;
  created_at: string;
  duration: string;
}

export default function Sessions({ data }: { data: StudySessionProps[] }) {
  return (
    <Layout>
      {data.map((session: StudySessionProps) => {
        return <StudySessionCard key={session.id} session={session} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps(context: any) {
  let { data } = await supabase
    .from("study_sessions")
    .select(
      `id,
      class,
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
    .order("id", { ascending: true });

  return {
    props: {
      data,
    },
  };
}
