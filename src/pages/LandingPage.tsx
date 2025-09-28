import { motion } from "framer-motion"
import { AuthCard } from "@/components/auth/AuthCard"
import { BarChart3, Bug, CloudRain, DollarSign, Sprout } from "lucide-react"
import heroFarmer from "@/assets/hero-farmer.jpg"

interface LandingPageProps {
  onLogin: (email: string, password: string) => void
  onSignup: (data: any) => void
}

const features = [
  { icon: BarChart3, label: "Yield Prediction" },
  { icon: Bug, label: "Pest Detection" },
  { icon: CloudRain, label: "Weather Alerts" },
  { icon: DollarSign, label: "Market Prices" },
  { icon: Sprout, label: "Soil & Fertilizer Guide" },
]

const stats = [
  { number: "12K+", label: "Happy Farmers" },
  { number: "95%", label: "Accuracy" },
  { number: "24/7", label: "Support" },
]

export function LandingPage({ onLogin, onSignup }: LandingPageProps) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroFarmer})`,
        }}
      />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
            
            {/* Left Hero Section */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-white max-w-2xl"
            >
              {/* Logo and Title */}
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="flex items-center space-x-3"
                >
                  <div className="p-3 bg-primary rounded-xl">
                    <Sprout className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold">CropCast</h1>
                </motion.div>
                
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-2xl font-semibold text-primary-foreground"
                >
                  Empowering Farmers with Smart Insights
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="text-xl text-gray-200"
                >
                  Transform Your Farming with AI
                </motion.p>
              </div>

              {/* Feature Icons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-gray-200">Smart Features</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.4 }}
                      className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
                    >
                      <feature.icon className="h-6 w-6 text-primary" />
                      <span className="text-xs text-center text-gray-200">{feature.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-white/20"
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.4 }}
                    className="text-center"
                  >
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Authentication Section */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-md">
                <AuthCard onLogin={onLogin} onSignup={onSignup} />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}