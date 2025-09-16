"use client";
import React, { useEffect, useState } from "react";
import SimliOpenAI from "./SimliOpenAI";
import DottedFace from "./Components/DottedFace";
import SimliHeaderLogo from "./Components/Logo";
// Image import removed; no images used directly on this page

interface avatarSettings {
  name: string;
  openai_voice: "alloy" | "ash" | "ballad" | "coral" | "echo" | "sage" | "shimmer" | "verse";
  openai_model: string;
  simli_faceid: string;
  initialPrompt: string;
}

// Customize your avatar here
const avatar: avatarSettings = {
  name: "Loyola Assistant",
  openai_voice: "echo",
  openai_model: "gpt-realtime-2025-08-28",
  simli_faceid: "b1f6ad8f-ed78-430b-85ef-2ec672728104",
  initialPrompt:
    "You are the Loyola School virtual assistant. Be warm, concise, and helpful. You can answer questions about Loyola School including admissions, academics, campus life, and contact information. Keep answers short and straightforward unless asked to elaborate.",
};

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);
  const [initialPrompt, setInitialPrompt] = useState<string>(avatar.initialPrompt);

  useEffect(() => {
    let isMounted = true;
    const loadPrompt = async () => {
      try {
        const res = await fetch("/api/prompt", { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (isMounted && text?.trim()) setInitialPrompt(text);
      } catch (e) {
        console.warn("Falling back to embedded prompt:", e);
      }
    };
    loadPrompt();
    return () => {
      isMounted = false;
    };
  }, []);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      <SimliHeaderLogo />
      {/* Top-right area intentionally left blank for Loyola site (remove Simli GitHub link) */}
      <div className="flex flex-col items-center gap-6 bg-effect15White p-4 md:p-6 pb-[40px] rounded-xl w-full max-w-[1700px]">
        <div>
          {showDottedFace && <DottedFace />}
          <SimliOpenAI
            openai_voice={avatar.openai_voice}
            openai_model={avatar.openai_model}
            simli_faceid={avatar.simli_faceid}
            initialPrompt={initialPrompt}
            onStart={onStart}
            onClose={onClose}
            showDottedFace={showDottedFace}
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;
