import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart3, Bug, DollarSign, MessageCircle, CloudRain } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Activity {
  id: string
  type: "yield" | "pest" | "market" | "chat" | "weather"
  title: string
  description: string
  timestamp: Date
  clickable: boolean
}

const activities: Activity[] = [
  {
    id: "1",
    type: "yield",
    title: "Yield Prediction Completed",
    description: "Predicted 450 kg/acre for wheat crop",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    clickable: true
  },
  {
    id: "2",
    type: "pest",
    title: "Pest Detection Scan",
    description: "Leaf rust detected - 85% confidence",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    clickable: true
  },
  {
    id: "3",
    type: "market",
    title: "Market Price Check",
    description: "Wheat: ₹2,150/quintal in local mandi",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    clickable: true
  },
  {
    id: "4",
    type: "chat",
    title: "AI Assistant Query",
    description: "Asked about organic fertilizer recommendations",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    clickable: true
  },
  {
    id: "5",
    type: "weather",
    title: "Weather Alert",
    description: "Heavy rain predicted for next 3 days",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    clickable: false
  }
]

const getActivityIcon = (type: Activity["type"]) => {
  switch (type) {
    case "yield":
      return BarChart3
    case "pest":
      return Bug
    case "market":
      return DollarSign
    case "chat":
      return MessageCircle
    case "weather":
      return CloudRain
    default:
      return BarChart3
  }
}

export function RecentActivities() {
  const handleActivityClick = (activity: Activity) => {
    if (!activity.clickable) return
    
    // TODO: Navigate to specific activity details
    console.log("Navigate to activity:", activity.id)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>Recent Activities</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type)
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div
                className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                  activity.clickable 
                    ? 'hover:bg-accent cursor-pointer' 
                    : 'opacity-70'
                }`}
                onClick={() => handleActivityClick(activity)}
              >
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                  </p>
                </div>
              </div>
            </motion.div>
          )
        })}
        
        <div className="pt-4 border-t">
          <Button variant="outline" className="w-full" size="sm">
            View All Activities
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}