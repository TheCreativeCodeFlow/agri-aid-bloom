import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { FeatureCard } from "@/components/dashboard/FeatureCard"
import { WeatherWidget } from "@/components/dashboard/WeatherWidget"
import { MarketTicker } from "@/components/dashboard/MarketTicker"
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner"
import { RecentActivities } from "@/components/dashboard/RecentActivities"
import { Chatbot } from "@/components/chatbot/Chatbot"
import { BarChart3, Bug, CloudRain, DollarSign, Sprout } from "lucide-react"

// Import AI-generated images
import yieldPredictionImg from "@/assets/yield-prediction.jpg"
import pestDetectionImg from "@/assets/pest-detection.jpg"
import weatherAlertsImg from "@/assets/weather-alerts.jpg"
import marketPricesImg from "@/assets/market-prices.jpg"
import soilFertilizerImg from "@/assets/soil-fertilizer.jpg"

const features = [
  {
    title: "Yield Prediction",
    description: "Get accurate crop yield forecasts using AI analysis of soil, weather, and farming practices.",
    image: yieldPredictionImg,
    icon: BarChart3,
    ctaText: "Predict Yield",
    route: "/yield-prediction"
  },
  {
    title: "Weather Alerts",
    description: "Real-time weather updates and alerts to help you make informed farming decisions.",
    image: weatherAlertsImg,
    icon: CloudRain,
    ctaText: "View Forecast",
    route: "/weather-alerts"
  },
  {
    title: "Soil & Fertilizer Guide",
    description: "Expert recommendations for soil health and fertilizer applications based on crop needs.",
    image: soilFertilizerImg,
    icon: Sprout,
    ctaText: "View Tips",
    route: "/soil-fertilizer"
  },
  {
    title: "Pest Detection",
    description: "Upload images to identify pests and diseases with AI-powered analysis and treatment recommendations.",
    image: pestDetectionImg,
    icon: Bug,
    ctaText: "Scan Image",
    route: "/pest-detection"
  },
  {
    title: "Market Prices",
    description: "Live market prices from local mandis to help you make the best selling decisions.",
    image: marketPricesImg,
    icon: DollarSign,
    ctaText: "View Prices",
    route: "/market-prices"
  },
]

export function Dashboard() {
  const navigate = useNavigate()

  const handleFeatureClick = (route: string) => {
    navigate(route)
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Welcome Banner */}
        <WelcomeBanner userName="John" />

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <WeatherWidget />
          </div>
          <div>
            <MarketTicker />
          </div>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Smart Farming Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                title={feature.title}
                description={feature.description}
                image={feature.image}
                icon={feature.icon}
                ctaText={feature.ctaText}
                onClick={() => handleFeatureClick(feature.route)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6">Recent Activities</h2>
          <div className="max-w-2xl">
            <RecentActivities />
          </div>
        </motion.div>
      </div>

      {/* Floating Chatbot */}
      <Chatbot />
    </div>
  )
}