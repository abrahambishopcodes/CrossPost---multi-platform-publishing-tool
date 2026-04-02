import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import CoverUpload from "@/app/_components/cover-upload";
import { ActionsSidebar } from "./_components/actions-sidebar";
import { Input } from "@/components/ui/input";
import Editor from "./_components/editor";


const Home = () => {
  return (
    <section className="h-screen flex flex-col">
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
