"use client";

import React, { useState } from 'react';
import { useCollege } from '../../../hooks/use-colleges';
import { useStore } from '../../../store/use-store';
import RatingBadge from '../../../components/ui/rating-badge';
import Card from '../../../components/ui/card';
import Button from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import ErrorState from '../../../components/ui/error-state';
import { MapPin, Heart, Plus, Check, DollarSign, Award, Percent, Calendar, Briefcase, Cpu, MessageSquare } from 'lucide-react';

interface CollegeDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function CollegeDetailPage({ params }: CollegeDetailPageProps) {
  const { id } = React.use(params);
  const { savedColleges, toggleSaveCollege, compareList, addToCompare, removeFromCompare } = useStore();
  const { data: college, isLoading, isError, refetch } = useCollege(id);

  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState<any[]>([]);

  if (isLoading) {
    return (
      <div className="flex-1 bg-cyber-bg py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !college) {
    return (
      <div className="flex-1 bg-cyber-bg py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <ErrorState
            title="Database Record Unreachable"
            message="The requested college database file is unretrievable or has been deleted."
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  const isSaved = savedColleges.includes(college.id);
  const isCompared = compareList.includes(college.id);

  const handleSave = () => toggleSaveCollege(college.id);

  const handleCompare = () => {
    if (isCompared) {
      removeFromCompare(college.id);
    } else {
      const added = addToCompare(college.id);
      if (!added) {
        alert('Comparison queue full! You can compare a maximum of 3 colleges side-by-side.');
      }
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    const newReview = {
      id: Math.random().toString(),
      userName: reviewName,
      rating: reviewRating,
      comment: reviewComment,
      date: new Date().toISOString().split('T')[0],
    };

    setLocalReviews([newReview, ...localReviews]);
    setReviewName('');
    setReviewComment('');
    setReviewRating(5);
  };

  const allReviews = [...localReviews, ...college.reviews];

  const navSections = [
    { id: 'overview', name: 'OVERVIEW' },
    { id: 'courses', name: 'COURSES' },
    { id: 'placements', name: 'PLACEMENTS' },
    { id: 'fees', name: 'FEES' },
    { id: 'reviews', name: 'REVIEWS' },
    { id: 'facilities', name: 'FACILITIES' },
  ];

  return (
    <div className="flex-1 bg-cyber-bg pb-16 relative transition-colors duration-300">
      <div className="absolute inset-0 cyber-grid opacity-[0.02] pointer-events-none" />
      
      {/* Hero Banner Section */}
      <div className="relative h-64 sm:h-80 w-full bg-gradient-to-br from-neon-cyan/10 via-cyber-bg to-neon-purple/20 border-b border-cyber-card-border flex items-end">
        <div className="absolute inset-0 cyber-grid opacity-[0.1]" />
        
        <div className="absolute top-10 right-10 w-24 h-24 rounded-full bg-neon-cyan/5 blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-8 z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-neon-purple/10 border border-neon-purple/20 text-neon-pink tracking-wider uppercase font-bold">
                Compatibility: {college.aiScore}%
              </span>
              <RatingBadge rating={college.rating} />
            </div>
            <h1 className="font-sans text-2xl sm:text-4xl font-extrabold text-cyber-fg tracking-wide uppercase">
              {college.name}
            </h1>
            <div className="flex items-center gap-4 text-xs font-mono text-cyber-text-secondary">
              <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-neon-cyan" /> {college.location.city}, {college.location.state}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-neon-cyan" /> Established {college.establishedYear}</span>
            </div>
          </div>

          {/* Action HUD */}
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleSave}
              className={`flex-1 sm:flex-none font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 border rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                isSaved
                  ? 'bg-neon-pink/15 border-neon-pink text-neon-pink shadow-[0_0_10px_rgba(168,85,247,0.2)]'
                  : 'border-cyber-card-border text-cyber-text-secondary hover:text-cyber-text-primary hover:border-cyber-text-secondary/40'
              }`}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-neon-pink' : ''}`} /> {isSaved ? 'Bookmarked' : 'Bookmark'}
            </button>

            <button
              onClick={handleCompare}
              className={`flex-1 sm:flex-none font-mono text-xs font-bold uppercase tracking-wider px-4 py-2.5 border rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                isCompared
                  ? 'bg-neon-cyan/15 border-neon-cyan text-neon-cyan shadow-[0_0_10px_rgba(0,229,255,0.2)]'
                  : 'border-cyber-card-border text-cyber-text-secondary hover:text-cyber-text-primary hover:border-cyber-text-secondary/40'
              }`}
            >
              {isCompared ? (
                <>
                  <Check className="w-4 h-4" /> Comparing
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Compare
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Navigation Bar */}
      <div className="sticky top-16 z-30 w-full border-b border-cyber-card-border bg-cyber-bg/90 backdrop-blur-md transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto gap-6 h-12 items-center no-scrollbar">
            {navSections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="font-mono text-xs font-bold tracking-wider text-cyber-text-secondary hover:text-neon-cyan transition-colors whitespace-nowrap"
              >
                {sec.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Detail Modules Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Areas */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Overview Section */}
            <section id="overview" className="scroll-mt-32">
              <Card>
                <h3 className="font-mono text-sm font-bold text-neon-cyan uppercase tracking-widest border-b border-cyber-card-border pb-2 mb-4">
                  Overview
                </h3>
                <p className="font-sans text-sm text-cyber-text-secondary leading-relaxed font-light">
                  {college.overview}
                </p>
              </Card>
            </section>

            {/* Courses Section */}
            <section id="courses" className="scroll-mt-32">
              <Card>
                <h3 className="font-mono text-sm font-bold text-neon-cyan uppercase tracking-widest border-b border-cyber-card-border pb-2 mb-4">
                  Courses & Curriculums
                </h3>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="border-b border-cyber-card-border text-cyber-text-secondary uppercase">
                        <th className="pb-3 pr-4">Course Stream</th>
                        <th className="pb-3 px-4">Type</th>
                        <th className="pb-3 px-4 text-center">Duration</th>
                        <th className="pb-3 pl-4 text-right">Yearly Tuition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {college.courses.map((course, idx) => (
                        <tr key={idx} className="border-b border-cyber-card-border last:border-b-0 hover:bg-white/[0.01]">
                          <td className="py-3 pr-4 font-semibold text-cyber-fg">{course.name}</td>
                          <td className="py-3 px-4 text-cyber-text-secondary">{course.type.toUpperCase()}</td>
                          <td className="py-3 px-4 text-center text-cyber-text-secondary">{course.duration}</td>
                          <td className="py-3 pl-4 text-right font-bold text-neon-cyan">${course.fees.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </section>

            {/* Placements Section */}
            <section id="placements" className="scroll-mt-32">
              <Card>
                <h3 className="font-mono text-sm font-bold text-neon-cyan uppercase tracking-widest border-b border-cyber-card-border pb-2 mb-6">
                  Placement Statistics
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border border-cyber-card-border rounded bg-cyber-card-bg flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-neon-cyan" />
                    <div>
                      <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-widest block">Average Package</span>
                      <span className="font-mono text-sm font-bold text-cyber-fg">{college.placementDetails.averagePackage}</span>
                    </div>
                  </div>

                  <div className="p-4 border border-cyber-card-border rounded bg-cyber-card-bg flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-neon-purple" />
                    <div>
                      <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-widest block">Highest Package</span>
                      <span className="font-mono text-sm font-bold text-cyber-fg">{college.placementDetails.highestPackage}</span>
                    </div>
                  </div>

                  <div className="p-4 border border-cyber-card-border rounded bg-cyber-card-bg flex items-center gap-3">
                    <Percent className="w-5 h-5 text-accent-green" />
                    <div>
                      <span className="font-mono text-[9px] text-cyber-text-muted uppercase tracking-widest block">Placement Rate</span>
                      <span className="font-mono text-sm font-bold text-cyber-fg">{college.placementDetails.placementPercentage}%</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-cyber-text-secondary uppercase tracking-widest block font-bold">
                    Top Recruiters:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {college.placementDetails.topRecruiters.map((rec, idx) => (
                      <span
                        key={idx}
                        className="font-mono text-xs px-3 py-1.5 rounded border border-cyber-card-border bg-cyber-card-bg text-cyber-fg"
                      >
                        {rec}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </section>

            {/* Fee structure Section */}
            <section id="fees" className="scroll-mt-32">
              <Card>
                <h3 className="font-mono text-sm font-bold text-neon-cyan uppercase tracking-widest border-b border-cyber-card-border pb-2 mb-4">
                  Tuition & Fees Breakdown
                </h3>
                <div className="flex flex-col gap-3 font-mono text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-cyber-card-border">
                    <span className="text-cyber-text-secondary">Average Tuition</span>
                    <span className="text-cyber-fg font-bold">${college.fees.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cyber-card-border">
                    <span className="text-cyber-text-secondary">Laboratory & Equipment Fee</span>
                    <span className="text-cyber-fg font-bold">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cyber-card-border">
                    <span className="text-cyber-text-secondary">Infrastructure & Student Services</span>
                    <span className="text-cyber-fg font-bold">$850</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-neon-cyan font-bold text-sm">
                    <span>Estimated Annual Cost</span>
                    <span>${(college.fees + 2050).toLocaleString()}</span>
                  </div>
                </div>
              </Card>
            </section>

            {/* Reviews Section */}
            <section id="reviews" className="scroll-mt-32">
              <Card className="flex flex-col gap-6">
                <h3 className="font-mono text-sm font-bold text-neon-cyan uppercase tracking-widest border-b border-cyber-card-border pb-2">
                  Student Reviews
                </h3>

                {/* Reviews List */}
                <div className="flex flex-col gap-4">
                  {allReviews.map((rev) => (
                    <div key={rev.id} className="p-4 border border-cyber-card-border rounded bg-cyber-card-bg flex flex-col gap-2">
                      <div className="flex justify-between items-center flex-wrap gap-2">
                        <span className="font-mono text-xs font-bold text-neon-cyan">
                          Reviewer: {rev.userName}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <RatingBadge rating={rev.rating} showText={false} />
                          <span className="font-mono text-[9px] text-cyber-text-muted">{rev.date}</span>
                        </div>
                      </div>
                      <p className="text-cyber-text-secondary text-xs font-light">
                        &quot;{rev.comment}&quot;
                      </p>
                    </div>
                  ))}
                </div>

                {/* Review Form */}
                <form onSubmit={handleAddReview} className="border-t border-cyber-card-border pt-6 flex flex-col gap-4">
                  <h4 className="font-mono text-xs font-bold text-cyber-fg uppercase tracking-widest flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-neon-purple" /> Add a Review
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-widest">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        placeholder="e.g. Alex Carter"
                        className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2 text-xs font-mono text-cyber-fg focus:outline-none focus:border-neon-purple"
                        required
                      />
                    </div>
                    
                    <div className="flex flex-col gap-1.5">
                      <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-widest">
                        Rating
                      </label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(parseInt(e.target.value))}
                        className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2 text-xs font-mono text-cyber-fg focus:outline-none focus:border-neon-purple cursor-pointer"
                      >
                        <option value={5}>5.0 - Excellent</option>
                        <option value={4}>4.0 - Good</option>
                        <option value={3}>3.0 - Average</option>
                        <option value={2}>2.0 - Below Average</option>
                        <option value={1}>1.0 - Poor</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[10px] text-cyber-text-muted uppercase tracking-widest">
                      Review Comment
                    </label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Share your thoughts about this university..."
                      rows={3}
                      className="bg-cyber-bg border border-cyber-card-border rounded px-3 py-2 text-xs font-mono text-cyber-fg focus:outline-none focus:border-neon-purple resize-none"
                      required
                    />
                  </div>

                  <Button variant="purple" size="sm" type="submit" className="self-start">
                    Submit Review
                  </Button>
                </form>
              </Card>
            </section>

          </div>

          {/* Right Panel (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Facilities Section */}
            <section id="facilities" className="w-full scroll-mt-32">
              <Card>
                <h3 className="font-mono text-sm font-bold text-neon-cyan uppercase tracking-widest border-b border-cyber-card-border pb-2 mb-4">
                  Campus Facilities
                </h3>
                <div className="flex flex-col gap-2">
                  {college.facilities.map((fac, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 border border-cyber-card-border rounded bg-cyber-card-bg font-mono text-xs text-cyber-fg"
                    >
                      <Cpu className="w-3.5 h-3.5 text-neon-cyan" />
                      <span>{fac}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* Quick Specs */}
            <Card>
              <h3 className="font-mono text-xs font-bold text-cyber-fg uppercase tracking-widest border-b border-cyber-card-border pb-2 mb-4">
                Quick Information
              </h3>
              <div className="flex flex-col gap-2 text-[10px] font-mono text-cyber-text-secondary">
                <div className="flex justify-between py-1 border-b border-cyber-card-border">
                  <span>ESTABLISHED</span>
                  <span>{college.establishedYear}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cyber-card-border">
                  <span>LOCATION TYPE</span>
                  <span>Urban campus</span>
                </div>
                <div className="flex justify-between py-1 border-b border-cyber-card-border">
                  <span>AFFILIATION</span>
                  <span>Central Research Grid</span>
                </div>
              </div>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
