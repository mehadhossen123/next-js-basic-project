"use client";

import { useEffect, useState } from "react";
import {
  Menu,
  X,
  
  Command,
  LayoutDashboard,
  Package,
  Users,
  BarChart3,
  Settings,
  User,
  CreditCard,
  LifeBuoy,
  LogOut,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar,  AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userLogout } from "@/app/service/logout";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

type NavLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

type MenuItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};


// Primary navigation links rendered in the center of the navbar.
const navLinks: NavLink[] = [
  { label: "Dashboard", href: "dashboard", icon: LayoutDashboard },
  { label: "Products", href: "products", icon: Package },
  { label: "Customers", href: "customers", icon: Users },
  { label: "Analytics", href: "analytics", icon: BarChart3 },
];

// Account section of the profile dropdown.
const profileMenuItems: MenuItem[] = [
  { label: "Profile", href: "profile", icon: User },
  { label: "Billing", href: "billing", icon: CreditCard },
  { label: "Settings", href: "settings", icon: Settings },
];

// Support section of the profile dropdown.
const supportMenuItems: MenuItem[] = [
  { label: "Support", href: "#support", icon: LifeBuoy },
];

// const currentUser = {
//   name: "Jordan Rivera",
//   email: "jordan@acme.com",
//   avatar: "/professional-headshot.png",
//   initials: "JR",
// };

// type declaration

type User = {
  success: boolean;
  successStatus: number;
  message: string;
  data: {
    profile: {
      id: string;
      name: string;
      email: string;
      activeStatus: string;
      role: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string | null;
        bio: string | null;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};
export type GetProfileResponse = {
 
  user:User
 
};






export function Navbar({ user }: GetProfileResponse) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState(navLinks[0]?.href);
 

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2" aria-label="Acme home">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Command className="size-4" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Prisma<span className="text-muted-foreground">Press</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setActiveHref(link.href)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Right side: profile dropdown + mobile toggle */}
        <div className="flex items-center gap-2">
          {(user?.data?.profile) ? <ProfileDropdown user={user} /> : <Link href={"/login"}>
          <Button>Login</Button></Link>}

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeHref === link.href;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => {
                      setActiveHref(link.href);
                      setMobileOpen(false);
                    }}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

function ProfileDropdown({user}:GetProfileResponse) {
   const [isLogin, setIsLogin] = useState(false);
   const router=useRouter()

   
  //  show toast message when user logged out
   useEffect(()=>{
    if(isLogin){
       toast.success("User logout successfully");
      
    }
   },[isLogin])
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center cursor-pointer gap-2 rounded-full py-1 pl-1 pr-1 outline-none transition-colors   sm:pr-2"
          aria-label="Open user menu"
        >
          <Avatar className="size-8">
            <AvatarImage
              // src={currentUser.avatar || "/placeholder.svg"}
              alt={user?.data?.profile?.name}
            />
            {/* <AvatarFallback>{currentUser.initials}</AvatarFallback> */}
          </Avatar>

          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-foreground">
              {user?.data?.profile?.name}
            </span>
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <div className="flex flex-col px-2 py-2">
          <span className="text-sm font-medium">
            {user?.data?.profile?.name}
          </span>
          <span className="text-xs text-muted-foreground">
            {/* ddd */}
           {user?.data?.profile?.email}
          </span>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {profileMenuItems.map((item) => {
            const Icon = item.icon;
           

            return (
              <DropdownMenuItem key={item.href} asChild>
                <a
                  href={item.href}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Icon className="size-4" />
                  {item.label}
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {supportMenuItems.map((item) => {
            const Icon = item.icon;

            return (
              <DropdownMenuItem key={item.href} asChild>
                <a
                  href={item.href}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <Icon className="size-4" />
                  {item.label}
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={async()=>{
          
          // user logout function
          await userLogout()
          setIsLogin(true)
          router.push("/login")

          

         
        }} className="cursor-pointer text-red-600 focus:text-red-600">
          <LogOut className="size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}