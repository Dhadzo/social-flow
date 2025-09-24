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

  const painPoints = [
    "Logging into 5 different apps just to post the same thing",
    "Forgetting to post and then scrambling to catch up",
    "Spending your Sunday night scheduling content for the week",
    "Your Instagram post doing amazing but your LinkedIn getting 3 likes"
  ];

  const features = [
    {
      icon: Calendar,
      title: "Post everywhere at once",
      description: "Write once, post everywhere. No more copy-pasting the same content across 5 different apps."
    },
    {
      icon: Clock,
      title: "Set it and forget it",
      description: "Schedule your content when you're in the zone, then go live your life. We'll handle the rest."
    },
    {
      icon: BarChart3,
      title: "See what actually works",
      description: "Find out which posts your audience loves so you can make more of that instead of guessing."
    }
  ];

  const platforms = [
    { name: "Twitter", color: "bg-blue-500", icon: "𝕏" },
    { name: "Facebook", color: "bg-blue-600", icon: "f" },
    { name: "LinkedIn", color: "bg-blue-700", icon: "in" },
    { name: "Instagram", color: "bg-pink-500", icon: "📷" },
    { name: "TikTok", color: "bg-black dark:bg-white", icon: "🎵" }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      handle: "@sarahbuilds",
      content: "Finally stopped spending 3 hours every Sunday scheduling posts. This just works.",
      result: "Saves 3h/week",
      image: "/attached_assets/stock_images/professional_profile_badc0922.jpg"
    },
    {
      name: "Mike Torres",
      handle: "@mikemarketing",
      content: "My engagement went up 60% once I started posting consistently everywhere.",
      result: "↗ 60% engagement",
      image: "/attached_assets/stock_images/professional_profile_6d788931.jpg"
    },
    {
      name: "Alex Kim",
      handle: "@alexcreates",
      content: "I used to forget to post for weeks. Now my content goes out automatically.",
      result: "Never miss a post",
      image: "/attached_assets/stock_images/professional_profile_bd6f0777.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-foreground mb-6 leading-none">
                Stop logging into 
                <span className="block text-primary relative">
                  5 different apps
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C100 2 200 2 298 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              <div className="bg-muted/50 rounded-2xl p-6 mb-8 border-l-4 border-primary">
                <p className="text-xl text-foreground leading-relaxed">
                  Write once. Post everywhere. That's it. 
                </p>
                <p className="text-lg text-muted-foreground mt-2">
                  No more copy-pasting. No more Sunday night content prep sessions.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button 
                  size="lg" 
                  onClick={() => setLocation('/signup')}
                  className="text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  Try it free →
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setLocation('/demo')}
                  className="text-lg px-8 py-4 rounded-2xl"
                >
                  See demo
                </Button>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Free forever
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  30 second setup
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  No credit card
                </div>
              </div>
            </div>
            
            {/* Platform showcase */}
            <div className="relative">
              <div className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-3xl p-8 border">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-medium text-muted-foreground mb-6">
                    <Clock className="w-4 h-4" />
                    Sunday 3:42 PM
                  </div>
                  <div className="bg-background rounded-2xl p-4 shadow-sm">
                    <p className="text-foreground mb-4">Just launched our new feature! 🚀 Really excited to share this...</p>
                    <div className="flex flex-wrap gap-2">
                      {platforms.map((platform) => (
                        <div key={platform.name} className="flex items-center gap-2 bg-muted/50 rounded-full px-3 py-1 text-xs">
                          <div className={`w-4 h-4 ${platform.color} rounded-full flex items-center justify-center`}>
                            <span className="text-white dark:text-black text-[10px]">
                              {platform.icon}
                            </span>
                          </div>
                          {platform.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="text-center py-4">
                    <Button size="sm" className="rounded-full">
                      Post to all platforms
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section with Diagonal Layout */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50/50 to-orange-50/50 dark:from-red-900/10 dark:to-orange-900/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100/20 dark:bg-red-900/10 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Social media posting is 
                <span className="text-red-600 block">actually broken</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                You know the drill... and we're all sick of it.
              </p>
            </div>
            <div className="lg:col-span-3">
              <div className="grid gap-4 md:grid-cols-2">
                {painPoints.map((point, index) => (
                  <div key={index} className="group hover:scale-105 transition-all duration-300">
                    <div className="flex items-start space-x-3 p-6 bg-background/80 backdrop-blur-sm rounded-2xl border border-red-200/50 shadow-sm hover:shadow-lg transition-all">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0 group-hover:animate-pulse"></div>
                      <p className="text-foreground leading-relaxed">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-muted-foreground italic">
              "We built this because we were tired of the same annoying routine."
            </p>
          </div>
        </div>
      </section>

      {/* Platform Integration Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Works with all your accounts
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {platforms.map((platform) => (
              <div key={platform.name} className="flex items-center space-x-3 bg-muted/50 rounded-full px-4 py-2">
                <div className={`w-8 h-8 ${platform.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white dark:text-black font-semibold text-xs">
                    {platform.icon}
                  </span>
                </div>
                <span className="text-foreground font-medium">{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Here's how it works
            </h2>
            <p className="text-lg text-muted-foreground">
              It's embarrassingly simple
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section with Profile Images */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-tr from-blue-50/30 to-purple-50/30 dark:from-blue-900/5 dark:to-purple-900/5 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/20 dark:bg-blue-800/10 rounded-full blur-3xl transform -translate-x-32 translate-y-32"></div>
        <div className="absolute top-20 right-20 w-60 h-60 bg-purple-200/20 dark:bg-purple-800/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              People actually <span className="text-primary">love this thing</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Real people, real results, real talk
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`group ${index === 1 ? 'lg:mt-8' : index === 2 ? 'lg:mt-16' : ''}`}>
                <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  {/* Quote */}
                  <div className="mb-6">
                    <svg className="w-8 h-8 text-primary/30 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M12 8v8c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-2.2 1.8-4 4-4V8C4.5 8 1 11.5 1 16s3.5 8 7 8c2.2 0 4-1.8 4-4V8zm16 0v8c0 2.2-1.8 4-4 4s-4-1.8-4-4c0-2.2 1.8-4 4-4V8c-3.5 0-7 3.5-7 8s3.5 8 7 8c2.2 0 4-1.8 4-4V8z"/>
                    </svg>
                    <p className="text-lg text-foreground leading-relaxed font-medium">
                      {testimonial.content}
                    </p>
                  </div>
                  
                  {/* Profile */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-primary font-medium">{testimonial.handle}</p>
                    </div>
                  </div>
                  
                  {/* Result Badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full px-4 py-2 border border-primary/20">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-primary">{testimonial.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <p className="text-lg text-muted-foreground mb-4">
              Join 2,847 people who stopped wasting time on social media
            </p>
            <Button 
              size="lg"
              onClick={() => setLocation('/signup')}
              className="text-lg px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl"
            >
              Get started free
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Stop wasting time on social media busywork
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            You've got better things to do than logging into 5 different apps. 
            Let us handle the boring stuff so you can focus on creating great content.
          </p>
          <Button 
            size="lg" 
            onClick={() => setLocation('/signup')}
            className="text-lg px-12 py-3"
          >
            Start posting everywhere
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            It's free to try • Takes 30 seconds to set up
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}