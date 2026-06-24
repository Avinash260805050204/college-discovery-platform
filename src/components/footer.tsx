import React from 'react';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-black py-10 relative mt-auto">
      <div className="absolute inset-0 cyber-grid opacity-[0.01] pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="h-5 w-5 text-neon-cyan opacity-80" />
            <span className="font-mono text-sm tracking-widest text-zinc-400">
              COLLEGEVERSE<span className="text-white">_AI</span> // SYS.VER.2.0.46
            </span>
          </div>
          
          <div className="flex gap-6 font-mono text-xs text-zinc-500">
            <span className="hover:text-neon-cyan cursor-pointer transition-colors">PRIVACY_PROTOCOL</span>
            <span className="hover:text-neon-cyan cursor-pointer transition-colors">SECURITY_MANIFEST</span>
            <span className="hover:text-neon-cyan cursor-pointer transition-colors">NET_GATEWAY</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent-green animate-pulse shadow-[0_0_6px_#22C55E]" />
            <span className="text-zinc-500 uppercase">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="font-mono text-[10px] text-zinc-600">
            &copy; {new Date().getFullYear()} COLLEGEVERSE AI CORE. LICENSED UNDER INTERNET SECURITY PROTOCOL 908-C.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
