import { SideBarConfig } from "@/constants/sideBarConfig";
import { twMerge } from "tailwind-merge";

interface SidebarProps {
  children?: React.ReactNode;
  open: boolean;
}

const Sidebar = ({ open }: SidebarProps) => {
  return (
    <div
      className={twMerge(
        " w-64 overflow-x-hidden ",
        !open && "w-0 ",
        "transition-all duration-300 ease-in-out"
      )}
    >
      <div className="p-2">
        {SideBarConfig.map(
          (item) =>
            item.roles.includes("admin") && (
              <div key={item.name} className="p-2">
                <div className="flex items-center">
                  <div className="mr-2">
                    <item.Icon />
                  </div>
                  <div className="truncate">{item.name}</div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
