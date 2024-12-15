"use client";

import { useState } from "react";
import { FC } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import { NavbarData } from "@/static/navbar";
import SearchEvent from "../Event/SearchEvent";

const Navbar: FC = () => {
  const { data: session } = useSession(); // Session for login status
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);
  const [eventId, setEventId] = useState<number | undefined>(undefined);

  const toggleSubMenu = () => setSubmenuOpen(!isSubmenuOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = async () => {
    await signOut();
  };

  // console.log("Session Data:", session);

  return (
    <header className="fixed z-50 flex w-full items-center justify-between bg-eventureMainBg px-8 py-4 md:px-56 md:py-2">
      {/* Logo and Search */}
      <div className="flex gap-8">
        <Link href="/">
          <div className="text-3xl font-bold text-white">Eventure</div>
        </Link>
        <SearchEvent eventId={eventId} setEventId={setEventId} />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex md:items-center">
        {session ? (
          <div
            className="relative flex items-center"
            onMouseEnter={() => setSubmenuOpen(true)}
            onMouseLeave={() => setSubmenuOpen(false)}
          >
            <button className="py-2 text-white">
              <FaUserCircle size={32} />
            </button>

            {isSubmenuOpen && (
              <div className="absolute top-14 right-0 z-50 w-48 rounded-lg bg-white shadow-lg">
                <div className="flex flex-col py-2 items-center"> {/* Centering submenu items */}
                  {/* Conditionally render "Register as Organizer" button */}
                  {session?.user.roles.includes("USER") && (
                    <Link href="/registerOrganizer">
                      <button className="cursor-pointer px-4 py-2 text-sm text-blue-500 hover:bg-gray-100 mb-2">
                        Register as Organizer
                      </button>
                    </Link>
                  )}
                  {NavbarData[0].submenu.map((submenu, index) => (
                    <Link href={submenu.link} key={index}>
                      <div className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        {submenu.title}
                      </div>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link href="/login">
              <button className="ml-4 rounded-md px-4 py-2 text-white hover:bg-gray-700">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="ml-2 rounded-md border border-white px-4 py-2 text-white hover:bg-gray-700">
                Register
              </button>
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 top-16 flex w-full flex-col gap-5 bg-white py-8 text-eventureMainBg shadow-lg md:hidden">
          {session ? (
            <>
              {/* Conditionally render "Register as Organizer" button in mobile view */}
              {session?.user.roles.includes("USER") && (
                <Link href="/registerOrganizer">
                  <button className="mx-8 text-center text-blue-500 hover:bg-gray-100 mb-2">
                    Register as Organizer
                  </button>
                </Link>
              )}
              {NavbarData[0].submenu.map((submenu, index) => (
                <Link href={submenu.link} key={index}>
                  <button className="px-8 text-left text-lg hover:bg-gray-100">
                    {submenu.title}
                  </button>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="mx-8 text-left text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="mx-8 text-left text-lg">Login</button>
              </Link>
              <Link href="/register">
                <button className="mx-8 text-left text-lg">Register</button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
