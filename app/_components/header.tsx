
import Link from "next/link";
import { FiSettings } from "react-icons/fi";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
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
  )
}

export default Header