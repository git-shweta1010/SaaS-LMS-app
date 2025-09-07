// import CompanionCard from "@/components/CompanionCard";
// import CompanionsList from "@/components/CompanionsList";
// import CTA from "@/components/CTA";
// import {recentSessions} from "@/constants";
// import {getAllCompanions, getRecentSessions} from "@/lib/actions/companion.actions";
// import {getSubjectColor} from "@/lib/utils";

// const Page = async () => {
//     const companions = await getAllCompanions({ limit: 3 });
//     const recentSessionsCompanions = await getRecentSessions(10);

//   return (
//     <main>
//       <h1>Popular Companions</h1>

//         <section className="home-section">
//             {companions.map((companion) => (
//                 <CompanionCard
//                     key={companion.id}
//                     {...companion}
//                     color={getSubjectColor(companion.subject)}
//                 />
//             ))}

//         </section>

//         <section className="home-section">
//             <CompanionsList
//                 title="Recently completed sessions"
//                 companions={recentSessionsCompanions}
//                 classNames="w-2/3 max-lg:w-full"
//             />
//             <CTA />
//         </section>
//     </main>
//   )
// }

// export default Page














import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { getAllCompanions, getRecentSessions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const rawCompanions = await getAllCompanions({ limit: 10 }); // fetch more to dedupe better

  // Deduplicate companions by name (and optionally subject/topic)
  const companions = rawCompanions.filter(
    (c, i, arr) =>
      arr.findIndex(x => x.name === c.name && x.subject === c.subject) === i
  ).slice(0, 3); // limit to 3 after dedupe

  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <h1>Popular Companions</h1>

      <section className="home-section">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
