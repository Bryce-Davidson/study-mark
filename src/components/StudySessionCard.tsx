import formatDate from "@/lib/formateDate";
import Link from "next/link";
import type { StudySessionProps } from "@/pages/sessions";

export default function StudySessionCard({
  session,
}: {
  session: StudySessionProps;
}) {
  return (
    <div className="bg-slate-300 my-5 flex justify-between items-center p-3 rounded-md">
      <div>
        <h3>{session.class}</h3>
        <h4>{session.StudyArea.building_name}</h4>
        <h4>{session.StudyArea.area_name}</h4>
        <p>Posted: {formatDate(session.created_at)}</p>
        <p>Duration: {formatDate(session.duration)}</p>
      </div>
      <Link href={"/sessions/"} className="bg-white h-1/2 mr-2 p-2 rounded-lg">
        View Details
      </Link>
    </div>
  );
}
