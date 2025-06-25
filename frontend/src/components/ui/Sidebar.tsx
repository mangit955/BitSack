import { SidebarItem } from "./Sidebaritem";
import { YoutubeIcon } from "../../icons/youtube";
import { XIcon } from "../../icons/x";
import { Logo } from "../../icons/logo";

export function Sidebar() {
  return (
    <div className=" h-screen bg-white border-r-3 border-slate-200 w-72 absolute left-0 top-0 pl-6">
      <div className="flex text-2xl pt-8 items-center">
        <div className="pr-4">
          <Logo />
        </div>
        Bitsack
      </div>
      <div className="pt-8 pl-4 ">
        <SidebarItem text="X" icon={<XIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}
