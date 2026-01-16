import { useState } from "react"
import { Car, Bus, Bike, Clock, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"

const transportData = [
  {
    id: "t1",
    name: "City Bus",
    type: "Bus",
    description: "Indore public transport buses",
    price: "₹10 - ₹30",
    availability: "5 AM - 11 PM",
    icon: Bus
  },
  {
    id: "t2",
    name: "Auto Rickshaw",
    type: "Auto",
    description: "Local auto rickshaw rides",
    price: "₹30+",
    availability: "24x7",
    icon: Car
  },
  {
    id: "t3",
    name: "Uber / Ola",
    type: "Cab",
    description: "App based cab services",
    price: "₹12/km",
    availability: "24x7",
    icon: Car
  },
  {
    id: "t4",
    name: "Bike Rentals",
    type: "Bike",
    description: "Rent bikes for city travel",
    price: "₹300/day",
    availability: "8 AM - 10 PM",
    icon: Bike
  },
  {
    id: "t5",
    name: "Car Rentals",
    type: "Car",
    description: "Self drive and rental cars",
    price: "₹1500/day",
    availability: "8 AM - 10 PM",
    icon: Car
  }
]

export default function Transport() {
  const [filter, setFilter] = useState("All")

  const filtered = transportData.filter(t =>
    filter === "All" || t.type === filter
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transport in Indore</h1>
        <p className="text-muted-foreground">Choose how you want to move</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", "Bus", "Auto", "Cab", "Bike", "Car"].map(item => (
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
        {filtered.map(t => (
          <div key={t.id} className="border rounded-xl p-4 space-y-3 bg-background">
            <div className="flex items-center gap-2">
              <t.icon size={20} />
              <h3 className="font-semibold">{t.name}</h3>
            </div>

            <p className="text-sm text-muted-foreground">{t.description}</p>

            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <IndianRupee size={14} /> {t.price}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} /> {t.availability}
              </div>
            </div>

            <Button size="sm" className="w-full">Book / View</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
