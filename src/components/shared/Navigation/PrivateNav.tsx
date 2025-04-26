import React from "react";
import { Home, Users, Briefcase, MessageSquare, Bell } from "lucide-react";
import PageHeader from "../Layout/PageHeader";

const PrivateNav = () => {
  const navItems = [
    { icon: <Home className="w-5 h-5 mx-auto mb-1" />, label: "Home" },
    {
      icon: <Users className="w-5 h-5 mx-auto mb-1" />,
      label: "Connections",
    },
    { icon: <Briefcase className="w-5 h-5 mx-auto mb-1" />, label: "Jobs" },
    {
      icon: <MessageSquare className="w-5 h-5 mx-auto mb-1" />,
      label: "Messaging",
    },
    { icon: <Bell className="w-5 h-5 mx-auto mb-1" />, label: "Notification" },
  ];
  return (
    <PageHeader>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-5 text-black">
        {navItems.map(({ icon, label }, i) => (
          <a
            key={i}
            className="flex flex-col items-center justify-center px-4 py-2 text-sm font-medium leading-none hover:text-gray-400 focus:outline-hidden focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
            href="#"
          >
            {icon}
            {label}
          </a>
        ))}
      </div>
    </PageHeader>
  );
};

export default PrivateNav;
