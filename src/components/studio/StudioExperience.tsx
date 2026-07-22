"use client";

import { LenisProvider } from "@/lib/studio/lenis";
import { LangProvider, LangToggle } from "@/lib/studio/i18n";
import { Loader } from "./Loader";
import { Cursor } from "./Cursor";
import { Grain } from "./Grain";
import { ScrollProgress } from "./ScrollProgress";
import { StudioNav } from "./StudioNav";
import { ScrollStage } from "./ScrollStage";
import { RingSectors } from "./RingSectors";
import { WorksGallery } from "./WorksGallery";
import { StudioPackages } from "./StudioPackages";
import { StudioContact } from "./StudioContact";
import { StudioFooter } from "./StudioFooter";

/** The full Nudot-class experience, assembled. */
export function StudioExperience() {
  return (
    <LenisProvider>
      <LangProvider>
      <div className="studio-root">
        <Loader />
        <Cursor />
        <Grain />
        <ScrollProgress />
        <StudioNav />
        <LangToggle />
        <main>
          <ScrollStage />
          <RingSectors />
          <WorksGallery />
          <StudioPackages />
          <StudioContact />
        </main>
        <StudioFooter />
      </div>
      </LangProvider>
    </LenisProvider>
  );
}
