interface StudyAreaProps {
  id: number;
  building_name: string;
  area_name: string;
  status: string;
  last_updated: string;
}

export default function StudyAreaCard(props: { area: StudyAreaProps }) {
  return (
    <div className="bg-slate-300 my-5 flex justify-between items-center p-3 rounded-md">
      <div>
        <h3>{props.area.building_name}</h3>
        <h4>{props.area.area_name}</h4>
        <p>{props.area.status}</p>
        <p>Last updated: {props.area.last_updated}</p>
      </div>
      <a
        href={"/areas/" + props.area.id}
        className="bg-white h-1/2 mr-2 p-2 rounded-lg"
      >
        Update
      </a>
    </div>
  );
}

export type { StudyAreaProps };
