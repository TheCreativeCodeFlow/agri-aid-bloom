import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, Lock, User, Globe, Eye, EyeOff } from "lucide-react"

type AuthMode = "login" | "signup"

interface AuthCardProps {
  onLogin: (email: string, password: string) => void
  onSignup: (data: SignupData) => void
}

interface SignupData {
  fullName: string
  email: string
  phone: string
  password: string
  language: string
}

export function AuthCard({ onLogin, onSignup }: AuthCardProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Signup form state
  const [signupData, setSignupData] = useState<SignupData>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    language: "en"
  })
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await onLogin(email, password)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (signupData.password !== confirmPassword) {
      alert("Passwords don't match")
      return
    }
    setIsLoading(true)
    try {
      await onSignup(signupData)
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPLogin = () => {
    // TODO: Implement OTP login
    console.log("OTP login clicked")
  }

  const handleGoogleLogin = () => {
    // TODO: Implement Google login
    console.log("Google login clicked")
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader className="text-center space-y-6">
        <div className="flex justify-center space-x-1">
          <Button
            variant={mode === "login" ? "default" : "ghost"}
            onClick={() => setMode("login")}
            className="flex-1 rounded-full"
          >
            Login
          </Button>
          <Button
            variant={mode === "signup" ? "default" : "ghost"}
            onClick={() => setMode("signup")}
            className="flex-1 rounded-full"
          >
            Sign Up
          </Button>
        </div>
        <div>
          <CardTitle className="text-2xl font-bold text-primary">
            {mode === "login" ? "Welcome Back" : "Join CropCast"}
          </CardTitle>
          <CardDescription className="mt-2">
            {mode === "login"
              ? "Sign in to access your farming dashboard"
              : "Create your account to get started"}
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent>
        <AnimatePresence mode="wait">
          {mode === "login" ? (
            <motion.form
              key="login"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleLogin}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email or phone"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Login"}
              </Button>

              <div className="flex flex-col space-y-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={handleOTPLogin}
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Login with OTP
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full h-12"
                  onClick={handleGoogleLogin}
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
            </motion.form>
          ) : (
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSignup}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={signupData.fullName}
                    onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupEmail">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupEmail"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={signupData.phone}
                    onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="signupPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                  <Select
                    value={signupData.language}
                    onValueChange={(value) => setSignupData({ ...signupData, language: value })}
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="kn">Kannada</SelectItem>
                      <SelectItem value="bn">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full h-12" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </motion.form>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}