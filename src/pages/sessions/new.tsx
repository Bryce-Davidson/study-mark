import Layout from "@/components/layouts/Layout";
import SessionForm from "@/components/SessionForm";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { StudyAreaProps } from "@/components/StudyAreaCard";

export default function New({ data }: { data: StudyAreaProps[] }) {
  return (
    <Layout>
      <SessionForm areas={data} />
    </Layout>
  );
}

export const getServerSideProps = async (ctx: any) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };

  try {
    let { data } = await supabase
      .from("study_sessions")
      .select()
      .gt("expires_at", new Date().toISOString())
      .eq("profile_id", session.user.id);
    if (data?.length !== 0) {
      return {
        redirect: {
          destination: "/sessions",
          permanent: false,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }

  let { data } = await supabase
    .from("study_areas")
    .select()
    .order("id", { ascending: true });

  return {
    props: { data },
  };
};
