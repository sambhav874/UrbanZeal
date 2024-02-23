"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();
  console.log(path);
  return (
    <div className="flex mx-auto justify-center gap-2 tabs items-center">
        
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>

          <Link
            className={path === "/subcategories" ? "active" : ""}
            href={"/subcategories"}
          >
            SubCategories
          </Link>

          <Link
            className={path.includes('store-items') ? "active" : ""}
            href={"/store-items"}
          >
            Store Items
          </Link>

          <Link className={path === "/users" ? "active" : ""} href={"/users"}>
            Users
          </Link>
        </>
      )}
    </div>
  );
}
