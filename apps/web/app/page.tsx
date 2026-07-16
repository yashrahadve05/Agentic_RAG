import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Transformation } from "@/components/sections/transformation";
import { HowItWorks } from "@/components/sections/how-it-works";
import { ProductExperience } from "@/components/sections/product-experience";
import { Capabilities } from "@/components/sections/capabilities";
import { UseCases } from "@/components/sections/use-cases";
import { EnterpriseTrust } from "@/components/sections/enterprise-trust";
import { CTA } from "@/components/sections/cta";

/**
 * Athleia Landing Page
 *
 * Narrative flow:
 *   Hero → Problem → Transformation → How It Works →
 *   Product Experience → Capabilities → Use Cases →
 *   Enterprise Trust → CTA → Footer
 *
 * Each section naturally leads into the next, following
 * the AIDA model (Attention → Interest → Desire → Action).
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Transformation />
        <HowItWorks />
        <ProductExperience />
        <Capabilities />
        <UseCases />
        <EnterpriseTrust />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
