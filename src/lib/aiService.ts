// AI Service for generating test plans and Playwright code

export interface TestPlanResult {
  testPlanMarkdown: string;
  scenarioCount: number;
}

export interface GeneratedFile {
  filename: string;
  content: string;
}

export interface GeneratedCodeResult {
  files: GeneratedFile[];
  scenarioCount: number;
}

// Simulated delay to mimic AI processing
const simulateDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateTestPlan(userStory: string, testTitle: string): Promise<TestPlanResult> {
  await simulateDelay(2000);

  const testPlanMarkdown = `## Test Plan: ${testTitle}

### Test Scenarios:

1. **TC001: Successful ${testTitle}**
   - Preconditions: User is registered and logged out.
   - Steps:
     1. Navigate to the login page.
     2. Click on the "Forgot Password" link.
     3. Enter a valid username/email address.
     4. Submit the request.
   - Expected Result: An email should be sent within 5 minutes with a password reset link.

2. **TC002: Email Verification (Within 5 Minutes)**
   - Preconditions: TC001 is successful.
   - Steps:
     1. Check inbox for email from the application.
     2. Verify that the email contains a valid reset link.
     3. Verify email arrives within 5 minutes.
   - Expected Result: Email received with valid reset link.

3. **TC003: Password Reset Link Expiration**
   - Preconditions: TC001 is successful.
   - Steps:
     1. Wait 24 hours after receiving the reset email.
     2. Click on the reset link.
   - Expected Result: Link should be expired and show appropriate message.

4. **TC004: New Password Requirements**
   - Preconditions: Valid reset link clicked within 24 hours.
   - Steps:
     1. Enter new password that meets requirements.
     2. Confirm new password.
     3. Submit the form.
   - Expected Result: Password updated successfully.`;

  return {
    testPlanMarkdown,
    scenarioCount: 4
  };
}

export async function generatePlaywrightCode(testPlan: string, testTitle: string, baseUrl: string = 'https://example.com'): Promise<GeneratedCodeResult> {
  await simulateDelay(3000);

  const filename = `${testTitle.toLowerCase().replace(/\s+/g, '-')}.spec.ts`;
  
  const content = `import { test, expect } from '@playwright/test';

test.describe('${testTitle}', () => {
  let page;
  let browser;

  test.beforeEach(async ({ browser: b }) => {
    browser = b;
    page = await browser.newPage();
    await page.goto('${baseUrl}');
  });

  test.afterEach(async () => {
    await browser.close();
  });

  // Test Scenarios

  test.describe('TC001: Successful Password Reset Request', () => {
    let username: string;
    let passwordResetLink: string;

    test.beforeEach(async () => {
      const email = 'john.doe@example.com';
      const password = 'StrongPassword123';

      await page.goto('${baseUrl}/login');
      await page.click('text=Forgot Password');
      await page.fill('input[name="email"]', email);
      await page.click('button[type="submit"]');
    });

    test('should display success message', async () => {
      await expect(page.locator('.success-message')).toBeVisible();
      await expect(page.locator('.success-message')).toContainText('Check your email');
    });
  });

  test.describe('TC002: Email Verification', () => {
    test('should receive email within 5 minutes', async () => {
      // This test would typically integrate with an email testing service
      // For now, we verify the UI feedback
      await expect(page.locator('.email-sent-confirmation')).toBeVisible();
    });
  });

  test.describe('TC003: Link Expiration', () => {
    test('should show expired message for old links', async () => {
      await page.goto('${baseUrl}/reset-password?token=expired_token');
      await expect(page.locator('.error-message')).toContainText('expired');
    });
  });

  test.describe('TC004: New Password Requirements', () => {
    test('should validate password requirements', async () => {
      await page.goto('${baseUrl}/reset-password?token=valid_token');
      await page.fill('input[name="newPassword"]', 'weak');
      await page.fill('input[name="confirmPassword"]', 'weak');
      await page.click('button[type="submit"]');
      await expect(page.locator('.password-error')).toBeVisible();
    });

    test('should accept valid password', async () => {
      await page.goto('${baseUrl}/reset-password?token=valid_token');
      await page.fill('input[name="newPassword"]', 'StrongP@ssw0rd!');
      await page.fill('input[name="confirmPassword"]', 'StrongP@ssw0rd!');
      await page.click('button[type="submit"]');
      await expect(page.locator('.success-message')).toContainText('Password updated');
    });
  });
});
`;

  return {
    files: [{ filename, content }],
    scenarioCount: 4
  };
}
