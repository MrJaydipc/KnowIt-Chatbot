import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Zap, Globe, Shield, Clock, Users } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const features = [
    {
      icon: MessageCircle,
      title: 'AI-Powered Chat',
      description: 'Instant answers to student queries 24/7'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Hindi, English, and regional languages'
    },
    {
      icon: Zap,
      title: 'Voice Enabled',
      description: 'Speech-to-text and text-to-speech'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Protected student data and privacy'
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Always ready to help students'
    },
    {
      icon: Users,
      title: 'Smart Analytics',
      description: 'Track usage and improve responses'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <MessageCircle className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">EduChat AI</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">About</Button>
            <Button variant="gradient-primary">
              Admin Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="gradient-text">AI-Powered Student Support</span>
              <br />
              <span className="text-foreground">For Indian Colleges</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Multilingual chatbot that handles student queries instantly, reduces workload, 
              and provides 24/7 support in Hindi, English, and regional languages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" variant="gradient-primary" className="text-lg px-8 py-6">
              <MessageCircle className="mr-2 h-5 w-5" />
              Try Demo Chat
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              View Documentation
            </Button>
          </div>

          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span>94% Query Resolution</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>5+ Languages Supported</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
              <span>24/7 Availability</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Integration Section */}
        <div className="text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">Seamless Integration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Works with your existing college website and integrates with WhatsApp and Telegram for maximum reach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'College Website', desc: 'Floating widget integration' },
              { name: 'WhatsApp Bot', desc: 'Direct messaging support' },
              { name: 'Telegram Bot', desc: 'Group and private chats' }
            ].map((platform, index) => (
              <Card key={index} className="shadow-soft">
                <CardContent className="p-6 text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-secondary mx-auto mb-4 flex items-center justify-center">
                    <MessageCircle className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">{platform.name}</h3>
                  <p className="text-sm text-muted-foreground">{platform.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};