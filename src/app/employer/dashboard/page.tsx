import { TalentDashboard } from "@/components/employer/TalentDashboard";

export const metadata = {
  title: "Employer Talent Dashboard | Learnault",
  description: "Browse and verify certified Web3 talent with on-chain credentials.",
};

export default function EmployerDashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <TalentDashboard />
    </main>
  );
}
