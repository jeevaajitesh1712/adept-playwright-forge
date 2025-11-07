import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, FolderOpen, Calendar, Tag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const mockProjects = [
  {
    id: 1,
    name: "E-Commerce Platform",
    owner: "John Doe",
    created: "2024-01-15",
    tags: ["React", "Checkout", "Authentication"],
    subprojects: 5,
    status: "Active",
  },
  {
    id: 2,
    name: "Admin Dashboard",
    owner: "Jane Smith",
    created: "2024-01-20",
    tags: ["Vue", "Analytics", "CRUD"],
    subprojects: 3,
    status: "In Progress",
  },
  {
    id: 3,
    name: "Customer Portal",
    owner: "John Doe",
    created: "2024-01-25",
    tags: ["Next.js", "User Profile", "Messaging"],
    subprojects: 2,
    status: "New",
  },
];

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = mockProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-background to-primary-light/30">
      <TopNav />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">Projects</h1>
            <p className="text-muted-foreground">
              Manage and organize your test automation projects
            </p>
          </div>
          <Link to="/project/new">
            <Button className="rounded-xl bg-primary-cta hover:bg-primary text-white px-6 py-6">
              <Plus className="mr-2 h-5 w-5" />
              New Project
            </Button>
          </Link>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-xl py-6"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Link to={`/project/${project.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                    <FolderOpen className="h-6 w-6 text-primary-cta" />
                  </div>
                  <Badge
                    variant={project.status === "Active" ? "default" : "secondary"}
                    className="rounded-lg"
                  >
                    {project.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-2">{project.name}</h3>

                <div className="space-y-2 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Created {project.created}</span>
                  </div>
                  <div>
                    <span className="font-medium">{project.subprojects}</span> subproject
                    {project.subprojects !== 1 ? "s" : ""}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-1 rounded-lg bg-accent text-xs font-medium"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <Card className="p-12 rounded-2xl text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-light">
                <FolderOpen className="h-8 w-8 text-primary-cta" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first project
            </p>
            <Link to="/project/new">
              <Button className="rounded-xl bg-primary-cta hover:bg-primary text-white">
                <Plus className="mr-2 h-5 w-5" />
                New Project
              </Button>
            </Link>
          </Card>
        )}
      </main>
    </div>
  );
}
