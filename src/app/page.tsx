import { Navbar }          from "@/components/Navbar";
import { HeroSection }     from "@/components/HeroSection";
import { StatsSection }    from "@/components/StatsSection";
import { Services }        from "@/components/Services";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { Portfolio }       from "@/components/Portfolio";
import { About }           from "@/components/About";
import { Footer }          from "@/components/Footer";
import { BudgetModal }     from "@/components/BudgetModal";
import { CodeBackground }  from "@/components/CodeBackground";

export default function Home() {
  return (
    <main className="page-root">
      <CodeBackground />
      <Navbar />
      <HeroSection />
      <StatsSection />
      <Services />
      <ProcessTimeline />
      <Portfolio />
      <About />
      <Footer />
      <BudgetModal />
    </main>
  );
}
