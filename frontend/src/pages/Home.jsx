import React from "react";
import { HeroHome } from "../components/HeroHome";
import { TopNiches } from "../components/TopNiches";
import { HowItWorks } from "../components/HowItWorks";
import backendUrl from "../utils/urlHelper";

export const Home = () => {
  return (
    <>
      <HeroHome />
      <TopNiches />
      <HowItWorks />
    </>
  );
};
