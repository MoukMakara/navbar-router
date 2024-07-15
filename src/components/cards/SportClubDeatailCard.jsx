import React from "react";
import { FaTelegram, FaFacebook, FaGlobe } from "react-icons/fa6";
import "tailwindcss/tailwind.css";

function SportClubDetailCard({
  image,
  sport_name,
  description,
  price,
  first_phone,
  second_phone,
  facebook,
  telegram,
  website,
}) {
  const formattedWebsite =
    website && !/^https?:\/\//i.test(website) ? `http://${website}` : website;

  return (
    <div className="flex flex-col lg:flex-row w-[80vw] lg:w-[60vw] h-[80vh] lg:h-[600px] p-4 lg:p-10 border border-gray-100 rounded-xl shadow-md">
      <div className="w-full lg:w-1/2 h-[40vh] lg:h-full">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={image || "Unknown"}
          alt={sport_name}
        />
      </div>
      <div className="mt-8 lg:mt-0 lg:ml-16 w-full lg:w-1/2 flex flex-col justify-center items-start">
        <h1 className="mb-4 lg:mb-8 text-2xl lg:text-4xl text-black-900 font-bold font-[Poppins]">
          {sport_name}
        </h1>
        <hr className="w-full border-t-3 border-gray-800 mb-4 lg:mb-8" />
        <p className="mb-4 text-sm lg:text-lg font-[Koh Santepheap] text-slate-500">
          {description || "No description"}
        </p>
        <p className="my-2 text-sm lg:text-lg font-medium text-blue-900">
          Price: {price || "Unknown"}
        </p>
        <p className="my-2 text-sm lg:text-lg font-medium text-blue-900">
          Telephone: {first_phone} / {second_phone}
        </p>
        <div className="my-2 text-sm lg:text-lg font-medium text-blue-900 flex items-center">
          Contact:
          {facebook && (
            <a href={facebook} target="_blank" rel="noopener noreferrer">
              <FaFacebook className="ml-2 lg:ml-4 text-blue-700 text-xl lg:text-2xl" />
            </a>
          )}
          {telegram && (
            <a href={telegram} target="_blank" rel="noopener noreferrer">
              <FaTelegram className="ml-2 lg:ml-4 text-blue-700 text-xl lg:text-2xl" />
            </a>
          )}
          {formattedWebsite && (
            <a
              href={formattedWebsite}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGlobe className="ml-2 lg:ml-4 text-blue-700 text-xl lg:text-2xl" />
            </a>
          )}
        </div>
        <hr className="w-full border-t-3 border-gray-800 mt-4 lg:mt-8" />
      </div>
    </div>
  );
}

export default SportClubDetailCard;
