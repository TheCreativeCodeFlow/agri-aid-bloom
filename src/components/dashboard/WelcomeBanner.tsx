import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sprout, ArrowRight } from "lucide-react"

interface WelcomeBannerProps {
  userName?: string
}

export function WelcomeBanner({ userName = "Farmer" }: WelcomeBannerProps) {
  const currentHour = new Date().getHours()
  const greeting = currentHour < 12 ? "Good Morning" : currentHour < 17 ? "Good Afternoon" : "Good Evening"

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden relative">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-white/5 bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]" />
        </div>
        
        <CardContent className="p-8 relative">
          <div className="flex items-center justify-between">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="flex items-center space-x-3"
              >
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Sprout className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{greeting}, {userName}!</h1>
                  <p className="text-primary-foreground/80 text-lg">
                    Ready to make smarter farming decisions today?
                  </p>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Button 
                  variant="secondary" 
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-white/30"
                >
                  Explore New Features
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden lg:block"
            >
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Sprout className="h-16 w-16 text-white/80" />
              </div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}