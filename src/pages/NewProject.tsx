import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, FolderPlus, FolderSync, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { saveProject, generateId, Project } from "@/lib/storage";

const steps = [
  { id: 1, name: "Project Type" },
  { id: 2, name: "Basic Info" },
  { id: 3, name: "Repository" },
  { id: 4, name: "Test Settings" },
];

const NewProject = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "" as "new" | "existing" | "",
    name: "",
    description: "",
    repoUrl: "",
    branch: "main",
    gitUsername: "",
    gitEmail: "",
    gitToken: "",
    testFolder: "tests",
    baseUrl: "",
    testLanguage: "typescript",
    defaultBrowser: "chromium",
    timeout: "30",
    retries: "0",
    screenshots: "only-on-failure",
    headless: "yes",
    videoRecording: "off",
  });

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType !== "";
      case 2:
        return formData.name.length >= 3;
      case 3:
        if (formData.projectType === "existing") {
          return (
            formData.repoUrl &&
            formData.branch &&
            formData.gitUsername &&
            formData.gitEmail &&
            formData.gitToken
          );
        }
        return true;
      case 4:
        return formData.testFolder && formData.baseUrl;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/projects");
    }
  };

  const handleSubmit = () => {
    const project: Project = {
      id: generateId(),
      name: formData.name,
      description: formData.description,
      projectType: formData.projectType as "new" | "existing",
      repoUrl: formData.repoUrl,
      branch: formData.branch,
      gitUsername: formData.gitUsername,
      gitEmail: formData.gitEmail,
      gitToken: formData.gitToken,
      testFolder: formData.testFolder,
      baseUrl: formData.baseUrl,
      testLanguage: formData.testLanguage,
      defaultBrowser: formData.defaultBrowser,
      timeout: formData.timeout,
      retries: formData.retries,
      screenshots: formData.screenshots,
      headless: formData.headless,
      videoRecording: formData.videoRecording,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      testCases: [],
    };

    saveProject(project);
    toast({
      title: "Project created!",
      description: "Your project has been created successfully.",
    });
    navigate("/projects");
  };

  return (
    <div className="min-h-screen bg-onyx p-6">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <button
          onClick={() => navigate("/projects")}
          className="flex items-center gap-2 text-platinum hover:text-lilac mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-platinum mb-1">Create New Project</h1>
          <p className="text-warm-gray">Set up a new project to start generating Playwright tests</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep > step.id
                        ? "bg-success text-white"
                        : currentStep === step.id
                        ? "bg-violet text-white"
                        : "bg-warm-gray/30 text-warm-gray"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="h-4 w-4" /> : step.id}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-violet" : "text-warm-gray"
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4 h-1 bg-warm-gray/30 rounded hidden sm:block">
                    <div
                      className="h-full bg-violet rounded transition-all duration-300"
                      style={{
                        width: currentStep > step.id ? "100%" : "0%",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="h-1 bg-platinum rounded mt-4">
            <div
              className="h-full bg-violet rounded transition-all duration-300"
              style={{ width: `${(currentStep / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-platinum rounded-2xl p-8 shadow-lg mb-6">
          {/* Step 1: Project Type */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-bold text-onyx mb-1">Project Type</h2>
              <p className="text-warm-gray mb-6">Choose your project setup</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => updateFormData("projectType", "new")}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.projectType === "new"
                      ? "border-violet bg-lilac/30"
                      : "border-warm-gray/30 hover:border-violet/50"
                  }`}
                >
                  <div className="w-12 h-12 bg-lilac rounded-xl flex items-center justify-center mb-4">
                    <FolderPlus className="h-6 w-6 text-violet" />
                  </div>
                  <h3 className="text-onyx font-bold mb-1">New Project</h3>
                  <p className="text-warm-gray text-sm">Start fresh with an empty Git repository</p>
                </button>

                <button
                  onClick={() => updateFormData("projectType", "existing")}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    formData.projectType === "existing"
                      ? "border-violet bg-lilac/30"
                      : "border-warm-gray/30 hover:border-violet/50"
                  }`}
                >
                  <div className="w-12 h-12 bg-lilac rounded-xl flex items-center justify-center mb-4">
                    <FolderSync className="h-6 w-6 text-violet" />
                  </div>
                  <h3 className="text-onyx font-bold mb-1">Existing Project</h3>
                  <p className="text-warm-gray text-sm">Connect to an existing repository</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-bold text-onyx mb-1">Basic Info</h2>
              <p className="text-warm-gray mb-6">Name and description</p>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-onyx font-medium">
                    Project Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="e.g., E-Commerce Platform"
                    className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                  />
                  <p className="text-warm-gray text-sm mt-1">Minimum 3 characters</p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-onyx font-medium">
                    Description (Optional)
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateFormData("description", e.target.value)}
                    placeholder="Brief description of what this project tests..."
                    className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet min-h-[120px]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Repository */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-bold text-onyx mb-1">Repository</h2>
              <p className="text-warm-gray mb-6">Git configuration</p>

              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-warm-gray uppercase tracking-wider">Repository</p>
                  
                  <div>
                    <Label htmlFor="repoUrl" className="text-onyx font-medium flex items-center gap-1">
                      <span>Repository URL</span>
                      {formData.projectType === "existing" && <span className="text-destructive">*</span>}
                    </Label>
                    <Input
                      id="repoUrl"
                      value={formData.repoUrl}
                      onChange={(e) => updateFormData("repoUrl", e.target.value)}
                      placeholder="https://github.com/your-org/repo-name"
                      className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                    />
                    <p className="text-warm-gray text-sm mt-1">We'll add tests to your existing repository.</p>
                  </div>

                  <div>
                    <Label htmlFor="branch" className="text-onyx font-medium">
                      Default Branch *
                    </Label>
                    <Input
                      id="branch"
                      value={formData.branch}
                      onChange={(e) => updateFormData("branch", e.target.value)}
                      placeholder="main"
                      className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                    />
                    <p className="text-warm-gray text-sm mt-1">The branch where tests will be committed</p>
                  </div>
                </div>

                {formData.projectType === "existing" && (
                  <div className="space-y-4">
                    <p className="text-sm font-medium text-warm-gray uppercase tracking-wider">Git Credentials</p>
                    <p className="text-warm-gray text-sm">These credentials will be used to clone and push to the repository</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="gitUsername" className="text-onyx font-medium">
                          Git Username *
                        </Label>
                        <Input
                          id="gitUsername"
                          value={formData.gitUsername}
                          onChange={(e) => updateFormData("gitUsername", e.target.value)}
                          placeholder="johndoe"
                          className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                        />
                      </div>
                      <div>
                        <Label htmlFor="gitEmail" className="text-onyx font-medium">
                          Git Email *
                        </Label>
                        <Input
                          id="gitEmail"
                          type="email"
                          value={formData.gitEmail}
                          onChange={(e) => updateFormData("gitEmail", e.target.value)}
                          placeholder="john@example.com"
                          className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="gitToken" className="text-onyx font-medium">
                        Personal Access Token *
                      </Label>
                      <Input
                        id="gitToken"
                        type="password"
                        value={formData.gitToken}
                        onChange={(e) => updateFormData("gitToken", e.target.value)}
                        placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                        className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                      />
                      <p className="text-warm-gray text-sm mt-1">
                        Token must have repo read/write permissions.{" "}
                        <a href="#" className="text-violet hover:underline">Generate token →</a>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Test Settings */}
          {currentStep === 4 && (
            <div>
              <h2 className="text-xl font-bold text-onyx mb-1">Test Settings</h2>
              <p className="text-warm-gray mb-6">Playwright configuration</p>

              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-sm font-medium text-warm-gray uppercase tracking-wider">Basic Settings</p>
                  
                  <div>
                    <Label htmlFor="testFolder" className="text-onyx font-medium">
                      Test Folder Path *
                    </Label>
                    <Input
                      id="testFolder"
                      value={formData.testFolder}
                      onChange={(e) => updateFormData("testFolder", e.target.value)}
                      placeholder="tests"
                      className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                    />
                    <p className="text-warm-gray text-sm mt-1">Relative path from repository root. Will be created if it doesn't exist.</p>
                  </div>

                  <div>
                    <Label htmlFor="baseUrl" className="text-onyx font-medium">
                      Application Base URL *
                    </Label>
                    <Input
                      id="baseUrl"
                      value={formData.baseUrl}
                      onChange={(e) => updateFormData("baseUrl", e.target.value)}
                      placeholder="https://staging.your-app.com"
                      className="mt-2 bg-white border-warm-gray/30 text-onyx focus:ring-violet"
                    />
                    <p className="text-warm-gray text-sm mt-1">The URL where your application is running for testing</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="testLanguage" className="text-onyx font-medium">
                        Test Language *
                      </Label>
                      <Select value={formData.testLanguage} onValueChange={(v) => updateFormData("testLanguage", v)}>
                        <SelectTrigger className="mt-2 bg-white border-warm-gray/30 text-onyx">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="typescript">TypeScript (.spec.ts)</SelectItem>
                          <SelectItem value="javascript">JavaScript (.spec.js)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="defaultBrowser" className="text-onyx font-medium">
                        Default Browser
                      </Label>
                      <Select value={formData.defaultBrowser} onValueChange={(v) => updateFormData("defaultBrowser", v)}>
                        <SelectTrigger className="mt-2 bg-white border-warm-gray/30 text-onyx">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chromium">Chromium</SelectItem>
                          <SelectItem value="firefox">Firefox</SelectItem>
                          <SelectItem value="webkit">WebKit</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-medium text-warm-gray uppercase tracking-wider">Playwright Configuration</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timeout" className="text-onyx font-medium">
                        Timeout
                      </Label>
                      <Select value={formData.timeout} onValueChange={(v) => updateFormData("timeout", v)}>
                        <SelectTrigger className="mt-2 bg-white border-warm-gray/30 text-onyx">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 seconds</SelectItem>
                          <SelectItem value="60">60 seconds</SelectItem>
                          <SelectItem value="120">120 seconds</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-warm-gray text-sm mt-1">Maximum time for each test</p>
                    </div>
                    <div>
                      <Label htmlFor="retries" className="text-onyx font-medium">
                        Retries
                      </Label>
                      <Select value={formData.retries} onValueChange={(v) => updateFormData("retries", v)}>
                        <SelectTrigger className="mt-2 bg-white border-warm-gray/30 text-onyx">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">No retries</SelectItem>
                          <SelectItem value="1">1 retry</SelectItem>
                          <SelectItem value="2">2 retries</SelectItem>
                          <SelectItem value="3">3 retries</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-warm-gray text-sm mt-1">Retry failed tests</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="headless" className="text-onyx font-medium">
                        Headless Mode
                      </Label>
                      <Select value={formData.headless} onValueChange={(v) => updateFormData("headless", v)}>
                        <SelectTrigger className="mt-2 bg-white border-warm-gray/30 text-onyx">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes (headless)</SelectItem>
                          <SelectItem value="no">No (headed)</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-warm-gray text-sm mt-1">Run browser in headless mode</p>
                    </div>
                    <div>
                      <Label htmlFor="screenshots" className="text-onyx font-medium">
                        Screenshots
                      </Label>
                      <Select value={formData.screenshots} onValueChange={(v) => updateFormData("screenshots", v)}>
                        <SelectTrigger className="mt-2 bg-white border-warm-gray/30 text-onyx">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="off">Off</SelectItem>
                          <SelectItem value="only-on-failure">Only on failure</SelectItem>
                          <SelectItem value="on">On</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-warm-gray text-sm mt-1">When to capture screenshots</p>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="videoRecording" className="text-onyx font-medium">
                      Video Recording
                    </Label>
                    <Select value={formData.videoRecording} onValueChange={(v) => updateFormData("videoRecording", v)}>
                      <SelectTrigger className="mt-2 bg-white border-warm-gray/30 text-onyx max-w-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="off">Off</SelectItem>
                        <SelectItem value="on">On</SelectItem>
                        <SelectItem value="on-first-retry">On first retry</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-warm-gray text-sm mt-1">When to record video of test execution</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary Card (shown on step 4) */}
        {currentStep === 4 && (
          <div className="bg-platinum rounded-2xl p-6 shadow-lg mb-6">
            <h3 className="text-lg font-bold text-onyx mb-4">Project Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-warm-gray">Type</p>
                <p className="text-onyx font-medium capitalize">{formData.projectType} Project</p>
              </div>
              <div>
                <p className="text-warm-gray">Name</p>
                <p className="text-onyx font-medium">{formData.name}</p>
              </div>
              <div>
                <p className="text-warm-gray">Branch</p>
                <p className="text-onyx font-medium">{formData.branch}</p>
              </div>
              <div>
                <p className="text-warm-gray">Test Folder</p>
                <p className="text-onyx font-medium">{formData.testFolder}</p>
              </div>
              <div>
                <p className="text-warm-gray">Test Language</p>
                <p className="text-onyx font-medium capitalize">{formData.testLanguage}</p>
              </div>
              <div>
                <p className="text-warm-gray">Browser</p>
                <p className="text-onyx font-medium capitalize">{formData.defaultBrowser}</p>
              </div>
              <div>
                <p className="text-warm-gray">Timeout</p>
                <p className="text-onyx font-medium">{formData.timeout} seconds</p>
              </div>
              <div>
                <p className="text-warm-gray">Retries</p>
                <p className="text-onyx font-medium">{formData.retries === "0" ? "No retries" : `${formData.retries} retries`}</p>
              </div>
              <div>
                <p className="text-warm-gray">Headless</p>
                <p className="text-onyx font-medium">{formData.headless === "yes" ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-warm-gray">Screenshots</p>
                <p className="text-onyx font-medium capitalize">{formData.screenshots.replace(/-/g, " ")}</p>
              </div>
              <div>
                <p className="text-warm-gray">Video</p>
                <p className="text-onyx font-medium capitalize">{formData.videoRecording}</p>
              </div>
              {formData.projectType === "existing" && formData.gitUsername && (
                <div>
                  <p className="text-warm-gray">Git User</p>
                  <p className="text-onyx font-medium">{formData.gitUsername}</p>
                </div>
              )}
              {formData.repoUrl && (
                <div className="col-span-2">
                  <p className="text-warm-gray">Repository</p>
                  <p className="text-onyx font-medium truncate">{formData.repoUrl}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            className="border-warm-gray/30 text-onyx hover:bg-platinum"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-violet hover:bg-lilac hover:text-violet text-white font-semibold px-6 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed()}
              className="bg-violet hover:bg-lilac hover:text-violet text-white font-semibold px-6 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {formData.projectType === "existing" ? "Generate Application" : "Create Project"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProject;
