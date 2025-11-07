import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, User, Tag, FolderOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const mockSubprojects = [
  { id: 1, name: "Login Flow", status: "Validated", files: 3 },
  { id: 2, name: "Checkout Process", status: "Generating", files: 5 },
  { id: 3, name: "User Profile", status: "New", files: 2 },
];

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-background to-primary-light/30">
      <TopNav />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to="/projects" className="text-sm text-primary-cta hover:underline mb-2 inline-block">
            ← Back to Projects
          </Link>
          <h1 className="text-4xl font-bold mb-2">E-Commerce Platform</h1>
        </div>

        {/* Project Metadata */}
        <Card className="p-6 rounded-2xl shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Owner</p>
                <p className="font-medium">John Doe</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">January 15, 2024</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Tag className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Tags</p>
                <div className="flex gap-2 mt-1">
                  <Badge variant="secondary" className="rounded-lg">React</Badge>
                  <Badge variant="secondary" className="rounded-lg">Auth</Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Subprojects Section */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Subprojects</h2>
          <Link to={`/project/${id}/subproject/new`}>
            <Button className="rounded-xl bg-primary-cta hover:bg-primary text-white">
              <Plus className="mr-2 h-5 w-5" />
              New Subproject
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSubprojects.map((subproject) => (
            <Card
              key={subproject.id}
              className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <Link to={`/project/${id}/subproject/${subproject.id}`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light">
                    <FolderOpen className="h-6 w-6 text-primary-cta" />
                  </div>
                  <Badge
                    variant={
                      subproject.status === "Validated"
                        ? "default"
                        : subproject.status === "Generating"
                        ? "secondary"
                        : "outline"
                    }
                    className="rounded-lg"
                  >
                    {subproject.status}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-2">{subproject.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {subproject.files} file{subproject.files !== 1 ? "s" : ""} uploaded
                </p>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
