import { useState } from 'react';
import { X, Copy, Check, Sparkles, Terminal, FileText, Image as ImageIcon, Wand2 } from 'lucide-react';
import { DEEKEI_MASTER_PROMPT, RESTAURANT_INFO } from '../data/restaurantData';

interface MasterPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MasterPromptModal({ isOpen, onClose }: MasterPromptModalProps) {
  const [activeTab, setActiveTab] = useState<'system' | 'social' | 'image' | 'generator'>('system');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Custom prompt generator state
  const [selectedGoal, setSelectedGoal] = useState<'weekend-pork' | 'samosa-challenge' | 'meeting-oasis' | 'customer-reply'>('weekend-pork');
  const [targetAudience, setTargetAudience] = useState<'muranga-professionals' | 'travelers' | 'families'>('muranga-professionals');

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const generateCustomPrompt = () => {
    let focus = "";
    if (selectedGoal === 'weekend-pork') {
      focus = "Promote our signature Pork Delicacy served with sweet caramelized plantains (matoke) and sautéed greens under Ksh 400. Highlight that it is our visitors' top-rated dish.";
    } else if (selectedGoal === 'samosa-challenge') {
      focus = "Highlight our crispy beef samosas (pair for Ksh 100) celebrated in 12+ Google reviews as the crunchiest in Murang'a Town, fried fresh in our transparent open kitchen.";
    } else if (selectedGoal === 'meeting-oasis') {
      focus = "Position Deekei Restaurant as the premier unhurried meeting place in Murang'a Town with quiet corners, hot masala chai, and fresh meals made to order.";
    } else {
      focus = "Draft polite, grateful, and authentic responses to customer reviews acknowledging our transparent open kitchen and addressing service pacing with Kenyan hospitality warmth.";
    }

    const audienceText =
      targetAudience === 'muranga-professionals'
        ? "Murang'a Town bankers, county government workers, and entrepreneurs looking for quality lunch and meeting spots"
        : targetAudience === 'travelers'
        ? "Travelers along the Nairobi-Nyeri-Murang'a corridor looking for genuine local dining"
        : "Families and friends gathering for weekend lunches and celebrations";

    return `Act as the Head of Hospitality & Content for Deekei Restaurant (Murang'a Town, Kenya).

TASK:
${focus}

TARGET AUDIENCE:
${audienceText}

VOICE & TONE:
- Authentic Kenyan hospitality warmth, blending English with natural Kenyan colloquial touches ("Karibu", "Chapo stew", "Fresh off the tava").
- Proud of our transparent open kitchen where diners watch every chapati rolled and stew simmered.
- Transparent and honest pricing (Ksh 1–500 per person).
- Include contact: WhatsApp/Call 0700 173251 · Location: Murang'a 4 Deekei (Plus Code: 75H5+9W Murang'a).

Deliverable: Provide 3 distinct copy variations (1 short WhatsApp broadcast, 1 engaging Instagram/Facebook caption, and 1 TikTok/Reels video script with visual direction).`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-stone-200 max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-stone-200 flex items-start justify-between bg-[#FAF8F5]">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="text-xs uppercase tracking-wider font-semibold text-amber-900">
                Created for Deekei Restaurant
              </span>
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900">
              Master AI & Marketing Brand Prompts
            </h2>
            <p className="text-xs text-stone-600">
              Copy-paste ready prompts for generating marketing copy, AI customer service, and food imagery.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-700 p-1.5 rounded-lg hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs (Functional button controls per design rules) */}
        <div className="px-6 pt-3 border-b border-stone-200 flex items-center gap-2 overflow-x-auto scrollbar-none bg-stone-50/70">
          <button
            type="button"
            onClick={() => setActiveTab('system')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'system'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>1. Core Brand System Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'social'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>2. Social Media Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'image'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>3. Image Generation Prompt</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('generator')}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border-b-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'generator'
                ? 'border-amber-800 text-amber-900'
                : 'border-transparent text-stone-600 hover:text-stone-900'
            }`}
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>4. Custom Campaign Generator</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {activeTab === 'system' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Master Brand Identity Prompt (for ChatGPT, Gemini, or Claude)
                  </h4>
                  <p className="text-xs text-stone-500">
                    Paste this into any LLM to turn it into an expert copywriter and representative for Deekei Restaurant.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(DEEKEI_MASTER_PROMPT.systemPrompt, 'system')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey === 'system' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-amber-800 selection:text-white border border-stone-800">
                {DEEKEI_MASTER_PROMPT.systemPrompt}
              </pre>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Social Media & Marketing Campaign Prompt
                  </h4>
                  <p className="text-xs text-stone-500">
                    Generates high-engagement TikTok concepts, Instagram Reels, and WhatsApp status broadcasts.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(DEEKEI_MASTER_PROMPT.socialMediaPrompt, 'social')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey === 'social' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-amber-800 selection:text-white border border-stone-800">
                {DEEKEI_MASTER_PROMPT.socialMediaPrompt}
              </pre>
            </div>
          )}

          {activeTab === 'image' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-stone-900">
                    Culinary & Open Kitchen Image Generation Prompt
                  </h4>
                  <p className="text-xs text-stone-500">
                    Optimized for Midjourney, Imagen, DALL-E, or Gemini image tools to visualize Kenyan food.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(DEEKEI_MASTER_PROMPT.imagePrompt, 'image')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  {copiedKey === 'image' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto selection:bg-amber-800 selection:text-white border border-stone-800">
                {DEEKEI_MASTER_PROMPT.imagePrompt}
              </pre>
            </div>
          )}

          {activeTab === 'generator' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-sm font-bold text-stone-900">
                  Interactive Deekei Prompt Builder
                </h4>
                <p className="text-xs text-stone-500">
                  Select your marketing goal and audience to assemble a custom tailored prompt.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Goal Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Campaign Focus:
                  </label>
                  <select
                    value={selectedGoal}
                    onChange={(e) => setSelectedGoal(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  >
                    <option value="weekend-pork">Pork with Sweet Plantains (Signature Special)</option>
                    <option value="samosa-challenge">Murang'a's Crispiest Samosas (12+ Reviews)</option>
                    <option value="meeting-oasis">Unhurried Town Meeting Sanctuary</option>
                    <option value="customer-reply">Responding to Google Reviews</option>
                  </select>
                </div>

                {/* Audience Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-700 block">
                    Target Demographic:
                  </label>
                  <select
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:ring-1 focus:ring-amber-700"
                  >
                    <option value="muranga-professionals">Murang'a Town Business & Working Professionals</option>
                    <option value="travelers">Highway & Mt. Kenya Travelers</option>
                    <option value="families">Local Families & Weekend Diners</option>
                  </select>
                </div>

              </div>

              {/* Generated Result */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-stone-700">Generated Custom Prompt:</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(generateCustomPrompt(), 'custom')}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-amber-800 hover:bg-amber-900 rounded-lg transition-colors cursor-pointer"
                  >
                    {copiedKey === 'custom' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Custom Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto border border-stone-800">
                  {generateCustomPrompt()}
                </pre>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 px-6 border-t border-stone-200 bg-stone-50 flex items-center justify-between text-xs text-stone-500">
          <span>Deekei Restaurant · Murang'a Town, Kenya</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 font-semibold text-stone-700 hover:bg-stone-200/60 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
