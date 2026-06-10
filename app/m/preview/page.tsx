import ExperiencePlayer from "@/components/experience/ExperiencePlayer";

// For now, this page is just a placeholder to quickly iterate on the experience player.
// In the future, this could be expanded to allow users to input their own data and generate a custom experience.

export default function PreviewPage() {
  return (
    <main className="min-h-screen bg-[#FAF6F0] px-0 sm:px-4">
      <div className="mx-auto w-full max-w-[430px]">
        <ExperiencePlayer />
      </div>
    </main>
  );
}
