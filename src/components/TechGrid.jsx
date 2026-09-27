import { use } from "react";
import TechCard from "./TechCard.jsx";

export default function TechGrid({ technologies, stackIds, onAdd }) {

  const technos = use(technologies)
// console.log(technos, "techgrid");

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {technos.map((tech) => (
        <TechCard
          key={tech.id}
          tech={tech}
          isAdded={stackIds.has(tech.id)}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
}
