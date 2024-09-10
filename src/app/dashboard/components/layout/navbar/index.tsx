"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Notification from "../../../../../../public/icons/notifications.svg";

// Function to parse cookies into an object
const parseCookies = (): Record<string, string> => {
  return document.cookie.split("; ").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=");
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {} as Record<string, string>);
};

const navlinks = [
  {
    route: "For Sale",
    link: "",
    id: "dashboard",
  },
  {
    route: "Rent",
    link: "",
    id: "rent",
  },
  {
    route: "Short Let",
    link: "/",
    id: "short let",
  },
];

interface UserNavbarProps {
  className?: string; // Explicitly typing the className prop as string
}

// useEffect(() => {
//   const fetchData = async () => {
//     if (token) {
//       const base64Url = token.split(".")[1];
//       const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//       const jsonPayload = decodeURIComponent(
//         atob(base64)
//           .split("")
//           .map(function (c) {
//             return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//           })
//           .join("")
//       );
//       console.log(JSON.parse(jsonPayload)); // This will show the contents of the token
//     }
//     try {
//       const response = await axios.get(
//         `https://housinn.onrender.com/api/users/search/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const userData = response.data;
//       setUserData(userData);

//       setLoading(false);
//       console.log(userData);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   fetchData();
// }, [id, token]);

const UserNavbar: React.FC<UserNavbarProps> = ({ className }) => {
  const pathname = usePathname();
  const currentPath = pathname?.split("/")[2];

  // Parse cookies to get the user data
  const cookies = parseCookies();
  const firstName = cookies.firstName || "User"; // Get the firstName from cookies or fallback to 'User'

  return (
    <nav
      className={` ${className} bg-white px-[74px] py-2.5 md:left-[220px] lg:left-[252px] w-full`}
      role="navbar"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex w-full justify-between gap-1">
          <div className="flex items-center justify-between gap-1">
            {navlinks.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className={`text-base font-semibold transition-all p-[10px] duration-200 text-gray-500 hover:text-primary ${
                  currentPath === item.id ? "text-primary" : "text-gray-500"
                }`}
              >
                {item.route}
              </Link>
            ))}
          </div>
          <Link href={`/`}>
            <Image
              src={`/icons/logo.svg`}
              alt="Housinn logo"
              width={80}
              height={48}
            />
          </Link>
          <div className="flex gap-5">
            <Image src={Notification} alt="info" width={20} height={21} />
            <div className="w-[115px] border-[1.5px] border-gray-600 rounded-3xl flex gap-2.5 justify-center items-center ">
              <img
                src="/icons/profile.svg"
                className="w-[18px] h-[18px]"
                alt=""
              />

              <span className="text-sm text-gray-600">{firstName}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;
