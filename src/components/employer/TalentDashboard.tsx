"use client";

import React, { useState } from "react";
import { Search, Filter, Award, ShieldCheck, MapPin, CheckCircle, ExternalLink, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface CandidateCredential {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  txHash: string;
  verified: boolean;
}

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  modulesCompleted: number;
  totalModules: number;
  skills: string[];
  credentials: CandidateCredential[];
}

const MOCK_CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Aria Chen",
    title: "Full-Stack Soroban Developer",
    location: "Remote / Singapore",
    avatar: "AC",
    modulesCompleted: 8,
    totalModules: 8,
    skills: ["Rust", "Soroban", "Next.js", "TypeScript"],
    credentials: [
      { id: "cr1", title: "Soroban Core Architecture", issuer: "Learnault Protocol", issuedAt: "2026-09-15", txHash: "0x8fa1...9b21", verified: true },
      { id: "cr2", title: "Smart Contract Formal Invariants", issuer: "Stellar Foundation", issuedAt: "2026-10-02", txHash: "0x3bc4...819a", verified: true },
    ]
  },
  {
    id: "c2",
    name: "Marcus Thorne",
    title: "DeFi Protocol Engineer",
    location: "Berlin, Germany",
    avatar: "MT",
    modulesCompleted: 7,
    totalModules: 8,
    skills: ["Rust", "DeFi Mathematics", "Stellar SDK"],
    credentials: [
      { id: "cr3", title: "Liquidity AMM Mechanisms", issuer: "Learnault Protocol", issuedAt: "2026-09-28", txHash: "0x4ed2...110b", verified: true },
    ]
  },
  {
    id: "c3",
    name: "Priya Patel",
    title: "Security Auditor & Rust Specialist",
    location: "London, UK",
    avatar: "PP",
    modulesCompleted: 8,
    totalModules: 8,
    skills: ["Rust", "Formal Verification", "Soroban", "Security"],
    credentials: [
      { id: "cr4", title: "Advanced Protocol Auditing", issuer: "Learnault Security Guild", issuedAt: "2026-10-10", txHash: "0x77aa...ff23", verified: true },
      { id: "cr5", title: "Soroban Core Architecture", issuer: "Learnault Protocol", issuedAt: "2026-08-20", txHash: "0x918b...cd10", verified: true },
    ]
  }
];

export function TalentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("All");
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(MOCK_CANDIDATES[0]);

  const filteredCandidates = MOCK_CANDIDATES.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSkill = selectedSkill === "All" || c.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Employer Talent Dashboard</h1>
          <p className="text-sm text-muted-foreground">Search and verify top certified Stellar & Soroban builders with on-chain credentials.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>On-Chain Attestation Verified</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-card border rounded-2xl p-4 shadow-sm">
        <div className="relative md:col-span-2">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search candidates by name, role, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <select
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
            className="w-full py-2 px-3 text-sm rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All Specializations</option>
            <option value="Rust">Rust</option>
            <option value="Soroban">Soroban</option>
            <option value="TypeScript">TypeScript</option>
            <option value="Formal Verification">Formal Verification</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Candidates ({filteredCandidates.length})
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCandidates.map(candidate => (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate)}
                className={cn(
                  "cursor-pointer rounded-2xl border p-5 transition-all bg-card hover:border-primary/50 shadow-sm flex flex-col justify-between",
                  selectedCandidate?.id === candidate.id ? "ring-2 ring-primary border-transparent" : ""
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm">
                        {candidate.avatar}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">{candidate.name}</h3>
                        <p className="text-xs text-muted-foreground">{candidate.title}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{candidate.location}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {candidate.skills.map(skill => (
                      <span key={skill} className="text-[11px] bg-muted px-2 py-0.5 rounded-md text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                  <span>Modules: {candidate.modulesCompleted}/{candidate.totalModules} completed</span>
                  <span className="font-semibold text-primary">{candidate.credentials.length} Badges</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border rounded-2xl p-5 shadow-sm flex flex-col gap-5 h-fit sticky top-6">
          {selectedCandidate ? (
            <>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-base">
                  {selectedCandidate.avatar}
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">{selectedCandidate.name}</h2>
                  <p className="text-xs text-muted-foreground">{selectedCandidate.title}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3" /> {selectedCandidate.location}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/50 p-3.5 border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Curriculum Completion</p>
                  <p className="text-sm font-bold text-foreground mt-0.5">
                    {selectedCandidate.modulesCompleted}/{selectedCandidate.totalModules} Modules (100%)
                  </p>
                </div>
                <Award className="h-7 w-7 text-primary" />
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  On-Chain Verified Credentials ({selectedCandidate.credentials.length})
                </h4>
                <div className="flex flex-col gap-2.5">
                  {selectedCandidate.credentials.map(cred => (
                    <div key={cred.id} className="p-3 rounded-xl border bg-background/50 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">{cred.title}</span>
                        <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-2 py-0.2 rounded-full font-medium flex items-center gap-1">
                          <CheckCircle className="w-2.5 h-2.5" /> On-Chain
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">Issued by {cred.issuer} • {cred.issuedAt}</p>
                      <div className="flex items-center gap-1 text-[10px] text-primary font-mono mt-0.5">
                        <ExternalLink className="w-3 h-3" />
                        <span>Tx: {cred.txHash}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="w-full mt-2 py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Contact Candidate</span>
              </button>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-10">Select a candidate to view on-chain credentials.</p>
          )}
        </div>
      </div>
    </div>
  );
}
