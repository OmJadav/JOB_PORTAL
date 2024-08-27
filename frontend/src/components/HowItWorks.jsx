import React from "react";
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

export const HowItWorks = () => {
  return (
    <>
      <section className="py-16 px-4 mx-auto max-w-screen-xl   bg-white dark:bg-gray-900">
        <h3 className="text-3xl font-bold text-center mb-12 text-deepNavy dark:text-deepNavy">
          How Does It Work?
        </h3>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white dark:bg-charcoalBlack p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="text-4xl mb-4 text-deepNavy dark:text-deepNavy">
              <LuUserPlus />
            </div>
            <h4 className="text-xl font-semibold mb-4 text-deepNavy dark:text-deepNavy">
              Create an Account
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Sign up for a free account as a job seeker or employer. Set up
              your profile in minutes to start posting jobs or applying for
              jobs. Customize your profile to highlight your skills or
              requirements.
            </p>
          </div>
          <div className="bg-white dark:bg-charcoalBlack p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="text-4xl mb-4 text-deepNavy dark:text-deepNavy">
              <VscTasklist />
            </div>
            <h4 className="text-xl font-semibold mb-4 text-deepNavy dark:text-deepNavy">
              Post or Browse Jobs
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Employers can post detailed job descriptions, and job seekers can
              browse a comprehensive list of available positions. Utilize
              filters to find jobs that match your skills and preferences.
            </p>
          </div>
          <div className="bg-white dark:bg-charcoalBlack p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="text-4xl mb-4 text-deepNavy dark:text-deepNavy">
              <BiSolidLike />
            </div>
            <h4 className="text-xl font-semibold mb-4 text-deepNavy dark:text-deepNavy">
              Hire or Get Hired
            </h4>
            <p className="text-gray-700 dark:text-gray-400">
              Employers can shortlist candidates and extend job offers. Job
              seekers can review job offers and accept positions that align with
              their career goals.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
