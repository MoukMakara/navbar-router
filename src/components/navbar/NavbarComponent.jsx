import { Button, Navbar } from "flowbite-react";
import { list } from "postcss";
import { useState } from "react";
import { Link } from "react-router-dom";
// import logo from "../navbar/assets/SportHubLogo.png";
import logo from "../../assets/SportHubLogo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

export function NavbarComponent() {
  const [navbarList, setNavbarList] = useState([
    {
      name: "",
      path: "/",
      // active: true,
    },
    // {
    //   name: "Home",
    //   path: "/home",
    //   active: false,
    // },
    {
      name: "អំពីយើង",
      path: "/about-us",
      active: true,
    },
    {
      name: "ក្លឹបកីឡា",
      path: "/sport-club",
      active: false,
    },
    {
      name: "ព្រឹត្តិការណ៍",
      path: "/events",
      active: false,
    },
    {
      name: "ព័ត៌មាន",
      path: "/news",
      active: false,
    },
    {
      name: "ប្រវត្តិកីឡា",
      path: "/history",
      active: false,
    },
  ]);
  // icon search
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [iconColor, setIconColor] = useState("text-white");

  const handleIconClick = () => {
    setShowSearchBar(!showSearchBar);
    setIconColor(showSearchBar ? "text-white" : "text-black");
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // handle on click
  const handleClick = (item) => {
    setNavbarList((lists) => {
      //   console.log(lists);
      return lists.map((list) => {
        if (list.name === item.name) {
          return {
            ...list,
            active: true,
          };
        } else {
          return {
            ...list,
            active: false,
          };
        }
      });
    });
  };
  console.log(navbarList);
  return (
    <section className="relative max-w-screen-2xl mx-auto ">
      <Navbar fluid rounded className="rounded-b-lg z-10 backdrop-blur	">
        <Navbar.Brand as={Link} to={list.path}>
          <span className="absolute inset-0 bg-gray-900 opacity-20 blur-[2px] rounded-b-lg -z-10"></span>
          <div className="ml-[7px] opacity-[100%]">
            <img className="w-[40px]" src={logo} alt="SportHub Logo" />
          </div>
        </Navbar.Brand>

        <div className="flex md:order-2">
          <div className="relative">
            <i
              className={`fa-solid fa-magnifying-glass z-10 cursor-pointer absolute top-1/2 right-4 text-slate-900  transform -translate-y-1/2 ${iconColor}`}
              onClick={handleIconClick}
            ></i>
            {showSearchBar && (
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                className="pl-10 pr-3 py-2 rounded border border-gray-300  text-slate-900"
                placeholder="Search..."
              />
            )}
          </div>

          <Button className="font-extrabold" as={Link} to={"/login"}>
            ចូល
          </Button>
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          {navbarList.map((list, index) => {
            return (
              <Navbar.Link
                onClick={() => handleClick(list)}
                as={Link}
                to={list.path}
                active={list.active}
                key={index}
                className="font-extrabold text-black"
              >
                {list.name}
              </Navbar.Link>
            );
          })}
        </Navbar.Collapse>
      </Navbar>
    </section>
  );
}
