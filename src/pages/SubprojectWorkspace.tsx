import { TopNav } from "@/components/layout/TopNav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Code, BookOpen, TestTube, Play } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function SubprojectWorkspace() {
  const { id, subId } = useParams();

  const handleGenerate = () => {
    toast.success("Test generation started!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-background to-primary-light/30">
      <TopNav />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <Link to={`/project/${id}`} className="text-sm text-primary-cta hover:underline mb-2 inline-block">
            ← Back to Project
          </Link>
          <h1 className="text-4xl font-bold mb-2">Login Flow</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Card className="p-6 rounded-2xl shadow-sm">
              <Tabs defaultValue="stories" className="w-full">
                <TabsList className="grid w-full grid-cols-4 rounded-xl mb-6">
                  <TabsTrigger value="stories" className="rounded-lg">
                    <FileText className="h-4 w-4 mr-2" />
                    User Stories
                  </TabsTrigger>
                  <TabsTrigger value="code" className="rounded-lg">
                    <Code className="h-4 w-4 mr-2" />
                    React Code
                  </TabsTrigger>
                  <TabsTrigger value="docs" className="rounded-lg">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Docs
                  </TabsTrigger>
                  <TabsTrigger value="output" className="rounded-lg">
                    <TestTube className="h-4 w-4 mr-2" />
                    Output
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="stories" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary-cta transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Drop files here or click to upload</p>
                    <p className="text-xs text-muted-foreground">Supports .txt, .md, .pdf files</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-accent">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-primary-cta" />
                        <span className="text-sm font-medium">login-stories.md</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2.4 KB</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary-cta transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Upload React components</p>
                    <p className="text-xs text-muted-foreground">Supports .jsx, .tsx files</p>
                  </div>
                </TabsContent>

                <TabsContent value="docs" className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary-cta transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Upload requirement documents</p>
                    <p className="text-xs text-muted-foreground">Supports .pdf, .docx files</p>
                  </div>
                </TabsContent>

                <TabsContent value="output" className="space-y-4">
                  <Card className="p-6 rounded-xl bg-accent/50">
                    <p className="text-sm text-muted-foreground text-center">
                      No test output yet. Generate tests to see results here.
                    </p>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Prompt Editor Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 rounded-2xl shadow-sm sticky top-20">
              <h3 className="text-lg font-bold mb-4">Prompt Editor</h3>
              <Textarea
                placeholder="Describe the test scenarios you want to generate...

Example:
- Test login with valid credentials
- Test login with invalid email
- Test password reset flow"
                className="min-h-[300px] rounded-xl mb-4"
              />
              <Button
                onClick={handleGenerate}
                className="w-full rounded-xl bg-primary-cta hover:bg-primary text-white py-6"
              >
                <Play className="mr-2 h-5 w-5" />
                Generate Tests
              </Button>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
