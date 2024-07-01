import { Button, Navbar } from "flowbite-react";
import { list } from "postcss";
import { useState } from "react";
import { Link } from "react-router-dom";

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
    <Navbar fluid rounded className="max-w-screen-2xl mx-auto">
      <Navbar.Brand as={Link} to={list.path}>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          SportHub
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Button>ចូល</Button>
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
            >
              {list.name}
            </Navbar.Link>
          );
        })}
      </Navbar.Collapse>
    </Navbar>
  );
}
