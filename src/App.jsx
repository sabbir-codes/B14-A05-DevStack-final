import { Suspense, useMemo, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import TechGrid from "./components/TechGrid.jsx";
import StackSidebar from "./components/StackSidebar.jsx";
import Loading from "./components/Loading.jsx";
import Footer from "./components/Footer.jsx";
const techs = async () => {
  const res = await fetch('/technologies.json')
  const data = await res.json();
  return data;
}


export default function App() {
  const [stack, setStack] = useState([]);

  // Simulates fetching the JSON data (it's a local import, so this resolves
  // almost instantly — but the loading state still exists and is exercised).

  

  const stackIds = useMemo(() => new Set(stack.map((t) => t.id)), [stack]);

  function handleAdd(tech) {
    if (stackIds.has(tech.id)) {
      toast.warn(`${tech.name} is already in your stack.`);
      return;
    }
    setStack((prev) => [...prev, tech]);
    toast.success(`${tech.name} added to your stack.`);
  }

  function handleRemove(tech) {
    setStack((prev) => prev.filter((t) => t.id !== tech.id));
    toast.info(`${tech.name} removed from your stack.`);
  }

  function handleRemoveAll() {
    setStack([]);
    toast.info("Stack cleared.");
  }
 console.log(techs());

  return (
    <div className="min-h-screen bg-white text-ink">
      <Navbar />
      <Hero />

      <section id="technologies" className="max-w-6xl mx-auto px-5 pb-24">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Explore the <span className="text-gradient-brand">Technologies</span>
          </h2>
          <p className="mt-2 text-slate-500">
            Pick one technology per category to build your ideal stack.
          </p>
        </div>

       
          <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
            <Suspense fallback={<p>Loading...</p>}>
            <TechGrid technologies={techs()} stackIds={stackIds} onAdd={handleAdd} />
            </Suspense>
            <StackSidebar stack={stack} onRemove={handleRemove} onRemoveAll={handleRemoveAll} />
          </div>
      </section>

      <Footer />
    </div>
  );
}
