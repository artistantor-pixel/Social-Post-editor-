"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Download, LayoutTemplate, Type, Image as ImageIcon, Share2, Upload, Sparkles, Loader2, Wand2, Type as TypeIcon, AlignLeft, AlignCenter, AlignRight, Palette, Quote, Star } from "lucide-react";
import Image from "next/image";
import { toPng } from 'html-to-image';
import Link from "next/link";
import { Video } from "lucide-react";

export default function VideoPosterGenerator() {
  const [headline, setHeadline] = useState("অবিশ্বাস্য জয়! ফাইনালে শেষ মুহূর্তের গোলে চ্যাম্পিয়ন ঢাকা আবাহনী");
  const [category, setCategory] = useState("খেলাধুলা");
  const [bgVideoUrl, setBgVideoUrl] = useState(""); // URL for uploaded video
  const [bgPosition, setBgPosition] = useState("center");
  const [aspectRatio, setAspectRatio] = useState("16:9"); 
  const [template, setTemplate] = useState("breaking"); 

  // Image Handling States
  const [imageMethod, setImageMethod] = useState("upload"); 
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGeneratingImg, setIsGeneratingImg] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // New Advanced Styling & Customization States
  const [headlineSize, setHeadlineSize] = useState("large"); 
  const [overlayOpacity, setOverlayOpacity] = useState(60); 
  const [isRewriting, setIsRewriting] = useState(false);
  const [postDate, setPostDate] = useState("২৮ সেপ্টেম্বর, ২০২৬");
  const [newsSource, setNewsSource] = useState("সূত্র: রয়টার্স");
  
  // Advertisement / Sponsor States
  const [sponsorLogo, setSponsorLogo] = useState("");
  const [sponsorText, setSponsorText] = useState("Sponsored by");
  const sponsorInputRef = useRef<HTMLInputElement>(null);
  
  const [bottomAdUrl, setBottomAdUrl] = useState("");
  const bottomAdInputRef = useRef<HTMLInputElement>(null);
  
  // Quote Template States
  const [quoteAuthor, setQuoteAuthor] = useState("প্রফেসর মুহাম্মদ ইউনূস");
  const [quoteDesignation, setQuoteDesignation] = useState("প্রধান উপদেষ্টা, অন্তর্বর্তীকালীন সরকার");
  const [quoteAuthorImg, setQuoteAuthorImg] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200");
  const authorImgInputRef = useRef<HTMLInputElement>(null);

  // Customization Toggles
  const [brandColor, setBrandColor] = useState("#cc0000"); // Red default
  const [textAlign, setTextAlign] = useState<"left" | "center" | "right">("left");
  const [fontFamily, setFontFamily] = useState("sans"); // "sans", "serif", "mono"
  const [logoPosition, setLogoPosition] = useState("top-left"); // "top-left", "top-right", "bottom-left", "bottom-right", "hidden"
  const [logoSize, setLogoSize] = useState(24); // Logo height in pixels
  const [showWatermark, setShowWatermark] = useState(true);
  const [watermarkText, setWatermarkText] = useState("www.khoborkey.com");

  const [isDownloading, setIsDownloading] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setBgVideoUrl(localUrl);
    }
  };

  const handleSponsorUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setSponsorLogo(localUrl);
    }
  };

  const handleBottomAdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setBottomAdUrl(localUrl);
    }
  };

  const handleAuthorImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setQuoteAuthorImg(localUrl);
    }
  };

  const generateAIImage = async () => {
    if (!headline) {
      alert("Please enter a headline first so AI knows what image to generate.");
      return;
    }
    setIsGeneratingImg(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
      
      // Step 1: Use Gemini to generate a highly detailed image prompt in English
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Based on this Bengali news headline: "${headline}", write a highly detailed, photorealistic image generation prompt in English. Return ONLY the English prompt text.` }] }]
        })
      });
      
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message || "API Error");
      }
      const englishPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "breaking news background";
      
      // Step 2: Use Pollinations AI (free, no-key) to generate the actual image from Gemini's prompt
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(englishPrompt)}?width=1200&height=1200&nologo=true&seed=${Math.floor(Math.random() * 1000)}`;
      
      setBgImageUrl(imageUrl);
    } catch (e) {
      console.error(e);
      alert("Failed to generate AI Image. Please try again.");
    } finally {
      setIsGeneratingImg(false);
    }
  };

  const rewriteHeadline = async () => {
    if (!headline) return;
    setIsRewriting(true);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "YOUR_GEMINI_API_KEY";
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: `Rewrite this news headline to be very engaging, viral, and catchy for social media. It MUST be in Bengali language. ONLY return the text of the new headline, without any quotes or extra text: "${headline}"` }]
          }]
        })
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error.message || "API Error");
      }
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        setHeadline(data.candidates[0].content.parts[0].text.trim().replace(/^["']|["']$/g, ''));
      } else {
        throw new Error("No response from AI");
      }
    } catch (e: any) {
      console.error(e);
      alert(`AI Error: ${e.message || "Failed. Try again."}`);
    } finally {
      setIsRewriting(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    const element = document.getElementById("poster-canvas");
    if (!element) {
      setIsDownloading(false);
      return;
    }

    try {
      const dataUrl = await toPng(element, { 
        quality: 1.0, 
        pixelRatio: 2, // higher resolution
      });
      
      const link = document.createElement('a');
      link.download = `khobor-key-poster-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Error generating image', err);
      alert('Failed to generate image. Try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Dynamic Styles
  const getHeadlineClasses = () => {
    let classes = "";
    
    // Size
    if (template === 'video_quote') classes += ' text-2xl md:text-3xl lg:text-4xl';
    else if (aspectRatio === '1:1' || aspectRatio === '9:16') {
      if (headlineSize === 'small') classes += ' text-3xl';
      else if (headlineSize === 'medium') classes += ' text-4xl';
      else classes += ' text-5xl';
    } else {
      if (headlineSize === 'small') classes += ' text-xl';
      else if (headlineSize === 'medium') classes += ' text-2xl';
      else classes += ' text-3xl';
    }

    // Font Family
    if (fontFamily === 'lishadhinata') classes += ' font-lishadhinata';
    else if (template === 'video_quote' || template === 'magazine' || fontFamily === 'serif') classes += ' font-serif';
    else if (fontFamily === 'mono') classes += ' font-mono';
    else classes += ' font-sans';

    // Alignment
    if (textAlign === 'center') classes += ' text-center';
    else if (textAlign === 'right') classes += ' text-right';
    else classes += ' text-left';

    return classes;
  };

  const getCanvasStyle = () => {
    if (template === 'video_quote') {
      return { backgroundColor: 'black' };
    }
    if (template === 'split') {
      return { backgroundColor: brandColor }; 
    }
    if (template === 'magazine') {
      return { backgroundColor: '#ffffff' };
    }
    if (template === 'cinematic') {
      return { backgroundColor: '#000000' };
    }
    return { backgroundColor: 'black' };
  };

  const getLogoPositionClass = () => {
    switch(logoPosition) {
      case 'top-left': return 'top-6 left-6';
      case 'top-right': return 'top-6 right-6';
      case 'bottom-left': return 'bottom-6 left-6';
      case 'bottom-right': return 'bottom-6 right-6';
      default: return 'hidden';
    }
  };

  const isLightBackground = ['minimal_white', 'magazine', 'polaroid', 'tweet', 'brutalism', 'elegant_serif', 'comic_book', 'watercolor'].includes(template);
  
  return (
    <div className="min-h-screen flex flex-col bg-[#eef2f6] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 relative p-0 sm:p-4 md:p-6 lg:p-8">
      {/* Dynamic Glassmorphism Background Blobs (Enhanced for Mobile) */}
      <div className="absolute top-[-10%] left-[-20%] md:left-[-10%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-indigo-400/50 md:bg-indigo-300/40 blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] md:right-[-10%] w-[80%] md:w-[50%] h-[50%] rounded-full bg-fuchsia-400/50 md:bg-purple-300/40 blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] left-[20%] md:left-[60%] w-[60%] md:w-[30%] h-[40%] md:h-[30%] rounded-full bg-blue-400/40 md:bg-blue-300/30 blur-[100px] md:blur-[120px] pointer-events-none" />
      
      {/* Boxed App Container */}
      <div className="max-w-[1600px] mx-auto w-full min-h-[100vh] md:min-h-[calc(100vh-4rem)] h-auto flex flex-col bg-white/40 md:bg-white/60 backdrop-blur-xl md:backdrop-blur-2xl sm:rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.04)] ring-1 ring-white/60 relative z-10">
      
      {/* Top Navbar */}
      <div className="sticky top-0 z-[70] pt-4 md:pt-6 px-4 md:px-8 w-full pb-4">
      <header className="h-[64px] md:h-[76px] bg-white/80 backdrop-blur-3xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full px-2 md:px-3 pr-2 md:pr-3 flex items-center justify-between w-full max-w-[1500px] mx-auto transition-all">
        <div className="flex items-center gap-3 md:gap-4 pl-3 md:pl-5">
          {/* Sleek Minimal Logo Mark */}
          <div className="relative h-9 w-9 md:h-11 md:w-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30 flex items-center justify-center transform transition-transform hover:rotate-12">
             <div className="absolute inset-[1px] bg-white rounded-full flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-full"></div>
               <LayoutTemplate className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 relative z-10" />
             </div>
          </div>
          
          {/* Typography Logo */}
          <div className="flex flex-col justify-center">
            <h1 className="font-extrabold text-[17px] md:text-[22px] tracking-tight text-slate-900 leading-none flex items-center gap-1">
              Khobor<span className="text-indigo-600">Key</span>
            </h1>
            <span className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-[0.25em] uppercase leading-none mt-1.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Pro Studio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex bg-slate-100 p-1 rounded-full items-center">
             <Link href="/" className="px-4 py-1.5 rounded-full text-xs font-bold text-slate-500 hover:text-slate-800 transition-all">Poster</Link>
             <Link href="/video" className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-indigo-600 shadow-sm transition-all flex items-center gap-1"><Video className="w-3 h-3" /> Video</Link>
          </div>

          <div className="flex items-center">
          {/* Ultra Premium Export Button */}
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading}
            className="relative overflow-hidden group bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white rounded-full px-5 md:px-8 h-10 md:h-[52px] text-[11px] md:text-[13px] font-extrabold tracking-[0.15em] transition-all shadow-[0_4px_20px_rgba(79,70,229,0.4)] hover:shadow-[0_8px_25px_rgba(79,70,229,0.5)] border-none hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin relative z-10 text-white" />
            ) : (
              <Download className="mr-2 h-4 w-4 md:h-5 md:w-5 relative z-10 text-white" />
            )}
            <span className="relative z-10">{isDownloading ? "EXPORTING..." : "EXPORT SNAPSHOT"}</span>
          </Button>
        </div>
        </div>
      </header>
    </div>

      {/* Main App Area */}
      <div className="flex-1 flex flex-col-reverse md:flex-row w-full h-full relative">
        
        {/* Left Sidebar - Settings */}
        <div className="w-full md:w-[380px] lg:w-[420px] shrink-0 bg-white/70 backdrop-blur-2xl border-t md:border-t-0 md:border-r border-white/80 h-auto block z-40 relative shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
           <div className="p-4 md:p-6 space-y-8 pb-12 md:pb-32">
              
              {/* SECTION: CONTENT */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-white/50 pb-3">
                    <Type className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Text Content</h2>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <div className="flex items-center justify-between">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                         <Type className="h-4 w-4" /> Headline Text
                       </label>
                       <Button variant="ghost" size="sm" className="h-6 text-xs text-primary px-2" onClick={rewriteHeadline} disabled={isRewriting}>
                         {isRewriting ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <Wand2 className="h-3 w-3 mr-1" />}
                         AI Rewrite
                       </Button>
                     </div>
                     <textarea 
                       value={headline}
                       onChange={(e) => setHeadline(e.target.value)}
                       rows={3}
                       className="w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
                     />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Category / Tag</label>
                       <input 
                         type="text" 
                         value={category}
                         onChange={(e) => setCategory(e.target.value)}
                         className="h-11 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Date</label>
                       <input 
                         type="text" 
                         value={postDate}
                         onChange={(e) => setPostDate(e.target.value)}
                         className="h-11 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
                         placeholder="e.g. 28 Sept, 2026"
                       />
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">News Source</label>
                     <input 
                       type="text" 
                       value={newsSource}
                       onChange={(e) => setNewsSource(e.target.value)}
                       className="h-11 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90"
                       placeholder="e.g. Source: Reuters (Leave empty to hide)"
                     />
                   </div>
                 </div>
              </section>

              {/* SECTION: MEDIA */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-white/50 pb-3">
                    <ImageIcon className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Media & Image</h2>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="space-y-3">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                       Background Image
                     </label>
                     <div className="flex bg-white/30 backdrop-blur-md p-1 border border-white/60 shadow-sm text-slate-700 rounded-xl">
                       <button onClick={() => setImageMethod('upload')} className={`flex-1 text-xs py-1.5 rounded-md font-medium ${imageMethod === 'upload' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>Upload</button>
                       <button onClick={() => setImageMethod('url')} className={`flex-1 text-xs py-1.5 rounded-md font-medium ${imageMethod === 'url' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}>URL</button>
                     </div>

                     <div className="pt-2">
                       {imageMethod === 'upload' && (
                         <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 hover:border-indigo-300 transition-colors" onClick={() => fileInputRef.current?.click()}>
                           <Upload className="h-6 w-6 text-slate-400 mb-2" />
                           <p className="text-xs font-semibold text-slate-600">Click to upload video</p>
                           <input type="file" ref={fileInputRef} className="hidden" accept="video/*" onChange={handleFileUpload} />
                         </div>
                       )}
                       {imageMethod === 'url' && (
                         <input type="text" value={bgVideoUrl} onChange={(e) => setBgVideoUrl(e.target.value)} className="h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm" placeholder="Paste video URL here..." />
                       )}
                       {imageMethod === 'ai' && (
                         <div className="space-y-2">
                           <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} rows={2} className="w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 py-2 text-sm" placeholder="Describe the image you want..." />
                           <Button onClick={generateAIImage} disabled={isGeneratingImg} className="w-full h-10 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700">
                             {isGeneratingImg ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</> : <><Sparkles className="mr-2 h-4 w-4" /> Generate AI Image</>}
                           
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {/* Image Position Settings */}
                      <div className="pt-3 border-t border-white/50 mt-3">
                        <label className="text-[10px] font-bold text-slate-500 uppercase mb-2 block">Image Position</label>
                        <select value={bgPosition} onChange={(e) => setBgPosition(e.target.value)} className="h-9 w-full rounded-lg border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30">
                          <option value="center">Center</option>
                          <option value="top">Top</option>
                          <option value="bottom">Bottom</option>
                          <option value="left">Left</option>
                          <option value="right">Right</option>
                          <option value="top center">Top Center</option>
                          <option value="bottom center">Bottom Center</option>
                        </select>
                      </div>

                   </div>
                 </div>
              </section>

              {/* SECTION: DESIGN */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-white/50 pb-3">
                    <Palette className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Design & Layout</h2>
                 </div>
                 
                 <div className="space-y-4">
                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Format / Size</label>
                     <div className="flex gap-4 flex-wrap">
                       <label className="flex items-center gap-2 text-sm cursor-pointer">
                         <input type="radio" checked={aspectRatio === "16:9"} onChange={() => setAspectRatio("16:9")} className="text-indigo-600 focus:ring-indigo-600" />
                         16:9
                       </label>
                       <label className="flex items-center gap-2 text-sm cursor-pointer">
                         <input type="radio" checked={aspectRatio === "1:1"} onChange={() => setAspectRatio("1:1")} className="text-indigo-600 focus:ring-indigo-600" />
                         1:1
                       </label>
                       <label className="flex items-center gap-2 text-sm cursor-pointer">
                         <input type="radio" checked={aspectRatio === "9:16"} onChange={() => setAspectRatio("9:16")} className="text-indigo-600 focus:ring-indigo-600" />
                         9:16
                       </label>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Design Template</label>
                     <select value={template} onChange={(e) => setTemplate(e.target.value)} className="flex h-11 w-full rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors shadow-sm px-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500">
                       <option value="breaking">1. Breaking News</option>
                       <option value="video_vlog">2. Vlog Lower Third (Reel Safe)</option>
                       <option value="video_top_banner">3. Top Banner (Reel Safe)</option>
                       <option value="video_centered_glow">4. Centered Glow (Reel Safe)</option>
                       <option value="video_quote">5. Floating Quote (Reel Safe)</option>
                       <option value="video_glass_sidebar">6. Glass Sidebar (Reel Safe)</option>
                     </select>
                   </div>

                   {/* Quote Specific Settings */}
                   {template === 'video_quote' && (
                     <div className="space-y-4 border border-white/70 bg-white/40 backdrop-blur-xl p-4 rounded-2xl shadow-sm">
                       <label className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Quote Details</label>
                       <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                           <label className="text-[10px] font-bold text-slate-500 uppercase">Author Name</label>
                           <input type="text" value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} className="h-9 w-full rounded-lg border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90" />
                         </div>
                         <div className="space-y-2">
                           <label className="text-[10px] font-bold text-slate-500 uppercase">Designation</label>
                           <input type="text" value={quoteDesignation} onChange={(e) => setQuoteDesignation(e.target.value)} className="h-9 w-full rounded-lg border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90" />
                         </div>
                       </div>
                       <div className="space-y-2">
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Author Photo (Square)</label>
                         <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="h-9 w-full text-xs" onClick={() => authorImgInputRef.current?.click()}>
                             <Upload className="h-3 w-3 mr-1" /> {quoteAuthorImg ? 'Change Photo' : 'Upload Photo'}
                           </Button>
                           <input type="file" ref={authorImgInputRef} className="hidden" accept="image/*" onChange={handleAuthorImgUpload} />
                         </div>
                       </div>
                     </div>
                   )}

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1"><Palette className="h-3 w-3"/> Brand Color</label>
                       <div className="flex items-center gap-2">
                         <input type="color" value={brandColor} onChange={(e) => setBrandColor(e.target.value)} className="h-10 w-12 rounded cursor-pointer border-none bg-transparent" />
                         <span className="text-xs text-slate-500 uppercase font-mono">{brandColor}</span>
                       </div>
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Darkness ({overlayOpacity}%)</label>
                       <input type="range" min="0" max="95" value={overlayOpacity} onChange={(e) => setOverlayOpacity(Number(e.target.value))} className="w-full mt-3 accent-indigo-600" />
                     </div>
                   </div>

                   <div className="grid grid-cols-3 gap-2">
                     <div className="space-y-2 col-span-1">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Size</label>
                       <select value={headlineSize} onChange={(e) => setHeadlineSize(e.target.value)} className="flex h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90">
                         <option value="small">Small</option>
                         <option value="medium">Medium</option>
                         <option value="large">Large</option>
                       </select>
                     </div>
                     <div className="space-y-2 col-span-1">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Font</label>
                       <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)} className="flex h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90">
                         <option value="lishadhinata">Bengali</option>
                         <option value="sans">Sans-Serif</option>
                         <option value="serif">Serif</option>
                         <option value="mono">Mono</option>
                       </select>
                     </div>
                     <div className="space-y-2 col-span-1">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Align</label>
                       <div className="flex bg-white/30 backdrop-blur-md border border-white/60 shadow-sm text-slate-700 rounded-xl p-1 h-10">
                         <button onClick={() => setTextAlign('left')} className={`flex-1 flex justify-center items-center rounded-md ${textAlign === 'left' ? 'bg-white text-slate-900 shadow-sm' : ''}`}><AlignLeft className="h-4 w-4" /></button>
                         <button onClick={() => setTextAlign('center')} className={`flex-1 flex justify-center items-center rounded-md ${textAlign === 'center' ? 'bg-white text-slate-900 shadow-sm' : ''}`}><AlignCenter className="h-4 w-4" /></button>
                         <button onClick={() => setTextAlign('right')} className={`flex-1 flex justify-center items-center rounded-md ${textAlign === 'right' ? 'bg-white text-slate-900 shadow-sm' : ''}`}><AlignRight className="h-4 w-4" /></button>
                       </div>
                     </div>
                   </div>
                 </div>
              </section>

              {/* SECTION: BRANDING & ADS */}
              <section className="space-y-5">
                 <div className="flex items-center gap-2 border-b border-white/50 pb-3">
                    <Star className="w-4 h-4 text-indigo-500" />
                    <h2 className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-900">Branding & Ads</h2>
                 </div>
                 
                 <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Logo Position</label>
                       <select value={logoPosition} onChange={(e) => setLogoPosition(e.target.value)} className="flex h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90">
                         <option value="top-left">Top Left</option>
                         <option value="top-right">Top Right</option>
                         <option value="bottom-left">Bottom Left</option>
                         <option value="bottom-right">Bottom Right</option>
                         <option value="hidden">Hidden</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1">Logo Size ({logoSize}px)</label>
                       <input type="range" min="16" max="64" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full h-10 accent-indigo-600" />
                     </div>
                   </div>
                   
                   <div className="space-y-3">
                     <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2 cursor-pointer">
                       <input type="checkbox" checked={showWatermark} onChange={(e) => setShowWatermark(e.target.checked)} className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 w-4 h-4" />
                       Show Watermark Text
                     </label>
                     {showWatermark && (
                       <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="h-10 w-full rounded-xl border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90" placeholder="e.g. www.khoborkey.com" />
                     )}
                   </div>

                   <div className="space-y-3 pt-4 border-t border-slate-100">
                     <label className="text-[10px] font-bold text-slate-500 uppercase">Sponsorships (Optional)</label>
                     
                     <div className="grid grid-cols-2 gap-4 bg-white/40 backdrop-blur-xl p-4 rounded-2xl border border-white/70 shadow-sm">
                       <div className="space-y-2">
                         <label className="text-xs font-medium text-slate-700">Sponsor Text</label>
                         <input type="text" value={sponsorText} onChange={(e) => setSponsorText(e.target.value)} className="h-9 w-full rounded-lg border border-white/60 bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-sm px-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white/90" placeholder="e.g. Sponsored by" />
                       </div>
                       <div className="space-y-2">
                         <label className="text-xs font-medium text-slate-700">Corner Sponsor Logo</label>
                         <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="h-9 w-full text-xs" onClick={() => sponsorInputRef.current?.click()}>
                             <Upload className="h-3 w-3 mr-1" /> {sponsorLogo ? 'Change' : 'Upload'}
                           </Button>
                           {sponsorLogo && (
                             <Button variant="ghost" size="sm" className="h-9 px-2 text-red-500" onClick={() => setSponsorLogo("")}>Clear</Button>
                           )}
                           <input type="file" ref={sponsorInputRef} className="hidden" accept="image/*" onChange={handleSponsorUpload} />
                         </div>
                       </div>
                     </div>

                     <div className="bg-white/40 backdrop-blur-xl p-4 rounded-2xl border border-white/70 shadow-sm">
                       <label className="text-xs font-medium text-slate-700 mb-2 block">Full-Width Bottom Banner Ad</label>
                       <div className="flex gap-2">
                         <Button variant="outline" size="sm" className="h-9 w-full text-xs" onClick={() => bottomAdInputRef.current?.click()}>
                           <Upload className="h-3 w-3 mr-1" /> {bottomAdUrl ? 'Change Banner' : 'Upload Long Banner Ad'}
                         </Button>
                         {bottomAdUrl && (
                           <Button variant="ghost" size="sm" className="h-9 px-3 text-red-500" onClick={() => setBottomAdUrl("")}>Clear Banner</Button>
                         )}
                         <input type="file" ref={bottomAdInputRef} className="hidden" accept="image/*" onChange={handleBottomAdUpload} />
                       </div>
                     </div>
                   </div>
                 </div>
              </section>

           </div>
        </div>
        
        {/* Right Area - Canvas Workspace */}
        <div className={`w-full md:flex-1 h-[35vh] min-h-[280px] sm:min-h-[360px] md:h-[calc(100vh-104px)] bg-white/80 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none border-b border-white/80 md:border-none relative flex flex-col overflow-hidden transform-gpu isolate sticky top-[96px] md:top-[104px] self-start z-[40] shadow-md md:shadow-none`}>
           {/* Beautiful subtle dot pattern background */}
           <div className="absolute inset-0 bg-dot-pattern opacity-[0.15]" />
           
           <div className="w-full flex-1 flex max-md:items-center max-md:justify-center p-2 sm:p-4 lg:p-8 z-10 overflow-clip md:overflow-auto custom-scrollbar relative h-full transform-gpu">
            
            {/* Generated Background Blur Glows */}
            {bgVideoUrl && (
              <video 
                src={bgVideoUrl}
                autoPlay loop muted playsInline
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] opacity-10 blur-3xl pointer-events-none transition-all duration-1000 object-cover"
              />
            )}
            
            {/* The Preview Glass Box is removed. Just the Poster now! */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center min-h-0 md:min-h-[400px]">
              
              {/* Responsive Scaling Wrapper */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform transition-transform origin-center flex items-center justify-center">
                <div className={`
                  ${aspectRatio === '9:16' ? 'scale-[0.45] sm:scale-[0.55] md:scale-[0.75] lg:scale-[0.85]' : aspectRatio === '1:1' ? 'scale-[0.50] sm:scale-[0.65] md:scale-[0.85] lg:scale-[0.95]' : 'scale-[0.50] sm:scale-[0.65] md:scale-[0.9] lg:scale-[1.0]'}
                  transition-all duration-300
                `}>
                  
                  {/* The Poster Canvas to be exported */}
                  <div 
                    id="poster-canvas" 
                    className={`relative overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] ring-1 ring-slate-900/5 transition-all duration-300 flex flex-col shrink-0
                      ${aspectRatio === '16:9' ? 'w-[640px] h-[360px]' : aspectRatio === '9:16' ? 'w-[360px] h-[640px]' : 'w-[500px] h-[500px]'}
                    `}
            style={{
              border: template === 'bordered' ? `16px solid ${brandColor}` : 'none',
              backgroundColor: template === 'split' ? brandColor : 'black'
            }}
          >
            {/* MAIN IMAGE & CONTENT AREA (Flex-1 allows it to shrink when banner ad is present) */}
            <div 
              className="flex-1 relative w-full flex flex-col justify-end overflow-hidden bg-black"
            >
              {/* VIDEO LAYER */}
              {template !== 'split' && bgVideoUrl && (
                <video 
                  src={bgVideoUrl}
                  autoPlay loop muted playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: bgPosition }}
                />
              )}

              {/* Overlays based on template */}
              {template === 'breaking' && (
                <div className="absolute inset-0 bg-gradient-to-t via-black/80 to-transparent" style={{ opacity: overlayOpacity / 100, backgroundImage: `linear-gradient(to top, ${brandColor}, black, transparent)` }} />
              )}
              {template === 'video_vlog' && (
                <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-black via-black/70 to-transparent" style={{ opacity: overlayOpacity / 100 }} />
              )}
              {template === 'video_top_banner' && (
                <div className="absolute top-0 left-0 w-full h-[30%] bg-gradient-to-b from-black via-black/80 to-transparent" style={{ opacity: overlayOpacity / 100 }} />
              )}
              {template === 'video_centered_glow' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] h-[50%] bg-black/60 blur-[100px] rounded-full" />
                </div>
              )}
              {template === 'video_quote' && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
              )}
              {template === 'video_glass_sidebar' && (
                <div className="absolute top-0 left-0 w-[45%] h-full bg-black/20 backdrop-blur-md border-r border-white/10" />
              )}
              
              {/* BRANDING LOGO (Hidden inside unique Quote template to handle custom positioning) */}
              {logoPosition !== 'hidden' && template !== 'quote' && (
                <div className={`absolute z-20 p-2 rounded-lg ${getLogoPositionClass()} ${template === 'glass' ? 'bg-black/30 backdrop-blur-md border border-white/20' : ''}`}>
                  <Image 
                    src="/logo.svg" 
                    alt="Khobor Key Logo" 
                    width={logoSize * 4} 
                    height={logoSize} 
                    style={{ height: `${logoSize}px`, width: 'auto' }}
                    className={`drop-shadow-md transition-all ${isLightBackground ? 'brightness-100' : 'brightness-0 invert'}`} 
                  />
                </div>
              )}

              {/* Advertisement / Sponsor */}
              {sponsorLogo && template !== 'quote' && (
                <div className={`absolute z-20 p-2 flex flex-col items-end gap-1 ${logoPosition === 'top-right' ? 'top-6 left-6 items-start' : 'top-6 right-6'} ${template === 'glass' ? 'bg-black/30 backdrop-blur-md border border-white/20 rounded-lg' : ''}`}>
                  {sponsorText && (
                    <span className={`text-[10px] uppercase font-bold tracking-wider drop-shadow-md ${template === 'minimal_white' ? 'text-gray-500' : 'text-gray-300'}`}>
                      {sponsorText}
                    </span>
                  )}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sponsorLogo} alt="Sponsor" className="h-8 w-auto object-contain drop-shadow-md max-w-[120px]" />
                </div>
              )}

            {/* --- VIDEO TEMPLATES LAYOUT --- */}
              <div className={`
                flex flex-col relative z-10 w-full h-full justify-end
                ${textAlign === 'center' ? 'items-center text-center' : textAlign === 'right' ? 'items-end text-right' : 'items-start text-left'}
                ${template === 'video_vlog' ? 'bg-black/40 backdrop-blur-md p-6 sm:p-8 m-4 mt-auto rounded-2xl border border-white/20' : ''}
                ${template === 'video_top_banner' ? 'bg-gradient-to-b from-black/80 to-transparent p-8 pt-10 mb-auto w-full' : ''}
                ${template === 'video_centered_glow' ? 'm-auto p-8' : ''}
                ${template === 'video_glass_sidebar' ? 'bg-transparent p-8 w-[45%] h-full justify-center' : ''}
                ${template === 'breaking' ? 'p-8 mt-auto' : ''}
                ${aspectRatio === '9:16' && template !== 'video_top_banner' && template !== 'video_centered_glow' && template !== 'video_glass_sidebar' && template !== 'video_quote' ? 'pb-32 pr-20' : ''}
                ${aspectRatio === '9:16' && (template === 'video_centered_glow' || template === 'video_quote') ? 'pr-20' : ''}
                ${template === 'video_quote' ? 'm-auto p-8 sm:p-12 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20' : ''}
              `}>

                {/* Top Row: Category */}
                <div className="w-full mb-4">
                  {category && (
                    <div className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm border border-white/20 text-white backdrop-blur-md`} style={{ backgroundColor: `${brandColor}99` }}>
                      {category}
                    </div>
                  )}
                </div>

                {/* Headline Text */}
                <h1 className={`font-bold leading-snug drop-shadow-lg ${getHeadlineClasses()} text-white`}>
                  {template === 'video_quote' ? `"${headline}"` : headline}
                </h1>
                
                {/* Date and Source */}
                {(postDate || newsSource) && (
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs md:text-sm font-medium drop-shadow-md text-gray-300">
                    {postDate && <span className="flex items-center gap-1 opacity-90">{postDate}</span>}
                    {postDate && newsSource && <span className="opacity-50">•</span>}
                    {newsSource && <span className="flex items-center gap-1 opacity-90 text-white bg-black/40 px-2 py-0.5 rounded-sm">{newsSource}</span>}
                  </div>
                )}
                
                {/* Quote Author */}
                {template === 'video_quote' && quoteAuthor && (
                  <div className="mt-6 flex items-center gap-3 w-full">
                    {quoteAuthorImg && (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 shrink-0" style={{ borderColor: brandColor }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={quoteAuthorImg} alt={quoteAuthor} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-col text-left">
                      <h3 className="text-sm font-black text-white uppercase">{quoteAuthor}</h3>
                      {quoteDesignation && <p className="text-[10px] text-gray-300 uppercase">{quoteDesignation}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div> {/* End Main Image & Content Area */}

            {/* Bottom Full Width Banner Advertisement */}
            {bottomAdUrl && (
              <div className="w-full z-30 bg-white border-t-4 h-16 md:h-[72px] shrink-0" style={{ borderColor: brandColor }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={bottomAdUrl} 
                  alt="Bottom Advertisement" 
                  className="w-full h-full object-cover" 
                />
              </div>
            )}
            
          </div>
            </div> {/* End Inner Scaler */}
          </div> {/* End Scaler Wrapper */}

          </div> {/* End Preview Glass Box */}
          
        </div>
            </div>
    </div>
      </div>
      {/* INFORMATIVE FOOTER */}
      <footer className="w-full mt-12 md:mt-24 pb-8 pt-12 md:pt-16 border-t border-white/40 bg-white/30 backdrop-blur-3xl px-4 md:px-8 relative z-10 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 shadow-md flex items-center justify-center">
                <LayoutTemplate className="h-4 w-4 text-white" />
              </div>
              <h1 className="font-extrabold text-xl tracking-tight text-slate-900 leading-none flex items-center gap-1">
                Khobor<span className="text-indigo-600">Key</span>
              </h1>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed max-w-[280px] font-medium">
              The ultimate professional social media poster and news graphics generator for journalists, creators, and media houses.
            </p>
          </div>

          {/* Quick Links */}
          <div className="hidden md:flex flex-col">
            <h3 className="font-bold text-slate-900 mb-5 tracking-wider text-xs uppercase flex items-center gap-2"><Sparkles className="w-3 h-3 text-indigo-500"/> Studio</h3>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">Create Poster</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">Template Gallery</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">My Projects</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors flex items-center gap-2">Pricing & Pro <span className="bg-indigo-100 text-indigo-600 text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-widest font-black">New</span></a></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="hidden md:flex flex-col">
            <h3 className="font-bold text-slate-900 mb-5 tracking-wider text-xs uppercase">Resources</h3>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Design Tutorials</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog & Updates</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="hidden md:flex flex-col">
            <h3 className="font-bold text-slate-900 mb-5 tracking-wider text-xs uppercase">Company</h3>
            <ul className="space-y-3.5 text-sm font-semibold text-slate-500">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-[1400px] mx-auto mt-8 md:mt-16 pt-6 md:pt-8 border-t border-slate-300/40 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-wide text-slate-400 text-center md:text-left">
          <p>© {new Date().getFullYear()} KhoborKey Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase">Twitter</a>
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase">Facebook</a>
            <a href="#" className="hover:text-indigo-600 transition-colors uppercase">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
}