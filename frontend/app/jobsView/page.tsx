// export default function JobTable({ jobs }) {
//     return (
//       <div className="overflow-x-auto max-w-6xl mx-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded shadow">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 border-b text-left">Job Title</th>
//               <th className="py-2 px-4 border-b text-left">Description</th>
//               <th className="py-2 px-4 border-b text-left">Created By</th>
//               <th className="py-2 px-4 border-b text-left">Created Date</th>
//               <th className="py-2 px-4 border-b text-left">Organization</th>
//               <th className="py-2 px-4 border-b text-left">Location</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{job.title}</td>
//                 <td className="py-2 px-4 border-b">{job.description}</td>
//                 <td className="py-2 px-4 border-b">{job.createdBy}</td>
//                 <td className="py-2 px-4 border-b">{job.createdDate}</td>
//                 <td className="py-2 px-4 border-b">{job.organization}</td>
//                 <td className="py-2 px-4 border-b">{job.location}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
  