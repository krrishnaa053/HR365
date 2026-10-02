import Navbar from "./Navbar";

export default function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="app-shell min-h-screen">
      <Navbar />
      <main className="min-h-screen pt-[76px] md:pt-[156px] xl:pt-[76px]">
        {children}
      </main>
    </div>
  );
}