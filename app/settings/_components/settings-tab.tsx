import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function SettingsTab() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-6">
      <Tabs defaultValue="Account" orientation="vertical" className="gap-5">
        <TabsList variant="line" className="w-40 shrink-0">
          {["Account", "Password", "Settings"].map((tab) => (
            <TabsTrigger className="text-[16px] text-white hover:text-gray-400" key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent className="w-full" value="Account">
          <Card className="bg-transparent border-grey-border">
            <CardHeader className="pb-3 border-b border-grey-border">
              <CardTitle className="text-white">AI Configuration</CardTitle>
              <CardDescription className="text-sm">
                Configure your LLM providers for content generation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="underline-vertical-name" className="text-sm text-white">
                  OpenAI API Key
                </Label>
                <Input
                  id="underline-vertical-name"
                  defaultValue="Michael Brown"
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="underline-vertical-email" className="text-sm text-white">
                  Anthropic API Key
                </Label>
                <Input
                  id="underline-vertical-email"
                  type="email"
                  defaultValue="michael.brown@example.com"
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="underline-vertical-groq" className="text-sm text-white">
                  Groq API Key
                </Label>
                <Input
                  id="underline-vertical-groq"
                  type="email"
                  defaultValue="michael.brown@example.com"
                  className="h-9"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <Button size="sm">Save changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Password">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Password</CardTitle>
              <CardDescription className="text-sm">
                Change your password here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="underline-vertical-current" className="text-sm">
                  Current password
                </Label>
                <Input
                  id="underline-vertical-current"
                  type="password"
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="underline-vertical-new" className="text-sm">
                  New password
                </Label>
                <Input
                  id="underline-vertical-new"
                  type="password"
                  className="h-9"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <Button size="sm">Update password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Settings">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Settings</CardTitle>
              <CardDescription className="text-sm">
                Manage your preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="underline-vertical-theme" className="text-sm">
                  Theme
                </Label>
                <Input
                  id="underline-vertical-theme"
                  defaultValue="Light"
                  className="h-9"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="underline-vertical-language"
                  className="text-sm"
                >
                  Language
                </Label>
                <Input
                  id="underline-vertical-language"
                  defaultValue="English"
                  className="h-9"
                />
              </div>
            </CardContent>
            <CardFooter className="pt-3">
              <Button size="sm">Save settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}