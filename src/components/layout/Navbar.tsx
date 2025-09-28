import { useState } from "react"
import { motion } from "framer-motion"
import { NavLink, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { 
  Home, 
  BarChart3, 
  CloudRain, 
  Sprout, 
  Bug, 
  DollarSign, 
  MessageCircle, 
  User,
  Menu
} from "lucide-react"

const navItems = [
  { to: "/dashboard", icon: Home, label: "Home" },
  { to: "/yield-prediction", icon: BarChart3, label: "Yield Prediction" },
  { to: "/weather-alerts", icon: CloudRain, label: "Weather Alerts" },
  { to: "/soil-fertilizer", icon: Sprout, label: "Soil & Fertilizer Guide" },
  { to: "/pest-detection", icon: Bug, label: "Pest Detection" },
  { to: "/market-prices", icon: DollarSign, label: "Market Prices" },
  { to: "/ai-assistant", icon: MessageCircle, label: "AI Assistant" },
  { to: "/profile", icon: User, label: "Profile" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const isActive = (path: string) => location.pathname === path

  const NavItems = ({ mobile = false }) => (
    <div className={`flex ${mobile ? 'flex-col space-y-2' : 'items-center space-x-1'}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={() => mobile && setIsOpen(false)}
          className={({ isActive }) =>
            `flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${
              isActive 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            } ${mobile ? 'w-full justify-start' : ''}`
          }
        >
          <item.icon className="h-4 w-4" />
          <span className={mobile ? '' : 'hidden lg:inline'}>{item.label}</span>
        </NavLink>
      ))}
    </div>
  )

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/dashboard" className="flex items-center space-x-2 text-xl font-bold">
          <div className="p-2 bg-primary rounded-lg">
            <Sprout className="h-5 w-5 text-primary-foreground" />
          </div>
          <span>CropCast</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex flex-1 justify-center">
          <NavItems />
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          
          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                <div className="flex items-center space-x-2 text-xl font-bold mb-6">
                  <div className="p-2 bg-primary rounded-lg">
                    <Sprout className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span>CropCast</span>
                </div>
                <NavItems mobile />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  )
}