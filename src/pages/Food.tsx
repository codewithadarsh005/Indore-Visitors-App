import { useState } from "react";
import { Search, Star, MapPin, Clock, Flame, Coffee, IceCream } from "lucide-react";
import sarafaImg from "@/assets/sarafa.jpg";
import pohaImg from "@/assets/poha.jpg";
import dalBaflaImg from "@/assets/dal-bafla.jpg";
import garaduImg from "@/assets/garadu.jpg";
import bhutteKeesImg from "@/assets/bhutte-kees.jpg";
import shikanjiImg from "@/assets/shikanji.jpg";
import malpuaImg from "@/assets/malpua.jpg";
import { FilterPills } from "@/components/FilterPills";

const foodItems = [
  { id: 1, name: "Poha Jalebi", location: "Sarafa Bazaar", rating: 4.9, timing: "7 AM - 11 AM", category: "Breakfast", description: "Indore's iconic breakfast combo", spicy: false, image: pohaImg },
  { id: 2, name: "Dal Bafla", location: "Chhappan Dukan", rating: 4.7, timing: "11 AM - 10 PM", category: "Main Course", description: "Traditional MP specialty with ghee", spicy: false, image: dalBaflaImg },
  { id: 3, name: "Garadu", location: "Sarafa Bazaar", rating: 4.8, timing: "8 PM - 2 AM", category: "Street Food", description: "Spiced yam fries, winter specialty", spicy: true, image: garaduImg },
  { id: 4, name: "Bhutte Ka Kees", location: "Chhappan Dukan", rating: 4.6, timing: "6 PM - 11 PM", category: "Street Food", description: "Grated corn cooked in milk & spices", spicy: true, image: bhutteKeesImg },
  { id: 5, name: "Shikanji", location: "Sarafa Bazaar", rating: 4.8, timing: "8 PM - 2 AM", category: "Beverages", description: "Famous Indori lemonade with masala", spicy: false, image: shikanjiImg },
  { id: 6, name: "Malpua Rabdi", location: "Khau Gali", rating: 4.9, timing: "9 PM - 1 AM", category: "Desserts", description: "Sweet pancakes with condensed milk", spicy: false, image: malpuaImg },
];

const categories = ["All", "Breakfast", "Street Food", "Main Course", "Beverages", "Desserts"];

export default function Food() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredFood = foodItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || item.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Food in Indore</h1>
        <p className="text-muted-foreground">Taste the flavors of India's cleanest city</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search food, dishes..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     transition-all duration-200 shadow-soft"
          />
        </div>

        <FilterPills
          filters={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFood.map((item, index) => (
          <div
            key={item.id}
            className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden
                     hover:shadow-card transition-all duration-300 cursor-pointer group
                     animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {item.category === "Beverages" ? (
                      <Coffee className="w-6 h-6 text-primary" />
                    ) : item.category === "Desserts" ? (
                      <IceCream className="w-6 h-6 text-primary" />
                    ) : (
                      <Flame className={`w-6 h-6 ${item.spicy ? "text-destructive" : "text-primary"}`} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <span className="text-xs text-muted-foreground">{item.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-accent rounded-full px-2 py-1">
                  <Star className="w-3 h-3 fill-secondary text-secondary" />
                  <span className="text-xs font-medium">{item.rating}</span>
                </div>
              </div>

              <p className="text-muted-foreground text-sm mb-4">{item.description}</p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{item.timing}</span>
                </div>
              </div>

              {item.spicy && (
                <div className="mt-3 inline-flex items-center gap-1 px-2 py-1 bg-destructive/10 rounded-full">
                  <Flame className="w-3 h-3 text-destructive" />
                  <span className="text-xs font-medium text-destructive">Spicy</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {filteredFood.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <p className="text-muted-foreground">No food items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
