"use client";

import React, { useState } from 'react';
import { useStore } from '../../store/use-store';
import { mockColleges } from '../../data/colleges';
import { College } from '../../types';
import Card from '../../components/ui/card';
import Button from '../../components/ui/button';
import RatingBadge from '../../components/ui/rating-badge';
import { Cpu, Terminal, ArrowRight, ShieldAlert, Sparkles, MapPin, DollarSign, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface RecommendationResult {
  college: College;
  matchScore: number;
  reasons: string[];
}

export const AIRecommendationWidget: React.FC = () => {
  const [rank, setRank] = useState<number>(2500);
  const [prefState, setPrefState] = useState<string>('Any');
  const [budget, setBudget] = useState<number>(60000);
  const [course, setCourse] = useState<string>('Engineering');

  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [results, setResults] = useState<RecommendationResult[]>([]);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const states = ['Any', 'California', 'Massachusetts', 'New York', 'Texas', 'Washington', 'Illinois'];
  const courses = ['Engineering', 'Management', 'Science', 'Arts'];

  const executeRecommendation = async () => {
    setIsAnalyzing(true);
    setHasSearched(true);
    setTerminalLogs([]);
    setResults([]);

    const logs = [
      'Connecting to match engine...',
      'Parsing entrance rank: #' + rank + '...',
      'Validating geographic preferences: ' + prefState.toUpperCase() + '...',
      'Filtering tuition budget ceiling: $' + budget.toLocaleString() + '...',
      'Matching course stream options: ' + course.toUpperCase() + '...',
      'Calculating alignment scores...',
      'Sorting top matches...',
      'Analysis complete.'
    ];

    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      setTerminalLogs((prev) => [...prev, `[LOG] ${logs[i]}`]);
    }

    await new Promise((resolve) => setTimeout(resolve, 200));

    const calculated: RecommendationResult[] = mockColleges
      .map((c) => {
        let score = 50;
        const reasons: string[] = [];

        const isTopSchool = c.id === 'neo-stanford' || c.id === 'nova-mit';
        if (isTopSchool) {
          if (rank <= 3000) {
            score += 15;
            reasons.push('Rank meets top-tier criteria.');
          } else {
            score -= 15;
            reasons.push('Rank exceeds typical average for this university.');
          }
        } else {
          if (rank > 3000) {
            score += 10;
            reasons.push('Rank is highly competitive for engineering courses.');
          } else {
            score += 15;
            reasons.push('Rank is well within competitive standards.');
          }
        }

        if (c.fees <= budget) {
          score += 15;
          reasons.push(`Tuition is within financial limit ($${c.fees.toLocaleString()}/yr).`);
        } else {
          score -= 15;
          reasons.push(`Tuition exceeds specified budget limit ($${c.fees.toLocaleString()}/yr).`);
        }

        if (prefState === 'Any' || c.location.state === prefState) {
          score += 15;
          if (prefState !== 'Any') {
            reasons.push(`Location matches preferred state (${c.location.state}).`);
          }
        } else {
          score -= 5;
        }

        const hasPreferredCourse = c.courses.some((cr) => cr.type === course);
        if (hasPreferredCourse) {
          score += 15;
          reasons.push(`Catalog includes selected stream (${course}).`);
        } else {
          score -= 20;
          reasons.push(`No direct programs detected for ${course}.`);
        }

        const finalScore = Math.max(10, Math.min(100, score));

        return {
          college: c,
          matchScore: finalScore,
          reasons: reasons.slice(0, 3)
        };
      })
      .filter((r) => r.matchScore >= 60)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    setResults(calculated);
    setIsAnalyzing(false);
  };

  return (
    <Card glow="cyan" className="w-full transition-colors duration-300">
      <div className="flex items-center gap-2 mb-6 border-b border-cyber-card-border pb-4">
        <Sparkles className="w-5 h-5 text-neon-cyan animate-pulse" />
        <div>
          <h2 className="font-sans text-base font-bold text-cyber-fg uppercase tracking-wider">
            University Compatibility Finder
          </h2>
          <p className="text-[10px] text-cyber-text-secondary font-mono">Mock Recommendation Engine</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-cyber-text-secondary flex justify-between">
              <span>Entrance Rank</span>
              <span className="text-neon-cyan font-bold">Rank: #{rank}</span>
            </label>
            <input
              type="number"
              min="1"
              max="50000"
              value={rank}
              onChange={(e) => setRank(Math.max(1, parseInt(e.target.value) || 0))}
              className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2 text-xs font-mono text-cyber-fg focus:outline-none focus:border-neon-cyan"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-cyber-text-secondary flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neon-cyan" /> Preferred State
            </label>
            <select
              value={prefState}
              onChange={(e) => setPrefState(e.target.value)}
              className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2 text-xs font-mono text-cyber-fg focus:outline-none focus:border-neon-cyan cursor-pointer"
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs text-cyber-text-secondary flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-neon-cyan" /> Preferred Stream
            </label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2 text-xs font-mono text-cyber-fg focus:outline-none focus:border-neon-cyan cursor-pointer"
            >
              {courses.map((c) => (
                <option key={c} value={c}>
                  {c.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-cyber-text-secondary flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-neon-cyan" /> Tuition Budget Limit
              </span>
              <span className="text-neon-cyan font-bold">${budget.toLocaleString()}/yr</span>
            </div>
            <input
              type="range"
              min="30000"
              max="80000"
              step="5000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full accent-neon-cyan cursor-pointer"
            />
            <div className="flex justify-between font-mono text-[9px] text-cyber-text-muted">
              <span>$30K</span>
              <span>$80K</span>
            </div>
          </div>

          <Button
            onClick={executeRecommendation}
            disabled={isAnalyzing}
            className="w-full mt-2 font-mono flex items-center justify-center gap-2"
          >
            <Cpu className="w-4 h-4 animate-spin" style={{ animationDuration: isAnalyzing ? '2s' : '0s' }} />
            Find Matches
          </Button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-cyber-card-border lg:pl-8 pt-6 lg:pt-0 min-h-[300px]">
          {isAnalyzing || (!hasSearched && terminalLogs.length === 0) ? (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-6 border border-dashed border-cyber-card-border rounded bg-cyber-card-bg/10">
              {isAnalyzing ? (
                <div className="flex flex-col items-center gap-3">
                  <Terminal className="w-8 h-8 text-neon-cyan animate-pulse" />
                  <div className="w-48 bg-cyber-card-border h-1 rounded overflow-hidden relative">
                    <div className="absolute top-0 left-0 bg-neon-cyan h-full w-1/3 animate-[pulse_1s_infinite]" />
                  </div>
                  <span className="font-mono text-xs text-cyber-text-secondary animate-pulse">Analyzing compatibility profiles...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Sparkles className="w-8 h-8 text-neon-purple opacity-40" />
                  <span className="font-mono text-xs text-cyber-text-secondary max-w-xs">
                    Enter your criteria on the left to calculate compatibility matches.
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col gap-3">
                <h4 className="font-mono text-xs font-bold text-neon-cyan tracking-widest uppercase">
                  Recommended Matches:
                </h4>

                {results.length === 0 ? (
                  <div className="flex items-center gap-3 p-4 border border-accent-red/20 rounded bg-accent-red/[0.02]">
                    <ShieldAlert className="w-5 h-5 text-accent-red" />
                    <span className="font-mono text-xs text-cyber-text-secondary">
                      No universities match your criteria. Try increasing your budget or entering a higher rank.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {results.map(({ college, matchScore, reasons }, idx) => (
                      <div
                        key={college.id}
                        className="p-4 rounded border border-cyber-card-border bg-cyber-card-bg hover:border-neon-cyan/30 hover:bg-cyber-card-bg/60 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group"
                      >
                        <div className="flex-1 flex flex-col gap-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-mono text-xs text-cyber-text-muted font-bold">#{idx + 1}</span>
                            <h5 className="font-sans text-xs font-bold text-cyber-fg group-hover:text-neon-cyan transition-colors">
                              {college.name}
                            </h5>
                            <RatingBadge rating={college.rating} showText={false} />
                          </div>
                          
                          <div className="flex gap-4 text-[10px] text-cyber-text-secondary font-mono">
                            <span>Fees: ${college.fees.toLocaleString()}/yr</span>
                            <span>Placement: {college.placementPercentage}%</span>
                          </div>

                          <div className="flex flex-col gap-0.5 mt-1">
                            {reasons.map((r, rIdx) => (
                              <span key={rIdx} className="text-[9px] font-mono text-cyber-text-secondary flex items-center gap-1">
                                <ArrowRight className="w-2.5 h-2.5 text-neon-purple" /> {r}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-end gap-2 w-full sm:w-auto border-t sm:border-t-0 border-cyber-card-border pt-3 sm:pt-0 justify-between">
                          <div className="px-2.5 py-1 rounded bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-mono text-xs font-bold shadow-[0_0_10px_rgba(0,229,255,0.1)]">
                            {matchScore}% Match
                          </div>
                          <Link href={`/college/${college.id}`} className="sm:self-end">
                            <button className="font-mono text-[9px] text-cyber-text-secondary hover:text-cyber-text-primary uppercase flex items-center gap-0.5 transition-colors cursor-pointer">
                              View Details <ArrowRight className="w-3 h-3" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {terminalLogs.length > 0 && (
            <div className="p-3 bg-cyber-bg border border-cyber-card-border rounded font-mono text-[9px] text-cyber-text-secondary max-h-36 overflow-y-auto">
              <div className="flex justify-between items-center pb-1.5 mb-1.5 border-b border-cyber-card-border text-cyber-text-muted">
                <span>Recommendation Logs</span>
                <span>Status: Ready</span>
              </div>
              <div className="flex flex-col gap-0.5">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className={log.includes('complete') ? 'text-accent-green' : ''}>
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
export default AIRecommendationWidget;
