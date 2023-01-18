import Layout from "@/components/layouts/Layout";
import SearchArea from "@/components/SearchArea";
import study_areas_data from "@/data/study_areas_data";

export default function Home() {
  return (
    <Layout>
      <SearchArea data={study_areas_data} />
    </Layout>
  );
}
