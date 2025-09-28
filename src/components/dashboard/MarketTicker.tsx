import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface MarketPrice {
  crop: string
  price: number
  change: number
  unit: string
}

const marketPrices: MarketPrice[] = [
  { crop: "Wheat", price: 2150, change: 2.5, unit: "₹/quintal" },
  { crop: "Rice", price: 3200, change: -1.2, unit: "₹/quintal" },
  { crop: "Cotton", price: 5800, change: 4.8, unit: "₹/quintal" },
  { crop: "Sugarcane", price: 350, change: 1.5, unit: "₹/quintal" },
]

export function MarketTicker() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950 dark:to-emerald-900 border-green-200 dark:border-green-800">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Live Market Prices</h3>
          
          <div className="space-y-3">
            {marketPrices.map((item, index) => (
              <motion.div
                key={item.crop}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-black/20"
              >
                <div>
                  <h4 className="font-medium">{item.crop}</h4>
                  <p className="text-sm text-muted-foreground">{item.unit}</p>
                </div>
                
                <div className="text-right">
                  <div className="font-semibold">₹{item.price.toLocaleString()}</div>
                  <div className={`flex items-center text-sm ${
                    item.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.change >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(item.change)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}