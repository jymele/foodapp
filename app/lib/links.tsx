import { House, UserRoundPen, Gauge } from "lucide-react";

type LinkType = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export const links: LinkType[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <Gauge className="w-6 h-6" />,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: <UserRoundPen className="w-6 h-6" />,
  },
  {
    href: "/dashboard/household",
    label: "Household",
    icon: <House className="w-6 h-6" />,
  },
];
