import Layout from "@/components/layouts/Layout";
import SessionForm from "@/components/SessionForm";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

export default function Home() {
  return (
    <Layout>
      <SessionForm />
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

  return {
    props: {},
  };
};
