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
  openai_voice: "ash",
  openai_model: "gpt-realtime-2025-08-28",
  simli_faceid: "2bf19506-fd38-4296-b652-b7f661242004",
  initialPrompt:
    `
You are a helpful, friendly AI assistant designed to provide information, answer questions, and engage in conversation. You speak only English. Your tone is warm and approachable while remaining professional. Answer users’ questions in short, engaging responses. Refer to the following knowledgebase:
`,
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
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8 relative overflow-hidden">
      {/* ambient gradient glow background */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-3xl"></div>
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.35),transparent_60%)] blur-3xl"></div>

      <SimliHeaderLogo />

      {/* Page heading */}
      <h1 className="mt-4 mb-2 text-center text-2xl md:text-3xl lg:text-4xl font-abc-repro-mono font-bold tracking-tight">
        Loyola Information Chatbot
      </h1>

      {/* Top-right area intentionally left blank for Loyola site (remove Simli GitHub link) */}
      <div className="flex flex-col items-center gap-6 w-full max-w-[1700px] p-4 md:p-6 pb-[40px] rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
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
