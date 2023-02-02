import Layout from "@/components/layouts/Layout";
import SessionForm from "@/components/SessionForm";

export default function Home() {
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
