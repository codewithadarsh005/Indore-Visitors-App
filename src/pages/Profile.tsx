import { MapPin, Heart, Clock, Settings, ChevronRight, Camera, Edit2 } from "lucide-react";
import { Chatbot } from "@/components/Chatbot";

const savedPlaces = [
  { id: 1, name: "Rajwada Palace", category: "Heritage", savedAt: "2 days ago" },
  { id: 2, name: "Sarafa Bazaar", category: "Food", savedAt: "1 week ago" },
  { id: 3, name: "Lal Bagh Palace", category: "Heritage", savedAt: "2 weeks ago" },
];

const recentVisits = [
  { id: 1, name: "Khajrana Temple", visitedAt: "Yesterday" },
  { id: 2, name: "Chhappan Dukan", visitedAt: "3 days ago" },
  { id: 3, name: "Central Museum", visitedAt: "1 week ago" },
];

export default function Profile() {
  return (
    <div className="min-h-screen">
      {/* Profile Header */}
      <div className="bg-card rounded-2xl border border-border shadow-soft p-6 mb-6 animate-fade-in">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center border-4 border-card shadow-soft">
              <span className="text-3xl font-bold text-primary">T</span>
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-soft">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </button>
          </div>

          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl font-bold text-foreground">Tourist Explorer</h1>
            <p className="text-muted-foreground mb-4">Exploring Indore since January 2025</p>
            <div className="flex flex-wrap justify-center sm:justify-start gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-accent rounded-xl">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{savedPlaces.length} Saved</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-accent rounded-xl">
                <MapPin className="w-4 h-4 text-secondary" />
                <span className="text-sm font-medium text-foreground">{recentVisits.length} Visited</span>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
            <Edit2 className="w-4 h-4" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Saved Places */}
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden mb-6 animate-fade-in" style={{ animationDelay: "100ms" }}>
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-foreground">Saved Places</h2>
          </div>
          <button className="text-sm text-primary font-medium hover:underline">View All</button>
        </div>

        <div className="divide-y divide-border">
          {savedPlaces.map((place) => (
            <div
              key={place.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div>
                <h3 className="font-medium text-foreground">{place.name}</h3>
                <p className="text-sm text-muted-foreground">{place.category} • Saved {place.savedAt}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Visits */}
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden mb-6 animate-fade-in" style={{ animationDelay: "200ms" }}>
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-secondary" />
            <h2 className="font-semibold text-foreground">Recent Visits</h2>
          </div>
          <button className="text-sm text-primary font-medium hover:underline">View All</button>
        </div>

        <div className="divide-y divide-border">
          {recentVisits.map((visit) => (
            <div
              key={visit.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors cursor-pointer"
            >
              <div>
                <h3 className="font-medium text-foreground">{visit.name}</h3>
                <p className="text-sm text-muted-foreground">Visited {visit.visitedAt}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Settings */}
      <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden mb-6 animate-fade-in" style={{ animationDelay: "300ms" }}>
        <div className="px-6 py-4 border-b border-border flex items-center gap-2">
          <Settings className="w-5 h-5 text-muted-foreground" />
          <h2 className="font-semibold text-foreground">Quick Settings</h2>
        </div>

        <div className="divide-y divide-border">
          <div className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <span className="text-foreground">Notification Preferences</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <span className="text-foreground">Privacy Settings</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between px-6 py-4 hover:bg-accent/50 transition-colors cursor-pointer">
            <span className="text-foreground">Help & Support</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div className="mb-6">
        <Chatbot />
      </div>
    </div>
  );
}
