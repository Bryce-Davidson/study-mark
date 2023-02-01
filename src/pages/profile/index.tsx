import Layout from "@/components/layouts/Layout";
import { useRouter } from "next/router";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

// I made another change
const LoginPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const [data, setData] = useState<any | null>();

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

export default LoginPage;
