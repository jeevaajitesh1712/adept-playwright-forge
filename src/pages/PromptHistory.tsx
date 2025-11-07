import { TopNav } from "@/components/layout/TopNav";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Copy, Edit, Play } from "lucide-react";
import { toast } from "sonner";

const mockHistory = [
  {
    id: 1,
    timestamp: "2024-01-25 14:30",
    prompt: "Generate login tests with email validation and password strength checks...",
    model: "GPT-4",
    project: "E-Commerce Platform",
  },
  {
    id: 2,
    timestamp: "2024-01-25 12:15",
    prompt: "Create checkout flow tests including cart operations, payment processing...",
    model: "GPT-4",
    project: "E-Commerce Platform",
  },
  {
    id: 3,
    timestamp: "2024-01-24 16:45",
    prompt: "Test user profile update functionality with validation and error handling...",
    model: "GPT-3.5",
    project: "Admin Dashboard",
  },
  {
    id: 4,
    timestamp: "2024-01-24 10:20",
    prompt: "Generate tests for data table filtering, sorting, and pagination features...",
    model: "GPT-4",
    project: "Admin Dashboard",
  },
  {
    id: 5,
    timestamp: "2024-01-23 15:00",
    prompt: "Create authentication tests including OAuth flows and session management...",
    model: "GPT-4",
    project: "Customer Portal",
  },
];

export default function PromptHistory() {
  const handleCopy = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-background to-primary-light/30">
      <TopNav />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Prompt History</h1>
          <p className="text-muted-foreground">
            Review and reuse your previous test generation prompts
          </p>
        </div>

        <div className="space-y-4">
          {mockHistory.map((item) => (
            <Card key={item.id} className="p-6 rounded-2xl shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="secondary" className="rounded-lg">
                      {item.model}
                    </Badge>
                    <Badge variant="outline" className="rounded-lg">
                      {item.project}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      {item.timestamp}
                    </div>
                  </div>
                  <p className="text-foreground leading-relaxed">{item.prompt}</p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => handleCopy(item.prompt)}
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Reuse
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
