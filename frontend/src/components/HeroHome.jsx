import React from "react";

export const HeroHome = () => {
  return (
    <>
      <section className="relative bg-white dark:bg-gray-900">
        <div className="relative z-10 py-16 px-4 mx-auto max-w-screen-xl text-center lg:py-24">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-tight text-black md:text-5xl lg:text-6xl dark:text-white">
            Find Your Dream Job Today
          </h1>
          <p className="mb-6 text-lg font-medium text-gray-700 md:text-xl lg:text-2xl dark:text-gray-300">
            Connecting Talent with Opportunities Across the Nation for All Skill
            Levels
          </p>
          <p className="mb-8 text-base font-normal text-gray-500 md:text-lg lg:text-xl sm:px-8 lg:px-24 xl:px-48 dark:text-gray-400">
            Explore a vast array of job listings in diverse industries. Whether
            you&apos;re a seasoned professional or just starting out, find the
            perfect role to advance your career. Our platform makes job
            searching easy and efficient, bringing you closer to your next big
            opportunity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="/jobs"
              className="px-6 py-3 text-lg font-medium text-white bg-deepNavy hover:bg-deepNavy-hover rounded-md dark:bg-deepNavy dark:hover:bg-deepNavy-hover"
            >
              Explore Jobs
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
