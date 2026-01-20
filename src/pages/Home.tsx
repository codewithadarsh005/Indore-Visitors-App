import { useState, useEffect } from "react";
import { Shield, Building2, HeartPulse, Thermometer, Sun, Moon, CloudSun, Cloud, CloudRain } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { AttractionCard } from "@/components/AttractionCard";
import { ServiceCard } from "@/components/ServiceCard";
import { FilterPills } from "@/components/FilterPills";
import { NearMeToggle } from "@/components/NearMeToggle";
import { MapPlaceholder } from "@/components/MapPlaceholder";
import { useNavigate } from "react-router-dom";
import indoreSkyline from "@/assets/indore-skyline.jpg";
import rajwadaImg from "@/assets/rajwada.jpg";
import sarafaImg from "@/assets/sarafa.jpg";
import lalbaghImg from "@/assets/lalbagh.jpg";
import khajranaImg from "@/assets/khajrana.jpg";
import museumImg from "@/assets/museum.jpg";
import patalpaniImg from "@/assets/patalpani.jpg";

const attractions = [
  { id: 1, name: "Rajwada Palace", image: rajwadaImg, distance: "2.5 km", category: "Heritage", rating: 4.7 },
  { id: 2, name: "Sarafa Bazaar", image: sarafaImg, distance: "1.8 km", category: "Food", rating: 4.9 },
  { id: 3, name: "Lal Bagh Palace", image: lalbaghImg, distance: "4.2 km", category: "Heritage", rating: 4.6 },
  { id: 4, name: "Khajrana Temple", image: khajranaImg, distance: "6.1 km", category: "Temple", rating: 4.8 },
  { id: 5, name: "Central Museum", image: museumImg, distance: "3.0 km", category: "Heritage", rating: 4.4 },
  { id: 6, name: "Patalpani Waterfall", image: patalpaniImg, distance: "35 km", category: "Trending", rating: 4.5 },
];

const nearbyServices = [
  { id: 1, title: "Emergency Services", description: "24/7 helpline available", icon: Shield },
  { id: 2, title: "Police Stations", description: "5 stations nearby", icon: Building2 },
  { id: 3, title: "Hospitals", description: "MY Hospital, CHL", icon: HeartPulse },
];

const filters = ["All", "Food", "Markets", "Events", "Heritage", "Trending"];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", icon: Sun };
  if (hour < 17) return { text: "Good Afternoon", icon: CloudSun };
  return { text: "Good Evening", icon: Moon };
}

export default function Home() {
  const [nearMeEnabled, setNearMeEnabled] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [temperature, setTemperature] = useState(28);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;
  const navigate = useNavigate();

  const filteredAttractions = attractions.filter((attraction) => {
    if (activeFilter === "All") return true;
    return attraction.category === activeFilter;
  });

  const handleAttractionClick = (attractionId: number) => {
    navigate(`/attraction/${attractionId}`);
  };

  // Weather API integration
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Indore&appid=c371a1590d8f8d8e1a1590d8f8ddfb986e774845d7968e774845d7968&units=metric`
        );
        const data = await response.json();
        
        if (response.ok) {
          const weatherData = {
            temperature: Math.round(data.main.temp),
            condition: data.weather[0].main,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            icon: data.weather[0].icon
          };
          setWeather(weatherData);
          setTemperature(weatherData.temperature);
        } else {
          console.error('Weather API error:', data);
        }
      } catch (error) {
        console.error('Weather fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-2xl mb-8">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: `url(${indoreSkyline})` }}
        />
        <div className="relative heritage-gradient rounded-2xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GreetingIcon className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium">{greeting.text}</span>
            </div>
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary border-t-transparent"></div>
              ) : weather ? (
                <div className="flex items-center gap-2">
                  {weather.icon === 'Clouds' ? (
                    <CloudRain className="w-4 h-4 text-secondary" />
                  ) : weather.icon === 'Clear' ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Cloud className="w-4 h-4 text-secondary" />
                  )}
                  <span className="text-sm font-medium text-foreground">
                    {weather.temperature}°C
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    {weather.condition}
                  </span>
                </div>
              ) : (
                <Thermometer className="w-4 h-4 text-secondary" />
              )}
              <span className="text-sm font-medium text-foreground">{temperature}°C</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Welcome to <span className="text-primary">Indore</span>
          </h1>
          <p className="text-muted-foreground mb-8 max-w-lg">
            Discover the heart of Madhya Pradesh — heritage, culture, and the best street food in India
          </p>

          <SearchBar />
        </div>
      </section>

      {/* Map & Near Me Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <MapPlaceholder nearMeEnabled={nearMeEnabled} />
        </div>
        <div className="space-y-4">
          <NearMeToggle enabled={nearMeEnabled} onToggle={setNearMeEnabled} />
          <div className="space-y-3">
            {nearbyServices.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Top Attractions Section */}
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold text-foreground">Top Attractions</h2>
          <FilterPills
            filters={filters}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAttractions.map((attraction, index) => (
            <div
              key={attraction.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <AttractionCard
                name={attraction.name}
                image={attraction.image}
                distance={attraction.distance}
                category={attraction.category}
                rating={attraction.rating}
                onClick={() => handleAttractionClick(attraction.id)}
              />
            </div>
          ))}
        </div>

        {filteredAttractions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No attractions found for this filter.</p>
          </div>
        )}
      </section>
    </div>
  );
}
