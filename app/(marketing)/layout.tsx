import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Shared chrome for every marketing page (home, services, about, etc.).
// The booking flow at /book sits outside this group and keeps its own layout.
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
