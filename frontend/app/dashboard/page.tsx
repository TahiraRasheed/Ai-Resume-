'use client';

import { useState } from 'react';
// import JobForm from '@/components/JobForm';
import JobTable from '@/app/jobs view/page';
import { PipelineSummary } from "@/app/pipeline-summary/page"
import { TopMatches } from "@/app/top-matches/page"
import { ParsingAccuracy } from "@/app/parsing-accuracy/page"
import { RoleCoverage } from "@/app/role-coverage/page"




export default function Home() {
  const [jobs, setJobs] = useState([]);

  // const handleAddJob = (job) => {
  //   setJobs([job, ...jobs]);
  // };


  return (
    <>
      <div className="grid grid-cols-12 gap-4 md:gap-6 mb-4">
        <div className="col-span-12 space-y-6">

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">

            <div className="rounded-2xl border border-gray-200 bg-[#BA02E1] p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <svg className="fill-gray-800 dark:fill-white/90" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-file-icon lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-sm text-black-500  ">Total Resumes Parsed</span>
                  <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
                    3,782
                  </h4>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#BA02E1] p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clipboard-list-icon lucide-clipboard-list"><rect width="8" height="4" x="8" y="2" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4" /><path d="M12 16h4" /><path d="M8 11h.01" /><path d="M8 16h.01" /></svg>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-sm text-black-500 ">Active Job Listing</span>
                  <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
                    26
                  </h4>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-[#BA02E1] p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <svg className="fill-gray-800 dark:fill-white/90" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.665 3.75621C11.8762 3.65064 12.1247 3.65064 12.3358 3.75621L18.7807 6.97856L12.3358 10.2009C12.1247 10.3065 11.8762 10.3065 11.665 10.2009L5.22014 6.97856L11.665 3.75621ZM4.29297 8.19203V16.0946C4.29297 16.3787 4.45347 16.6384 4.70757 16.7654L11.25 20.0366V11.6513C11.1631 11.6205 11.0777 11.5843 10.9942 11.5426L4.29297 8.19203ZM12.75 20.037L19.2933 16.7654C19.5474 16.6384 19.7079 16.3787 19.7079 16.0946V8.19202L13.0066 11.5426C12.9229 11.5844 12.8372 11.6208 12.75 11.6516V20.037ZM13.0066 2.41456C12.3732 2.09786 11.6277 2.09786 10.9942 2.41456L4.03676 5.89319C3.27449 6.27432 2.79297 7.05342 2.79297 7.90566V16.0946C2.79297 16.9469 3.27448 17.726 4.03676 18.1071L10.9942 21.5857L11.3296 20.9149L10.9942 21.5857C11.6277 21.9024 12.3732 21.9024 13.0066 21.5857L19.9641 18.1071C20.7264 17.726 21.2079 16.9469 21.2079 16.0946V7.90566C21.2079 7.05342 20.7264 6.27432 19.9641 5.89319L13.0066 2.41456Z" fill=""></path>
                </svg>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <span className="text-sm text-black-500 ">Pending Matches</span>
                  <h4 className="mt-2 text-title-sm font-bold text-gray-800 dark:text-white/90">
                    15
                  </h4>
                </div>


              </div>
            </div>
            {/* <JobForm onAddJob={handleAddJob} /> */}

          </div>
        </div>

      </div>


        <div className="grid grid-cols-1 gap-4 mb-4">
          <PipelineSummary />
        </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
      <TopMatches />

      <ParsingAccuracy />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
      <RoleCoverage />
        </div>
    </>
  )
}
