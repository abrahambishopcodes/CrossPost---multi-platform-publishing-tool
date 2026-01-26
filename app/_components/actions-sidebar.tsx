import { Input, InputWrapper } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import { FaPlus } from "react-icons/fa6";
import { ChevronDown } from "lucide-react";

const drafts = [
  {
    title: "The architecture behind facebook handling millions of users",
    lastEdited: "5 mins",
  },
  {
    title:
      "How react renders a component and updates the DOM with it's virtual DOM",
    lastEdited: "12 mins",
  },
];

export function ActionsSidebar() {
  return (
    <Sidebar variant="sidebar" className="relative border-l border-r-0 border-grey-border">
      <SidebarHeader />
      <SidebarContent className="bg-transparent!">
        {/* Quick Capture */}
        <SidebarGroup className="border-b border-grey-border pb-4">
          <SidebarGroupLabel className="uppercase">
            Quick Capture
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <InputWrapper className="bg-card-bg border-grey-border mt-1 w-full">
              <Input
                className="text-white!"
                placeholder="Caputure an Idea..."
              />
              <FaPlus className="hover:text-white cursor-pointer" />
            </InputWrapper>
          </SidebarGroupContent>
        </SidebarGroup>
        {/*  */}

        {/* Drafts */}
        <Collapsible defaultOpen className="">
          <SidebarGroup>
            <SidebarGroupLabel asChild className="uppercase">
              <CollapsibleTrigger className="w-full flex items-center justify-between">
                Drafts
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <CollapsibleContent>
              <div className="flex flex-col gap-2 mt-1">
                {drafts.map((draft, i) => (
                  <div
                    className={cn(
                      "w-full p-2 rounded-lg h-16 flex flex-col justify-center",
                      i === 0 && "bg-[#18171A] border border-grey-border",
                    )}
                  >
                    <h2 className="w-full truncate text-gray-200">
                      {draft.title}
                    </h2>
                    <p className="text-xs text-gray-400">
                      Edited {draft.lastEdited} ago
                    </p>
                  </div>
                ))}
              </div>
              </CollapsibleContent>
            </SidebarGroupContent>
          </SidebarGroup>
        </Collapsible>
        {/*  */}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
