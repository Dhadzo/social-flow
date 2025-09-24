import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "wouter";
import { 
  Calendar, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Globe,
  CheckCircle,
  ArrowRight,
  Star,
  Smartphone,
  Clock
} from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Schedule posts across all platforms with optimal timing suggestions powered by analytics."
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track performance with detailed insights, engagement metrics, and growth analytics."
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team using role-based permissions and approval workflows."
    },
    {
      icon: Zap,
      title: "Automation Tools",
      description: "Automate repetitive tasks with smart rules and content recycling features."
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with SSO, 2FA, and compliance with data protection regulations."
    },
    {
      icon: Globe,
      title: "Multi-Platform Support",
      description: "Manage Twitter, Facebook, LinkedIn, Instagram, and TikTok from one dashboard."
    }
  ];

  const platforms = [
    { name: "Twitter", color: "bg-blue-500" },
    { name: "Facebook", color: "bg-blue-600" },
    { name: "LinkedIn", color: "bg-blue-700" },
    { name: "Instagram", color: "bg-pink-500" },
    { name: "TikTok", color: "bg-black dark:bg-white" }
  ];

  const benefits = [
    "Save 5+ hours per week on social media management",
    "Increase engagement rates by up to 40%",
    "Maintain consistent posting schedules",
    "Access detailed performance insights",
    "Streamline team workflows and approvals"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Trusted by 10,000+ businesses
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Manage All Your{" "}
              <span className="text-primary">Social Media</span>{" "}
              in One Place
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Streamline your social media workflow with powerful scheduling, analytics, 
              and collaboration tools. Save time, boost engagement, and scale your presence 
              across all major platforms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => setLocation('/signup')}
                className="text-lg px-8"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => setLocation('/demo')}
                className="text-lg px-8"
              >
                Watch Demo
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Connect All Your Platforms
            </h2>
            <p className="text-lg text-muted-foreground">
              Seamlessly manage your presence across major social media platforms
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${platform.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white dark:text-black font-semibold text-sm">
                    {platform.name.slice(0, 2)}
                  </span>
                </div>
                <span className="text-foreground font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you create, schedule, and analyze 
              your social media content with professional-grade features.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Choose SocialHub?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of businesses that have transformed their social media 
                strategy with our platform. Experience measurable results from day one.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">10K+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">2M+</div>
                <div className="text-sm text-muted-foreground">Posts Scheduled</div>
              </Card>
              <Card className="text-center p-6">
                <div className="text-3xl font-bold text-primary mb-2">40%</div>
                <div className="text-sm text-muted-foreground">Avg. Engagement Boost</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Social Media Strategy?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of businesses already using SocialHub to streamline their 
            social media management and drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => setLocation('/signup')}
              className="text-lg px-8"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => setLocation('/contact')}
              className="text-lg px-8"
            >
              Contact Sales
            </Button>
          </div>
          <div className="flex items-center justify-center space-x-6 mt-8">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Smartphone className="h-4 w-4" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}