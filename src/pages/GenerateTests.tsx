import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Code,
  GitCommit,
  ArrowRight,
  Sparkles,
  Copy,
  Download,
  Edit,
  RefreshCw,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { getProject, saveProject, generateId, generateCommitHash, Project, TestCase } from "@/lib/storage";
import { generateTestPlan, generatePlaywrightCode, TestPlanResult, GeneratedCodeResult } from "@/lib/aiService";

const steps = [
  { id: 1, name: "User Story", icon: FileText },
  { id: 2, name: "Test Plan", icon: CheckCircle },
  { id: 3, name: "Generated Code", icon: Code },
  { id: 4, name: "Commit", icon: GitCommit },
];

const GenerateTests = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [testTitle, setTestTitle] = useState("");
  const [userStory, setUserStory] = useState("");
  const [testPlan, setTestPlan] = useState("");
  const [scenarioCount, setScenarioCount] = useState(0);
  const [generatedCode, setGeneratedCode] = useState("");
  const [generatedFilename, setGeneratedFilename] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commitHash, setCommitHash] = useState("");

  useEffect(() => {
    if (id) {
      const p = getProject(id);
      setProject(p || null);
    }
  }, [id]);

  const handleGenerateTestPlan = async () => {
    if (!testTitle || !userStory) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result: TestPlanResult = await generateTestPlan(userStory, testTitle);
      setTestPlan(result.testPlanMarkdown);
      setScenarioCount(result.scenarioCount);
      setCurrentStep(2);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate test plan",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateCode = async () => {
    setIsLoading(true);
    try {
      const result: GeneratedCodeResult = await generatePlaywrightCode(
        testPlan,
        testTitle,
        project?.baseUrl
      );
      if (result.files.length > 0) {
        setGeneratedCode(result.files[0].content);
        setGeneratedFilename(result.files[0].filename);
        setScenarioCount(result.scenarioCount);
      }
      setCurrentStep(3);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate code",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommit = async () => {
    if (!project) return;

    setIsLoading(true);
    
    // Simulate commit process
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const newCommitHash = generateCommitHash();
    setCommitHash(newCommitHash);

    const newTestCase: TestCase = {
      id: generateId(),
      title: testTitle,
      filename: generatedFilename,
      content: generatedCode,
      createdAt: new Date().toISOString(),
      commitHash: newCommitHash,
      status: "COMMITTED",
    };

    const updatedProject = {
      ...project,
      testCases: [...(project.testCases || []), newTestCase],
      updatedAt: new Date().toISOString(),
    };

    saveProject(updatedProject);
    setProject(updatedProject);
    setIsLoading(false);
    setCurrentStep(4);

    toast({
      title: "Success!",
      description: "Test case committed successfully",
    });
  };

  const copyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({ title: "Copied to clipboard" });
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = generatedFilename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setTestTitle("");
    setUserStory("");
    setTestPlan("");
    setGeneratedCode("");
    setGeneratedFilename("");
    setScenarioCount(0);
    setCommitHash("");
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-onyx flex items-center justify-center">
        <div className="text-platinum">Project not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-onyx p-6">
      {/* Loading Banner */}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bg-violet text-white py-4 px-6 z-50 flex items-center justify-center gap-3">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          <span className="font-medium">
            {currentStep === 1 && "Generating test plan with AI..."}
            {currentStep === 2 && "Generating Playwright code with AI..."}
            {currentStep === 3 && "Committing to repository..."}
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-platinum mb-1">Generate Test Cases</h1>
          <p className="text-warm-gray">Create Playwright tests from user stories using AI</p>
        </div>

        {/* Stepper */}
        <div className="bg-platinum rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                      currentStep > step.id
                        ? "bg-success text-white"
                        : currentStep === step.id
                        ? "bg-violet text-white"
                        : "bg-warm-gray/20 text-warm-gray"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium hidden sm:block ${
                      currentStep >= step.id ? "text-violet" : "text-warm-gray"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <ArrowRight className="h-4 w-4 text-warm-gray" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="h-1 bg-warm-gray/20 rounded mt-4">
            <div
              className="h-full bg-violet rounded transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: User Story */}
            {currentStep === 1 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-onyx mb-1">Enter User Story</h2>
                <p className="text-warm-gray mb-6">Describe the feature you want to test</p>

                <div className="space-y-4">
                  <div>
                    <Label className="text-onyx font-medium">Project Name</Label>
                    <Input
                      value={project.name}
                      disabled
                      className="mt-2 bg-warm-gray/10 border-warm-gray/30 text-onyx"
                    />
                  </div>

                  <div>
                    <Label className="text-onyx font-medium">Test Title</Label>
                    <Input
                      value={testTitle}
                      onChange={(e) => setTestTitle(e.target.value)}
                      placeholder="e.g., User Login Flow"
                      className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                    />
                  </div>

                  <div>
                    <Label className="text-onyx font-medium">User Story</Label>
                    <Textarea
                      value={userStory}
                      onChange={(e) => setUserStory(e.target.value)}
                      placeholder={`As a [user type], I want to [action] so that [benefit].

Acceptance Criteria:
- Criterion 1
- Criterion 2
- Criterion 3`}
                      className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet min-h-[200px] font-mono text-sm"
                    />
                  </div>

                  <Button
                    onClick={handleGenerateTestPlan}
                    disabled={isLoading || !testTitle || !userStory}
                    className="w-full bg-violet hover:bg-lilac hover:text-violet text-white font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Test Plan
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Test Plan Review */}
            {currentStep === 2 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-onyx">Review Test Plan</h2>
                    <p className="text-warm-gray">Edit the test plan if needed</p>
                  </div>
                  <span className="px-3 py-1 bg-lilac text-violet text-sm font-medium rounded-full">
                    {scenarioCount} Scenarios
                  </span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <Label className="text-onyx font-medium">Test Plan</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-warm-gray hover:text-violet"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>

                <Textarea
                  value={testPlan}
                  onChange={(e) => setTestPlan(e.target.value)}
                  disabled={!isEditing}
                  className={`bg-white border-warm-gray/30 text-onyx min-h-[400px] font-mono text-sm ${
                    !isEditing && "bg-warm-gray/10"
                  }`}
                />

                <div className="flex items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="border-warm-gray/30 text-onyx hover:bg-white"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleGenerateCode}
                    disabled={isLoading}
                    className="flex-1 bg-violet hover:bg-lilac hover:text-violet text-white font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    Generate Code
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Generated Code */}
            {currentStep === 3 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-onyx mb-1">Review Generated Code</h2>
                <p className="text-warm-gray mb-4">Review and edit the generated code</p>

                <div className="flex items-center justify-between mb-2">
                  <Label className="text-onyx font-medium">Generated Code</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyCode}
                      className="text-warm-gray hover:text-violet"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={downloadCode}
                      className="text-warm-gray hover:text-violet"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                <div className="bg-onyx rounded-lg p-4 overflow-auto max-h-[500px] border border-warm-gray/30 code-editor">
                  <pre className="text-platinum text-sm font-mono whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="border-warm-gray/30 text-onyx hover:bg-white"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleCommit}
                    disabled={isLoading}
                    className="flex-1 bg-violet hover:bg-lilac hover:text-violet text-white font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    <GitCommit className="mr-2 h-4 w-4" />
                    Commit to Repository
                  </Button>
                </div>
              </div>
            )}

            {/* Step 4: Commit Complete */}
            {currentStep === 4 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <h2 className="text-xl font-bold text-onyx mb-1">Commit Complete</h2>
                <p className="text-warm-gray mb-8">Your test has been committed</p>

                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-20 h-20 bg-lilac rounded-full flex items-center justify-center mb-6">
                    <Check className="h-10 w-10 text-violet" />
                  </div>
                  <h3 className="text-xl font-bold text-onyx mb-2">Test Committed Successfully!</h3>
                  <p className="text-warm-gray mb-6">Your test has been committed to the repository.</p>

                  <div className="bg-warm-gray/10 rounded-lg px-6 py-3 text-center">
                    <p className="text-warm-gray text-sm mb-1">Commit hash:</p>
                    <p className="text-violet font-mono text-sm">{commitHash}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="border-warm-gray/30 text-onyx hover:bg-white"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Another
                  </Button>
                  <Button
                    onClick={() => navigate(`/projects/${id}`)}
                    className="flex-1 bg-violet hover:bg-lilac hover:text-violet text-white font-semibold py-3 rounded-xl transition-all duration-200"
                  >
                    View Project
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {currentStep === 1 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-onyx mb-4">Tips</h3>

                <div className="bg-lilac/30 rounded-xl p-4 mb-4">
                  <h4 className="font-semibold text-onyx mb-2">Writing Good User Stories</h4>
                  <ul className="text-warm-gray text-sm space-y-1">
                    <li>• Be specific about the user role</li>
                    <li>• Describe the desired action clearly</li>
                    <li>• Include acceptance criteria</li>
                    <li>• Mention edge cases if important</li>
                  </ul>
                </div>

                <div className="bg-lilac/30 rounded-xl p-4">
                  <h4 className="font-semibold text-onyx mb-2">Example User Story</h4>
                  <p className="text-warm-gray text-sm font-mono">
                    As a registered user, I want to reset my password so that I can regain access to my
                    account.
                    <br /><br />
                    Acceptance Criteria:
                    <br />- Can request reset via email
                    <br />- Receive email within 5 minutes
                    <br />- Link expires after 24 hours
                    <br />- New password must meet requirements
                  </p>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-onyx mb-4">User Story</h3>
                <div className="bg-lilac/30 rounded-xl p-4">
                  <p className="text-warm-gray text-sm mb-2">Original User Story</p>
                  <p className="text-onyx text-sm whitespace-pre-wrap">{userStory}</p>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-onyx mb-4">Test Plan</h3>
                <div className="bg-lilac/30 rounded-xl p-4 max-h-[500px] overflow-auto">
                  <p className="text-warm-gray text-sm mb-2">Test Plan</p>
                  <p className="text-onyx text-sm whitespace-pre-wrap font-mono">{testPlan}</p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-platinum rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-onyx mb-4">Summary</h3>
                <div className="space-y-4">
                  <div className="bg-lilac/30 rounded-xl p-4">
                    <p className="text-violet font-semibold mb-1">Project</p>
                    <p className="text-onyx">{project.name}</p>
                  </div>
                  <div className="bg-lilac/30 rounded-xl p-4">
                    <p className="text-violet font-semibold mb-1">File Created</p>
                    <p className="text-onyx">{generatedFilename}</p>
                  </div>
                  <div className="bg-lilac/30 rounded-xl p-4">
                    <p className="text-violet font-semibold mb-1">Status</p>
                    <p className="text-onyx">Committed</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerateTests;
