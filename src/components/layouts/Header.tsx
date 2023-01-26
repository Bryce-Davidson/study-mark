import Link from "next/link";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

export default function Header() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return (
    <header className="flex-col justify-between">
      <div className="flex">
        <div className="w-1/2"></div>
        <h1 className="text-3xl w-screen py-10 font-bold text-center">
          <Link href="/">Study-Mark</Link>
        </h1>
        <div className="w-1/2 flex justify-center items-center">
          {user ? (
            <button
              className="bg-slate-200 p-4 mr-5 rounded-md"
              onClick={() => {
                router.push("/");
                supabaseClient.auth.signOut();
              }}
            >
              Sign out
            </button>
          ) : (
            <Link className="bg-slate-200 p-4 mr-5 rounded-md" href="/profile">
              Login/Signup
            </Link>
          )}
        </div>
      </div>
      <h2 className="text-2xl bg-slate-400 w-screen py-10 font-medium text-center">
        Find available study spots at Uvic
      </h2>
    </header>
  );
}
