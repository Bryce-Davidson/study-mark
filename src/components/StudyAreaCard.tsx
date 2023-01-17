interface StudyAreaProps {
  id: number;
  building_name: string;
  area_name: string;
  status: string;
  last_updated: string;
}

export default function StudyAreaCard(props: StudyAreaProps) {
  return (
    <div
      key={props.id}
      className="bg-slate-300 my-5 flex justify-between items-center p-3 rounded-md"
    >
      <div>
        <h3>{props.building_name}</h3>
        <h4>{props.area_name}</h4>
        <p>{props.status}</p>
        <p>Last updated: {props.last_updated}</p>
      </div>
      <a href="#" className="bg-white h-1/2 mr-2 p-2 rounded-lg">
        Update
      </a>
    </div>
  );
}

export type { StudyAreaProps };
