import PageTransition from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Building the Future,
          <br />
          Restoring the Past.
        </h1>
        <p className="text-lg text-slate max-w-2xl">
          Home page content placeholder.
        </p>
      </div>
    </PageTransition>
  );
}
