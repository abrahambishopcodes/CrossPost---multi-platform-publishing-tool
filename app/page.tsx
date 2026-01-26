import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import CoverUpload from "@/app/_components/cover-upload";
import { ActionsSidebar } from "./_components/actions-sidebar";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <section className="h-screen flex flex-col">
      <header className="w-full min-h-16 border-b border-grey-border flex items-center justify-between px-4">
        <h2 className="text-lg flex items-center gap-1">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex-center text-xl font-bold">
            C
          </div>
          CrossPost
        </h2>

        <div>
          <Button className="bg-white text-black hover:bg-primary hover:text-white">
            Publish Now
          </Button>
        </div>
      </header>

      <SidebarProvider>
        <div className="flex w-full">
          <AppSidebar />
          <main className="p-4 w-full flex flex-col items-center">
            {/* Upload image */}
            <CoverUpload className="max-w-[800px]" />

            {/*  */}
            <Input defaultValue="Write Title Here" placeholder="Blog Title" className="w-full text-white text-4xl font-semibold p-0 mt-6 border-none focus:border-none focus-visible:ring-0 py-2" />

          </main>
          <ActionsSidebar />
        </div>
      </SidebarProvider>
    </section>
  );
};

export default Home;
