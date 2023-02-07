import Layout from "@/components/layouts/Layout";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import StudySessionCard from "@/components/StudySessionCard";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";

// I made another change
const ProfilePage = ({ session }: { session: any }) => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  if (!user)
    return (
      <Layout>
        <div className="flex-col justify-center mt-5">
          <h2 className="text-xl text-center">
            To post study sessions, make an account with us!
          </h2>
          <h3 className="text-md text-center">
            (Google sign in and others on the way)
          </h3>
        </div>
        <div className="mt-10">
          <Auth
            redirectTo="http://localhost:3000/"
            appearance={{ theme: ThemeSupa }}
            supabaseClient={supabaseClient}
            socialLayout="horizontal"
          />
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div>Profile page</div>
    </Layout>
  );
};

export default ProfilePage;

export const getServerSideProps = async (ctx: any) => {
  // Create authenticated Supabase Client
  const supabase = createServerSupabaseClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  //   console.log(session?.user.id);
  if (!session) {
    return { props: {} };
  }

  let { data, error } = await supabase
    .from("study_sessions")
    .select()
    .eq("profile_id", session?.user.id);
  console.log(data, error);

  return {
    props: { data },
  };

  //   return {
  //     props: { session, data },
  //   };
};
