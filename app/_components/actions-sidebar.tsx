import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";

import { Switch } from "@/components/ui/switch";


const platforms = [
    {
        name: "dev.to",
        logo: "/dev.to.png",
        connected: false,
      },
      {
          name: "hashnode",
          logo: "/hashnode.png",
          connected: true,
      },
    {
        name: "medium",
        logo: "/medium.png",
        connected: false,
    },

]

export function ActionsSidebar() {
  return (
    <Sidebar variant="sidebar" className="relative border-l border-r-0 border-grey-border w-[350px]">
      <SidebarHeader />
      <SidebarContent className="bg-transparent!">
        {/* Quick Capture */}
        <SidebarGroup className="border-b border-grey-border pb-4">
          <SidebarGroupLabel className="uppercase">
            Distrubution
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-col gap-4 mt-1 p-2">
            {platforms.map((platform) => (
                <div key={platform.name} className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 overflow-hidden rounded-lg">
                            <img src={platform.logo} alt={platform.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                             <p className="text-white text-sm font-semibold capitalize ">{platform.name}</p>
                             <p className="text-xs text-gray-400">{platform.connected ? "Connected" : "Not Connected"}</p>
                        </div>
                    </div>
                    <Switch className="bg-primary!" defaultChecked={platform.connected} />
                </div>
            ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        {/*  */}
        
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
