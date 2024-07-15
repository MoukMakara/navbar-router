import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { Card } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSportclubs,
  selectAllSportclubs,
} from "../../redux/feature/sportclub/SportClubSlice";
import Map from "../sport-club/Map";

const sports = [
  { title: "កីឡាបាល់ទាត់", ref: "sliderRef3", sport_category_name: "football" },
  { title: "កីឡាបាល់ទះ", ref: "sliderRef4", sport_category_name: "volleyball" },
  {
    title: "កីឡាបាល់បោះ",
    ref: "sliderRef2",
    sport_category_name: "basketball",
  },
  { title: "កីឡាវាយសី", ref: "sliderRef1", sport_category_name: "badminton" },
];

const SportClub = () => {
  const dispatch = useDispatch();
  const sportclubs = useSelector(selectAllSportclubs);

  useEffect(() => {
    dispatch(fetchSportclubs());
  }, [dispatch]);

  // button prevArrow and button nextArrow
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
    autoplaySpeed: 1500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const navigate = useNavigate();

  const handleProductDetails = (sportDetails) => {
    if (!sportDetails) {
      console.error("Sport details are missing!");
      return;
    }
    navigate("/sportclub-details", { state: sportDetails });
  };

  const renderCards = (clubs) =>
    clubs.map((club, index) => (
      <section className="relative max-w-screen-xl mx-auto" key={index}>
        <div className="grid cursor-pointer justify-center items-center">
          <Card
            onClick={() => handleProductDetails(club)}
            className="max-w-96 mx-auto relative group pointer-event"
          >
            <img
              src={club.image}
              alt={club.image}
              className="w-96 object-cover h-64 rounded-md"
            />
            <div className="absolute text-white left-0 bottom-0 w-full h-2/4 bg-gradient-to-b from-transparent to-gray-900 rounded-md flex flex-col text-left transition-opacity duration-500 group-hover:opacity-100 opacity-0 pb-2">
              <h5 className="flex justify-center items-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-2xl font-bold tracking-tight text-white dark:text-white mt-auto mb-5 bg-gradient-to-b from-[#000000] to-[#ffffff] bg-clip-text">
                {club.sport_name}
              </h5>
            </div>
          </Card>
        </div>
      </section>
    ));

  const renderSection = (sport, sliderRef, clubs) => {
    const filteredClubs = clubs.filter(
      (club) => club.sport_category_name === sport.sport_category_name
    );
    console.log(
      `Filtered Clubs for ${sport.sport_category_name}: `,
      filteredClubs
    ); // Add this line
    return (
      <div key={sliderRef} className="relative max-w-screen-xl mx-auto">
        <h2 className="font-bold text-[#172554] xl:text-5xl md:text-3xl text-base mt-20 mb-5 ml-8">
          {sport.title}
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
    <>
      {/* HERO SECTION */}
      {/* <header className="relative">
        <img
          className="object-cover h-[585px] w-full top-0 -z-30"
          src={Hero}
          alt="Background image description"
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        />
        <div className="w-10/12 mx-auto">
          <div className="absolute top-[430px] text-white font-extrabold">
            <div className="inline-block">
              <h1 className="text-[56px]">ក្លឹបកីឡា</h1>
            </div>
          </div>
        </div>
      </header> */}
      {/* END OF SECTION */}
      <div className="gap-2 my-10 w-11/12 mx-auto relative">
        {sports.map((sport) => renderSection(sport, sport.ref, sportclubs))}
      </div>
      <div className="flex justify-center items-center mb-4">
        <Map />
      </div>
    </>
  );
};

export default SportClub;
