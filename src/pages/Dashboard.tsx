import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Shield,
  Zap,
  DollarSign,
  GraduationCap,
  Clock,
  FolderOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Enterprise-grade security with encrypted test artifacts",
  },
  {
    icon: Zap,
    title: "Quick Generation",
    description: "Generate comprehensive Playwright tests in seconds",
  },
  {
    icon: DollarSign,
    title: "Affordable",
    description: "Cost-effective testing automation for teams of all sizes",
  },
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "AI-powered suggestions for better test coverage",
  },
];

const recentProjects = [
  { id: 1, name: "E-Commerce Platform", status: "Completed", date: "2 hours ago" },
  { id: 2, name: "Admin Dashboard", status: "In Progress", date: "5 hours ago" },
  { id: 3, name: "Customer Portal", status: "New", date: "1 day ago" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-background to-primary-light/30">
      <TopNav />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <div className="inline-block mb-6 px-4 py-2 rounded-full bg-primary-light border border-primary/10">
            <span className="text-sm font-medium text-primary">
              Smart Test Automation Platform
            </span>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-primary via-primary-cta to-primary bg-clip-text text-transparent">
            Smart Test Automation for Your Projects
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Generate, validate, and manage Playwright tests with AI assistance.
            Transform your requirements into production-ready test suites.
          </p>
          <Link to="/projects">
            <Button
              size="lg"
              className="rounded-xl bg-primary-cta hover:bg-primary text-white font-medium px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all"
            >
              <Plus className="mr-2 h-5 w-5" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-border/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light mb-4">
                <feature.icon className="h-6 w-6 text-primary-cta" />
              </div>
              <h3 className="font-bold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Recent Projects & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <Card className="lg:col-span-2 p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Projects</h2>
              <Link to="/projects">
                <Button variant="outline" className="rounded-xl">
                  View All
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-light">
                      <FolderOpen className="h-5 w-5 text-primary-cta" />
                    </div>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{project.date}</span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={
                      project.status === "Completed"
                        ? "default"
                        : project.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                    className="rounded-lg"
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/projects">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl py-6"
                >
                  <Plus className="mr-2 h-5 w-5" />
                  New Project
                </Button>
              </Link>
              <Link to="/history">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-xl py-6"
                >
                  <Clock className="mr-2 h-5 w-5" />
                  View History
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
