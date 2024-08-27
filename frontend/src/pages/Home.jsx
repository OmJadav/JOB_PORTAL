import React from "react";
import { HeroHome } from "../components/HeroHome";
import { TopNiches } from "../components/TopNiches";
import { HowItWorks } from "../components/HowItWorks";

export const Home = () => {
  return (
    <>
      <HeroHome />
      <TopNiches />
      <HowItWorks />
    </>
  );
};
