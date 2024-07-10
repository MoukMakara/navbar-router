import React, { useRef } from "react";
import Slider from "react-slick";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { sportClub } from "../../redux/apiMockUp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

const sports = [
  {
    title: "football",
    ref: "sliderRef3",
    sport_category: "football",
  },
  {
    title: "volleyball",
    ref: "sliderRef4",
    sport_category: "volleyball",
  },
  {
    title: "basketball",
    ref: "sliderRef2",
    sport_category: "basketball",
  },
  {
    title: "badminton",
    ref: "sliderRef1",
    sport_category: "badminton",
  },
];
// Your existing imports...

const SportClub = () => {
  const sliderRefs = useRef(
    sports.reduce((acc, sport) => {
      acc[sport.ref] = useRef(null);
      return acc;
    }, {})
  );

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const navigate = useNavigate();

  const handleProductDetails = (sportDetails) => {
    console.log("sportDetails when click: " + sportDetails);
    navigate("/sportclub-details", { state: sportDetails });
    console.log("sportclubDetails", sportDetails);
  };

  const renderCards = (clubs) =>
    clubs.map((club, index) => (
      <section className="relative max-w-screen-xl mx-auto" key={index}>
        <div
          onClick={() => handleProductDetails(club)}
          className="grid cursor-pointer justify-center items-center"
        >
          <Card className="w-96 mx-auto relative group pointer-event">
            <img
              src={club.image}
              alt={club.image}
              className="w-full object-cover h-64 rounded-md"
            />
            <div className="absolute text-white left-0 bottom-0 w-full h-2/4 bg-gradient-to-b from-transparent to-gray-900 rounded-md flex flex-col text-left transition-opacity duration-500 group-hover:opacity-100 opacity-0 pb-2">
              <h5 className="flex justify-center items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-2xl font-bold tracking-tight text-white dark:text-white mt-auto mb-5 bg-gradient-to-b from-[#000000] to-[#ffffff] bg-clip-text">
                {club.sport_name}
              </h5>
            </div>
          </Card>
        </div>
      </section>
    ));

  const renderSection = (title, sliderRef, clubs) => {
    const filteredClubs = clubs.filter((club) => club.sport_category === title);

    return (
      <div key={sliderRef} className="relative max-w-screen-2xl mx-auto ">
        <h2 className="font-bold xl:text-5xl md:text-3xl text-base mt-20 mb-5 ml-8">
          {title}
        </h2>
        <div className="relative xl:m-0 md:m-8 m-8">
          <button
            className="absolute shadow-md z-10 xl:left-[0px] md:left-[-22px] left-[-24px] top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-slate-200"
            onClick={() => sliderRefs.current[sliderRef].current.slickPrev()}
          >
            <FontAwesomeIcon className="text-[#222162]" icon={faAngleLeft} />
          </button>
          <Slider ref={sliderRefs.current[sliderRef]} {...settings}>
            {renderCards(filteredClubs)}
          </Slider>
          <button
            className="absolute shadow-md z-10 xl:right-[0px] md:right-[-22px] right-[-24px] top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-slate-200"
            onClick={() => sliderRefs.current[sliderRef].current.slickNext()}
          >
            <FontAwesomeIcon className="text-[#222162]" icon={faAngleRight} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="gap-2 mt-5 relative">
      {sports.map((sport) => renderSection(sport.title, sport.ref, sportClub))}
    </div>
  );
};

export default SportClub;
