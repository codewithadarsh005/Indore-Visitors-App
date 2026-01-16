import { Bell, Globe, Moon, Shield, Smartphone, Volume2, ChevronRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

const settingsSections = [
  {
    title: "Notifications",
    items: [
      { id: "push", label: "Push Notifications", description: "Get alerts for nearby attractions", icon: Bell, type: "toggle" },
      { id: "sound", label: "Sound", description: "Play sound for notifications", icon: Volume2, type: "toggle" },
    ],
  },
  {
    title: "Preferences",
    items: [
      { id: "language", label: "Language", description: "English", icon: Globe, type: "link" },
      { id: "theme", label: "Dark Mode", description: "Switch to dark theme", icon: Moon, type: "toggle" },
      { id: "offline", label: "Offline Maps", description: "Download maps for offline use", icon: Smartphone, type: "link" },
    ],
  },
  {
    title: "Privacy & Security",
    items: [
      { id: "location", label: "Location Services", description: "Allow access to your location", icon: Shield, type: "toggle" },
      { id: "data", label: "Data Usage", description: "Manage your data preferences", icon: Shield, type: "link" },
    ],
  },
];

export default function Settings() {
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({
    push: true,
    sound: false,
    theme: false,
    location: true,
  });

  const handleToggle = (id: string) => {
    setToggleStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Customize your experience</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingsSections.map((section, index) => (
          <div
            key={section.title}
            className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="px-6 py-4 border-b border-border">
              <h2 className="font-semibold text-foreground">{section.title}</h2>
            </div>

            <div className="divide-y divide-border">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{item.label}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>

                    {item.type === "toggle" ? (
                      <Switch
                        checked={toggleStates[item.id] || false}
                        onCheckedChange={() => handleToggle(item.id)}
                        className="data-[state=checked]:bg-primary"
                      />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>Indore Tourist Companion v1.0.0</p>
        <p className="mt-1">Made with ♥ for the cleanest city in India</p>
      </div>
    </div>
  );
}
