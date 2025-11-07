import { TopNav } from "@/components/layout/TopNav";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export default function Settings() {
  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/30 via-background to-primary-light/30">
      <TopNav />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Configure your test generation preferences
          </p>
        </div>

        <div className="space-y-6">
          {/* LLM Configuration */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">LLM Configuration</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  className="rounded-xl"
                />
                <p className="text-sm text-muted-foreground">
                  Your OpenAI API key for test generation
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Select defaultValue="gpt-4">
                  <SelectTrigger id="model" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                    <SelectItem value="gpt-3.5">GPT-3.5 Turbo</SelectItem>
                    <SelectItem value="claude-3">Claude 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Separator />

          {/* Output Preferences */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Output Preferences</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Default Language</Label>
                <Select defaultValue="typescript">
                  <SelectTrigger id="language" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="naming">Naming Convention</Label>
                <Select defaultValue="kebab">
                  <SelectTrigger id="naming" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kebab">kebab-case</SelectItem>
                    <SelectItem value="camel">camelCase</SelectItem>
                    <SelectItem value="snake">snake_case</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="structure">Test Structure</Label>
                <Select defaultValue="describe">
                  <SelectTrigger id="structure" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="describe">Describe/It blocks</SelectItem>
                    <SelectItem value="test">Test blocks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Separator />

          {/* Storage Settings */}
          <Card className="p-6 rounded-2xl shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Storage Settings</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storage">Storage Location</Label>
                <Select defaultValue="local">
                  <SelectTrigger id="storage" className="rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="local">Local Storage</SelectItem>
                    <SelectItem value="cloud">Cloud Storage (Coming Soon)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">
                  Choose where to store your test artifacts
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="rounded-xl bg-primary-cta hover:bg-primary text-white px-8 py-6"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
