import Layout from "@/components/layouts/Layout";
import { useState } from "react";
import { supabase } from "@/lib/supaBaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import SessionForm from "@/components/SessionForm";

interface StudySessionRow {
  study_area_id: string;
  profile_id: string;
  class: string;
  duration: string;
  available_seats: number;
}

export default function Home() {
  //   let [session, setSession] = useState<null | StudySessionRow>();

  //   async function handlePostSession(user_id: undefined | string) {
  //     const { error } = await supabase.from("study_sessions").insert({
  //       study_area_id: 0,
  //       profile_id: user_id,
  //       class: "320",
  //       available_seats: 0,
  //       duration: "2023-01-31 21:20:00+00",
  //     });
  //     console.log(error);
  //   }
  return (
    <Layout>
      <SessionForm />
    </Layout>
  );
}
