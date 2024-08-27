import React from "react";

export const TopNiches = () => {
  const services = [
    {
      id: 1,
      service: "Software Development",
      description:
        "Innovative software development services to build, maintain and upgrade applications, ensuring they meet the highest quality standards.",
    },

    {
      id: 2,
      service: "Web Development",
      description:
        "Comprehensive web development solutions from front-end design to back-end integration,delivering responsive and user-friendly websites. ",
    },
    {
      id: 3,
      service: "Data Science",
      description:
        "Advanced data science services to analyze and interpret complex data, providing actionable insights and data-driven solutions.",
    },
    {
      id: 4,
      service: "Cloud Computing",
      description:
        "Reliable cloud computing services to manage, store, and process data efficiently, offering scalable and flexible cloud solutions.",
    },
    {
      id: 5,
      service: "DevOps",
      description:
        "DevOps services to streamline software development and operations, enhancing deployment efficiency and reducing time to market. ",
    },
    {
      id: 6,
      service: "Mobile App Development",
      description:
        "Expert mobile app development for iOS and Android platforms,creating intuitive and engaging mobile experiences for your users. ",
    },
  ];

  return (
    <>
      <section className="py-16 px-4 mx-auto max-w-screen-xl text-center">
        <h3 className="text-2xl font-bold mb-8 text-deepNavy dark:text-deepNavy">
          Top Niches
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((element) => {
            return (
              <div
                className="bg-white dark:bg-charcoalBlack p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
                key={element.id}
              >
                <h4 className="text-xl font-semibold mb-4 text-deepNavy dark:text-deepNavy">
                  {element.service}
                </h4>
                <p className="text-gray-700 dark:text-gray-400">
                  {element.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
