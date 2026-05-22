import Link from "next/link";
import React from "react";

interface NavLinkProps {
  href: string,
  children: React.ReactNode
}

const NavLink = ({ href, children }: NavLinkProps) => {
  return (
    <Link href={href} className="hover:text-blue-400">
      {children}
    </Link>
  )
}

export default NavLink