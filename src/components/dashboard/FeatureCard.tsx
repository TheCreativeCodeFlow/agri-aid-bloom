import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LucideIcon } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  image: string
  icon: LucideIcon
  ctaText: string
  onClick: () => void
  index: number
}

export function FeatureCard({ 
  title, 
  description, 
  image, 
  icon: Icon, 
  ctaText, 
  onClick, 
  index 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="feature-card h-full flex flex-col overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute top-4 left-4 p-2 bg-primary/90 rounded-lg backdrop-blur-sm">
            <Icon className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
        
        <CardHeader className="flex-1">
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-0">
          <Button 
            onClick={onClick} 
            className="w-full h-11 font-medium transition-all duration-300 hover:shadow-lg"
          >
            {ctaText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}