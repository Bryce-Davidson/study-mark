import React, { useState } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";

interface NewStudySession {
  study_area_id: string | undefined;
  profile_id: string | undefined;
  class: string | undefined;
  expires_at: string | undefined;
  available_seats: number | undefined;
}

export default function StatusUpdateButton() {
  const router = useRouter();
  const user = useUser();
  const [expiresAt, setExpiresAt] = useState<any>("");
  const [session, setSession] = useState<NewStudySession>({
    study_area_id: "",
    profile_id: "",
    class: "",
    expires_at: "",
    available_seats: 0,
  });

  const handleExpiresAtchange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    let date = event.target.valueAsDate?.toISOString();
    setExpiresAt(event.target.value);
    setSession({ ...session, expires_at: date });
    console.log(session);
  };
  return (
    <div className="flex justify-center mt-10">
      <input
        className="timepicker border-2 rounded-lg text-xl px-20 py-5"
        onChange={handleExpiresAtchange}
        value={expiresAt}
        type="time"
        id="time-picker"
      />
    </div>
  );
}
