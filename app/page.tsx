import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import CoverUpload from "@/app/_components/cover-upload";
import { ActionsSidebar } from "./_components/actions-sidebar";
import { Input } from "@/components/ui/input";
import Editor from "./_components/editor";
import Link from "next/link";

import { FiSettings } from "react-icons/fi";

const Home = () => {
  return (
    <section className="h-screen flex flex-col">
      <header className="w-full min-h-16 border-b border-grey-border flex items-center justify-between px-4 sticky top-0 z-50 bg-background">
        <h2 className="text-lg flex items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex-center text-xl font-bold">
            C
          </div>
          CrossPost
        </h2>

        <div className="flex items-center gap-2">
          <Button className="bg-white text-black hover:bg-primary hover:text-white">
            Publish Now
          </Button>
          <Link href="/settings">
            <FiSettings
              className="text-neutral-400 hover:text-white cursor-pointer transition-all"
              size={18}
            />
          </Link>
        </div>
      </header>

      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="p-4 w-full flex flex-col items-center px-14">
            {/* Upload image */}
            <CoverUpload className="w-full" />

            {/*  */}
            <Input
              defaultValue="Write Title Here"
              placeholder="Blog Title"
              className="max-w-full text-white text-4xl font-semibold p-0 mt-6 border-none focus:border-none focus-visible:ring-0 py-2"
            />

            <Editor />
          </main>
          <ActionsSidebar />
        </div>
      </SidebarProvider>
    </section>
  );
};

export default Home;
