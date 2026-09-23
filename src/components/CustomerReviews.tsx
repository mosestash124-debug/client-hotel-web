import { useState, useMemo } from 'react';
import { Star, MessageSquarePlus, ThumbsUp, Check, X, ShieldCheck } from 'lucide-react';
import { INITIAL_REVIEWS, ReviewItem, RESTAURANT_INFO } from '../data/restaurantData';

export function CustomerReviews() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  // Form state for writing a review
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newTag, setNewTag] = useState('food');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Mention keywords from Google Maps
  const mentionFilters = [
    { tag: 'all', label: 'All Reviews', count: RESTAURANT_INFO.reviewCount },
    { tag: 'samosas', label: 'samosas', count: 12 },
    { tag: 'chapatis', label: 'chapatis', count: 2 },
    { tag: 'pork', label: 'pork & plantains', count: 4 },
    { tag: 'open kitchen', label: 'open kitchen', count: 8 },
    { tag: 'polite staff', label: 'polite staff', count: 3 },
    { tag: 'location', label: 'location', count: 2 },
    { tag: 'food', label: 'food', count: 7 }
  ];

  const filteredReviews = useMemo(() => {
    if (selectedTag === 'all') return reviews;
    return reviews.filter((r) => r.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase())));
  }, [reviews, selectedTag]);

  const handleToggleLike = (id: string) => {
    setLikedReviews((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newText.trim()) return;

    const newReviewItem: ReviewItem = {
      id: `rev-${Date.now()}`,
      author: newAuthor.trim(),
      role: 'Verified Local Diner',
      reviewCount: 1,
      rating: newRating,
      date: 'Just now',
      text: newText.trim(),
      tags: [newTag, 'food'],
      helpfulCount: 0
    };

    setReviews([newReviewItem, ...reviews]);
    setSubmittedSuccess(true);
    setTimeout(() => {
      setSubmittedSuccess(false);
      setShowAddModal(false);
      setNewAuthor('');
      setNewText('');
      setNewRating(5);
    }, 1200);
  };

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-12">
          <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold">
            Google Maps & Community Voice
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            What Murang'a Diners Say About Deekei
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            Real experiences from Google Local Guides and town regulars. From our transparent open kitchen to our famous chapatis, pork, and crispy samosas.
          </p>
        </div>

        {/* Rating Breakdown & Stats Box */}
        <div className="bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-8 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Scorecard */}
            <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-stone-200 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-5xl font-serif font-bold text-stone-900 font-mono tabular-nums">
                  {RESTAURANT_INFO.rating.toFixed(1)}
                </span>
                <span className="text-stone-400 text-lg">/ 5.0</span>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < 4 ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                    }`}
                  />
                ))}
              </div>

              <div className="text-xs text-stone-500">
                Based on <strong className="text-stone-900 font-mono">{RESTAURANT_INFO.reviewCount}</strong> Google reviews
              </div>

              <button
                type="button"
                onClick={() => setShowAddModal(true)}
                className="mt-3 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer"
              >
                <MessageSquarePlus className="w-3.5 h-3.5" />
                <span>Write a Review</span>
              </button>
            </div>

            {/* Middle Rating Bars */}
            <div className="md:col-span-5 space-y-2 text-xs font-mono">
              {[
                { stars: 5, pct: 68, count: 76 },
                { stars: 4, pct: 20, count: 23 },
                { stars: 3, pct: 7, count: 8 },
                { stars: 2, pct: 3, count: 3 },
                { stars: 1, pct: 2, count: 2 }
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="w-7 text-stone-600">{item.stars}★</span>
                  <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-600 rounded-full"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-stone-400 text-[11px]">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>

            {/* Right Local Guide Trust Notice */}
            <div className="md:col-span-3 bg-white p-4 rounded-xl border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-stone-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>Verified Local Feedback</span>
              </div>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Reported by 11+ local contributors: Meals typically cost <strong>Ksh 1–500</strong> per person with dine-in and takeaway options.
              </p>
            </div>

          </div>
        </div>

        {/* Mention Keyword Filter Bar (Interactive buttons per design rules) */}
        <div className="mb-8">
          <div className="text-xs text-stone-500 mb-2">Filter reviews by common mentions:</div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {mentionFilters.map((mf) => {
              const isActive = selectedTag === mf.tag;
              return (
                <button
                  key={mf.tag}
                  type="button"
                  onClick={() => setSelectedTag(mf.tag)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span className="capitalize">{mf.label}</span>
                  <span className="ml-1.5 opacity-70 font-mono text-[11px]">
                    ({mf.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reviews Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const isLiked = likedReviews[rev.id];
            const currentLikes = (rev.helpfulCount || 0) + (isLiked ? 1 : 0);

            return (
              <article
                key={rev.id}
                className="bg-[#FAF8F5] border border-stone-200/90 rounded-2xl p-6 flex flex-col justify-between hover:border-stone-300 transition-colors"
              >
                <div className="space-y-3">
                  
                  {/* Author Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-stone-900">
                        {rev.author}
                      </h4>
                      {/* Quiet metadata line without static pill boxes */}
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        <span>{rev.role}</span>
                        {rev.reviewCount > 0 && (
                          <>
                            <span aria-hidden="true"> · </span>
                            <span>{rev.reviewCount} reviews</span>
                          </>
                        )}
                        {rev.photoCount && (
                          <>
                            <span aria-hidden="true"> · </span>
                            <span>{rev.photoCount} photos</span>
                          </>
                        )}
                      </div>
                    </div>

                    <span className="text-[11px] text-stone-400 font-mono">
                      {rev.date}
                    </span>
                  </div>

                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < rev.rating
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-stone-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Quote Body */}
                  <p className="text-xs text-stone-700 leading-relaxed italic">
                    "{rev.text}"
                  </p>

                  {/* Mentioned topics text (clean typographic separator, NO PILLS) */}
                  <div className="text-[11px] text-amber-900/70 font-medium">
                    Mentions: {rev.tags.join(' · ')}
                  </div>

                </div>

                {/* Helpful Like Button */}
                <div className="pt-4 border-t border-stone-200/60 mt-4 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">Verified Google Review</span>
                  <button
                    type="button"
                    onClick={() => handleToggleLike(rev.id)}
                    className={`flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                      isLiked
                        ? 'bg-amber-100 text-amber-900 font-semibold'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                    }`}
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${isLiked ? 'fill-amber-800 text-amber-800' : ''}`} />
                    <span>Helpful {currentLikes > 0 && `(${currentLikes})`}</span>
                  </button>
                </div>

              </article>
            );
          })}
        </div>

        {/* Modal: Write a Review */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-stone-200 max-w-lg w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h3 className="text-base font-serif font-bold text-stone-900">
                    Write a Review for Deekei Restaurant
                  </h3>
                  <p className="text-xs text-stone-500">
                    Share your experience with fellow Murang'a residents and travelers.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {submittedSuccess ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-stone-900">Thank you for your review!</h4>
                  <p className="text-xs text-stone-500">Your feedback has been added to Deekei's live reviews.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4">
                  
                  {/* Rating Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Overall Rating:
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform cursor-pointer"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-mono font-semibold text-stone-700 ml-2">
                        {newRating}.0 / 5.0 Stars
                      </span>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Your Name:
                    </label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Wambui Njeri"
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  {/* Mention Category */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      What did you enjoy most?
                    </label>
                    <select
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                    >
                      <option value="samosas">Crispy Samosas</option>
                      <option value="chapatis">Fresh Chapatis & Beef</option>
                      <option value="pork">Pork Delicacies & Plantains</option>
                      <option value="open kitchen">Transparent Open Kitchen</option>
                      <option value="polite staff">Friendly & Helpful Staff</option>
                      <option value="location">Convenient Meeting Location</option>
                    </select>
                  </div>

                  {/* Review Text */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-700 block">
                      Your Review & Highlights:
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={newText}
                      onChange={(e) => setNewText(e.target.value)}
                      placeholder="Tell us about the meal, the ambience, and the service..."
                      className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg shadow-xs"
                    >
                      Post Review
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
