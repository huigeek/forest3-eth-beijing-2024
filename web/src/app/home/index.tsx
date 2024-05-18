"use client";

import SettingGoals from "~/app/home/components/setting-goals";

function Home() {
  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Logo
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Forest3 Focused Forest is a decentralized application (DApp) based on blockchain technology designed to help users improve self-discipline and achieve personal goals through financial incentives and community support.&rdquo;
            </p>
            <footer className="text-sm">Kirk Lin</footer>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Join or Create a Group
            </h1>
            <p className="text-sm text-muted-foreground">
              Collaborate with others to achieve your goals. Start by joining an existing group or creating your own.
            </p>
          </div>
          <SettingGoals />
          <p className="px-8 text-center text-sm text-muted-foreground">
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
