import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CloudRain, Sun, Cloud, Wind } from "lucide-react"

export function WeatherWidget() {
  // Mock weather data
  const weatherData = {
    location: "Delhi, India",
    temperature: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    forecast: [
      { day: "Today", high: 32, low: 24, icon: Sun },
      { day: "Tomorrow", high: 29, low: 22, icon: CloudRain },
      { day: "Thu", high: 26, low: 20, icon: Cloud },
    ]
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Weather</h3>
              <p className="text-sm text-muted-foreground">{weatherData.location}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{weatherData.temperature}°C</div>
              <p className="text-sm text-muted-foreground">{weatherData.condition}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <Wind className="h-4 w-4 text-blue-600" />
              <span className="text-sm">{weatherData.windSpeed} km/h</span>
            </div>
            <div className="flex items-center space-x-2">
              <CloudRain className="h-4 w-4 text-blue-600" />
              <span className="text-sm">{weatherData.humidity}% humidity</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {weatherData.forecast.map((day, index) => (
              <motion.div
                key={day.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="text-center p-2 rounded-lg bg-white/50 dark:bg-black/20"
              >
                <p className="text-xs font-medium">{day.day}</p>
                <day.icon className="h-4 w-4 mx-auto my-1 text-blue-600" />
                <p className="text-xs">
                  <span className="font-medium">{day.high}°</span>
                  <span className="text-muted-foreground">/{day.low}°</span>
                </p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}