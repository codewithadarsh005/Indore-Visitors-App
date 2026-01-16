import { useState } from "react"
import { MapPin, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const hotelsData = [
  {
    id: "h1",
    name: "Sayaji Hotel",
    type: "Luxury",
    location: "Vijay Nagar",
    price: 5200,
    rating: 4.6,
    description: "5-star hotel with rooftop dining and city view"
  },
  {
    id: "h2",
    name: "Hotel Apna Palace",
    type: "Budget",
    location: "South Tukoganj",
    price: 1800,
    rating: 4.1,
    description: "Affordable stay near railway station"
  },
  {
    id: "h3",
    name: "Indore Homestay",
    type: "Homestay",
    location: "Palasia",
    price: 1200,
    rating: 4.3,
    description: "Comfortable local home experience"
  }
]

export default function Hotels() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")

  const filteredHotels = hotelsData.filter(hotel => {
    const matchesSearch = hotel.name.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === "All" || hotel.type === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hotels in Indore</h1>
        <p className="text-muted-foreground">Find the best places to stay</p>
      </div>

      <Input
        placeholder="Search hotels..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="flex gap-2">
        {["All", "Luxury", "Budget", "Homestay"].map(item => (
          <Button
            key={item}
            variant={filter === item ? "default" : "outline"}
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filteredHotels.map(hotel => (
          <div key={hotel.id} className="border rounded-xl p-4 space-y-2 bg-background">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{hotel.name}</h3>
              <div className="flex items-center gap-1 text-sm">
                <Star size={14} /> {hotel.rating}
              </div>
            </div>

            <p className="text-sm text-muted-foreground">{hotel.description}</p>

            <div className="flex items-center gap-2 text-sm">
              <MapPin size={14} />
              {hotel.location}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="font-bold">₹{hotel.price}/night</span>
              <Button size="sm">Book Now</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
