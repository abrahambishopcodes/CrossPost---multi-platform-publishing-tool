import { SettingsTab } from "./_components/settings-tab"

const SettingsPage = () => {
  return (
    <div className="w-full h-full flex-center p-4">
      <div className="w-full max-w-4xl">
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-neutral-400 mt-1">Manage your api keys, integrations, and publishing preferences.</p>

        <div className="mt-10">
          <SettingsTab />
        </div>
      </div>
    </div>
  )
}

export default SettingsPage