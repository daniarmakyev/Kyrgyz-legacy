// import ProgressBar from '@/components/progressBar/page';
// import React from 'react'

// const progressBar = () => {
//     return (
//         <div className="bg-[#121F25] h-screen flex flex-col items-center self-center ms-auto me-auto">
//           <ProgressBar progress={3} heart={heart} />
//           {words && (
//             <div className="flex gap-5 mt-auto">
//               <span
//                 onClick={() => WordHover(`${BASE_URL}/${words[0].manSound}`)}
//                 key={words[0].id}
//                 className="cursor-pointer"
//               >
//                 {words[0].word}
//               </span>
//             </div>
//           )}
//           <div className="flex gap-3 flex-wrap max-w-96 items-center self-center ms-auto me-auto justify-center mt-40">
//             {randomedWords.map((item) => (
//               <p
//                 className={`cursor-pointer p-2 border-neutral-700 border-solid border-2 rounded-md ${
//                   userComparison.includes(item.wordId)
//                     ? "bg-[#DC2219] text-white"
//                     : "bg-[#121f25] text-white"
//                 }`}
//                 key={item.id}
//                 onClick={() => handleWordClick(item)}
//               >
//                 {getTranslation(item)}
//               </p>
//             ))}
//           </div>
//           <button onClick={handelCompare} className="mt-auto mb-24 ">
//             <span className="cursor-pointer">{t("check")}</span>
//           </button>
//         </div>
//       );
// }

// export default progressBar