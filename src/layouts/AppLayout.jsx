import Header from "@/components/common/Header/Header";
import BottomNav from "@/components/common/BottomNav/BottomNav";

function AppLayout({
  title = "TINDER-ITT",
  children,
  showBottomNav = true,
  showHeader = true,
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-md flex-col text-slate-50">
      {showHeader ? <Header title={title} /> : null}

      <main className={`flex-1 px-4 pt-4 ${showBottomNav ? "pb-28" : "pb-6"}`}>
        {children}
      </main>

      {showBottomNav ? <BottomNav /> : null}
    </div>
  );
}

export default AppLayout;
