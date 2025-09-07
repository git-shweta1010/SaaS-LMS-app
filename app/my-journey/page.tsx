// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { currentUser } from "@clerk/nextjs/server";
// import { redirect } from "next/navigation";
// import {
//   getUserCompanions,
//   getUserSessions,
//   // getBookmarkedCompanions,
// } from "@/lib/actions/companion.actions";
// import Image from "next/image";
// import CompanionsList from "@/components/CompanionsList";

// const Profile = async () => {
//   const user = await currentUser();

//   if (!user) redirect("/sign-in");

//   const companions = await getUserCompanions(user.id);
//   const sessionHistory = await getUserSessions(user.id);
//   // const bookmarkedCompanions = await getBookmarkedCompanions(user.id);
//   // Deduplicate companions by `id`
  

//   return (
//     <main className="min-lg:w-3/4">
//       <section className="flex justify-between gap-4 max-sm:flex-col items-center">
//         <div className="flex gap-4 items-center">
//           <Image
//             src={user.imageUrl}
//             alt={user.firstName!}
//             width={110}
//             height={110}
//           />
//           <div className="flex flex-col gap-2">
//             <h1 className="font-bold text-2xl">
//               {user.firstName} {user.lastName}
//             </h1>
//             <p className="text-sm text-muted-foreground">
//               {user.emailAddresses[0].emailAddress}
//             </p>
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <div className="border border-black rouded-lg p-3 gap-2 flex flex-col h-fit">
//             <div className="flex gap-2 items-center">
//               <Image
//                 src="/icons/check.svg"
//                 alt="checkmark"
//                 width={22}
//                 height={22}
//               />
//               <p className="text-2xl font-bold">{sessionHistory.length}</p>
//             </div>
//             <div>Lessons completed</div>
//           </div>
//           <div className="border border-black rouded-lg p-3 gap-2 flex flex-col h-fit">
//             <div className="flex gap-2 items-center">
//               <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
//               <p className="text-2xl font-bold">{companions.length}</p>
//             </div>
//             <div>Companions created</div>
//           </div>
//         </div>
//       </section>
//        {/* Accordion without bookmarks */}
//       <Accordion type="multiple">
//         <AccordionItem value="recent">
//           <AccordionTrigger className="text-2xl font-bold">
//             Recent Sessions
//           </AccordionTrigger>
//           <AccordionContent>
//             <CompanionsList
//               title="Recent Sessions"
//               companions={sessionHistory}
//             />
//           </AccordionContent>
//         </AccordionItem>

//         <AccordionItem value="companions">
//           <AccordionTrigger className="text-2xl font-bold">
//             My Companions ({companions.length})
//           </AccordionTrigger>
//           <AccordionContent>
//             <CompanionsList title="My Companions" companions={companions} />
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//       {/* <Accordion type="multiple">
//         <AccordionItem value="bookmarks">
//           <AccordionTrigger className="text-2xl font-bold">
//             Bookmarked Companions {`(${bookmarkedCompanions.length})`}
//           </AccordionTrigger>
//           <AccordionContent>
//             <CompanionsList
//               companions={bookmarkedCompanions}
//               title="Bookmarked Companions"
//             />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="recent">
//           <AccordionTrigger className="text-2xl font-bold">
//             Recent Sessions
//           </AccordionTrigger>
//           <AccordionContent>
//             <CompanionsList
//               title="Recent Sessions"
//               companions={sessionHistory}
//             />
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="companions">
//           <AccordionTrigger className="text-2xl font-bold">
//             My Companions {`(${companions.length})`}
//           </AccordionTrigger>
//           <AccordionContent>
//             <CompanionsList title="My Companions" companions={companions} />
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion> */}
//     </main>
//   );
// };
// export default Profile;






// app/my-journey/page.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  // Fetch raw data
  const rawCompanions = await getUserCompanions(user.id);
  console.log('Raw Companions:', rawCompanions);
  const sessionHistory = await getUserSessions(user.id);

  // Deduplicate companions by id
 const companions = rawCompanions.filter(
  (c, i, arr) =>
    arr.findIndex(x => x.name === c.name) === i
);
console.log('Deduped Companions:', companions);


  return (
    <main className="min-lg:w-3/4">
      {/* User Header */}
      <section className="flex justify-between gap-4 max-sm:flex-col items-center mb-8">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-full"
          />
          <div className="flex flex-col gap-1">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-muted-foreground">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-4">
          <div className="border border-black rounded-lg p-3 flex flex-col items-center">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={22}
                height={22}
              />
              <p className="text-2xl font-bold">{sessionHistory.length}</p>
            </div>
            <span className="text-sm">Lessons completed</span>
          </div>
          <div className="border border-black rounded-lg p-3 flex flex-col items-center">
            <div className="flex gap-2 items-center">
              <Image src="/icons/cap.svg" alt="cap" width={22} height={22} />
              <p className="text-2xl font-bold">{companions.length}</p>
            </div>
            <span className="text-sm">Companions created</span>
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <Accordion type="multiple" className="space-y-4">
        {/* Recent Sessions */}
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>

        {/* My Companions */}
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions ({companions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;
