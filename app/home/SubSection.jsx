import React from "react";
import Image from "next/image";
import { list } from "postcss";
import White from "./White";
import White1 from "./White1";

const SubSection = () => {
  return (
    <div>
      <Image
        src="/arrow.svg"
        alt="404"
        height={200}
        width={250}
        className="absolute z-[-2] ml-10 mt-4"
      />
      <div className="z-[-4] flex flex-col justify-center items-center w-[1280px] h-[832px] relative bg-gradient-to-r from-purple-500 via-purple-500 to-cyan-400">
        <Image
          src="/logo.svg"
          alt="404"
          width={50}
          height={50}
          className="m-4"
        />
        <div className="flex flex-col gap-3">
          <White />
          <div className="flex justify-center items-center">
            <button className="text-base z-8 px-5 py-3.5 bg-violet-500 justify-center items-center gap-2.5 inline-flex -mt-20 -mb-20 rounded-xl w-[200px] h-[50px] font-bold text-white">
              Get Started
            </button>
          </div>
          <White1 />
        </div>
      </div>
    </div>
  );
};

export default SubSection;
