"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, BarChart2, FolderHeart, Sparkles } from 'lucide-react';
import Button from '../components/ui/button';
import AIRecommendationWidget from '../features/ai-widget/ai-recommendation-widget';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const systemStats = [
    { label: 'Colleges Indexed', value: '12', color: 'text-neon-cyan' },
    { label: 'Courses Analyzed', value: '38', color: 'text-neon-purple' },
    { label: 'Average Placements', value: '92.5%', color: 'text-accent-green' },
    { label: 'Match Accuracy', value: '99.4%', color: 'text-accent-yellow' }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative flex-1 flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8 bg-cyber-bg overflow-hidden"
    >
      <div className="absolute inset-0 cyber-grid opacity-[0.05] pointer-events-none" />

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl flex flex-col gap-12 z-10">
        
        {/* Hero Section */}
        <div className="text-center flex flex-col items-center gap-6">
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan font-mono text-xs uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" /> College Discovery Matrix
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-sans font-extrabold text-4xl sm:text-6xl tracking-tight uppercase text-cyber-fg leading-tight max-w-4xl"
          >
            Discover the Perfect <span className="bg-gradient-to-r from-neon-cyan via-neon-cyan-dark to-neon-purple bg-clip-text text-transparent">Academic Path</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-cyber-text-secondary text-sm sm:text-base max-w-2xl font-mono leading-relaxed"
          >
            Browse, compare, and analyze universities. Isolate top-tier educational programs optimized for engineering, computer science, management, and arts.
          </motion.p>

          <motion.div variants={itemVariants} className="flex gap-4 flex-wrap justify-center mt-2">
            <Link href="/colleges">
              <Button variant="cyan" size="lg" className="flex items-center gap-2">
                <Search className="w-4 h-4" /> Explore Colleges
              </Button>
            </Link>
            <Link href="/compare">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-neon-cyan" /> Compare Options
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 glassmorphism border border-cyber-card-border rounded relative overflow-hidden"
        >
          <div className="absolute inset-0 cyber-grid opacity-[0.05]" />
          {systemStats.map((stat, index) => (
            <div key={index} className="flex flex-col gap-1 items-center text-center p-4 border-r border-cyber-card-border last:border-r-0 max-sm:border-r-0 max-sm:border-b last:border-b-0">
              <span className={`font-mono text-2xl sm:text-3xl font-extrabold ${stat.color} tracking-tight`}>
                {stat.value}
              </span>
              <span className="font-mono text-[9px] text-cyber-text-muted tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div variants={itemVariants} className="p-6 rounded glassmorphism border border-cyber-card-border hover:border-neon-cyan/30 transition-all flex flex-col gap-3 group">
            <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan w-fit rounded">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-cyber-fg uppercase text-sm tracking-wider">Smart Filters</h3>
            <p className="text-xs text-cyber-text-secondary leading-relaxed">
              Find colleges matching your exact requirements. Filter by tuition budget, geographic location, placements, and course streams.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded glassmorphism border border-cyber-card-border hover:border-neon-cyan/30 transition-all flex flex-col gap-3 group">
            <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan w-fit rounded">
              <BarChart2 className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-cyber-fg uppercase text-sm tracking-wider">Side-by-Side Comparison</h3>
            <p className="text-xs text-cyber-text-secondary leading-relaxed">
              Isolate up to 3 colleges to compare tuition costs, placement rates, ratings, and course matrices dynamically.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="p-6 rounded glassmorphism border border-cyber-card-border hover:border-neon-cyan/30 transition-all flex flex-col gap-3 group">
            <div className="p-3 bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan w-fit rounded">
              <FolderHeart className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-cyber-fg uppercase text-sm tracking-wider">Saved Bookmarks</h3>
            <p className="text-xs text-cyber-text-secondary leading-relaxed">
              Bookmark colleges to save them locally. Quickly review, manage, or clear items from your private selection queue.
            </p>
          </motion.div>
        </div>

        {/* AI Match Widget */}
        <motion.div variants={itemVariants} className="w-full">
          <AIRecommendationWidget />
        </motion.div>

      </div>
    </motion.div>
  );
}
