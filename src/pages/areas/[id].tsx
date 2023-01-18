import study_areas_data from "@/data/study_areas_data";
import Layout from "@/components/layouts/Layout";
import type { StudyAreaProps } from "@/components/StudyAreaCard";

export async function getStaticProps(context: any) {
  const data = study_areas_data.filter((area: StudyAreaProps) => {
    return area.id == context.params.id;
  });
  return {
    props: { area: data[0] },
  };
}

export async function getStaticPaths() {
  const paths = study_areas_data.map((studyArea: StudyAreaProps) => {
    return { params: { id: String(studyArea.id) } };
  });
  return {
    paths,
    fallback: false,
  };
}

export default function StudyArea(props: any) {
  const { building_name, area_name, status, last_updated, id } = props.area;
  return (
    <Layout>
      <div className="bg-slate-300 text-center mx-auto mt-10 py-5">
        <h3 className="text-xl">{building_name}</h3>
        <h4 className="text-lg">{area_name}</h4>
        <p>{status}</p>
        <p>Last updated: {last_updated}</p>
      </div>
      <h3 className="ext-xl font-medium py-10 text-center">
        Update the seating below
      </h3>
      <div className="bg-slate-300 text-center mx-auto p-3">
        <button className="py-5 my-3 w-full bg-white shadow-md">
          No seating
        </button>
        <button className="py-5 my-3 w-full bg-white shadow-md">
          Some seating
        </button>
        <button className="py-5 my-3 w-full bg-white shadow-md">
          Lots of seating
        </button>
      </div>
    </Layout>
  );
}
