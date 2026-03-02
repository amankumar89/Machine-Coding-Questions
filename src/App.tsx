import { DATA } from "./helper";
import Layout from "./components/Layout";
import FeatureCard from "./components/FeatureCard";

const App = () => {
  return (
    <Layout title="Machine Coding Questions">
      <div className="w-screen px-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {DATA.map((feature, index) => (
          <FeatureCard key={feature.path} count={index + 1} {...feature} />
        ))}
      </div>
    </Layout>
  );
}

export default App;