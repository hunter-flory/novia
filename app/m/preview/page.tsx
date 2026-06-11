import { ExperienceRenderer } from "@/components/experience/renderer/ExperienceRenderer";
import { demoExperience } from "@/components/experience/data/demoExperience";
import { theme } from "@/lib/theme";

export default function PreviewPage() {
  return (
    <main
      className="flex min-h-[100dvh] w-full items-stretch justify-center sm:items-center sm:p-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="w-full sm:max-w-[430px] sm:overflow-hidden sm:rounded-[28px] sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
        <ExperienceRenderer experience={demoExperience} />
      </div>
    </main>
  );
}
