import { FaHome, FaUser } from "react-icons/fa";
import { ReactElement } from "react";

const navLinks: Array<{
  name: string;
  icon: ReactElement;
  link: string;
}> = [
  {
    name: "Home",
    icon: <FaHome className="w-5 h-5" />,
    link: "",
  },
  {
    name: "My Profile",
    icon: <FaUser className="w-5 h-5" />,
    link: "profile",
  },
];

export default navLinks;
