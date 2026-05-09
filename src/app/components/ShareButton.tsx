import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Share2, X, Link as LinkIcon, ArrowRight, Check } from "lucide-react";

interface ShareButtonProps {
  title: string;
  excerpt: string;
  url: string;
  image: string;
}

type Platform = "facebook" | "linkedin" | "whatsapp" | "copy" | null;

// Custom SVG Icons for social platforms
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export function ShareButton({ title, excerpt, url, image }: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>(null);
  const [comment, setComment] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const fullUrl = typeof window !== "undefined" ? window.location.origin + url : url;
  
  // Ensure image URL is absolute
  const fullImageUrl = image.startsWith('http') 
    ? image 
    : typeof window !== "undefined" 
      ? window.location.origin + image 
      : image;

  console.log("ShareButton rendered with:", { title, excerpt, url: fullUrl, image: fullImageUrl });

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    
    // Handle copy link immediately
    if (platform === "copy") {
      navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleNext = () => {
    if (selectedPlatform && selectedPlatform !== "copy") {
      setStep(2);
    }
  };

  const handlePost = () => {
    setIsPosting(true);
    
    // Simulate posting delay
    setTimeout(() => {
      const shareText = comment 
        ? `${comment}\n\n${title}\n${fullUrl}` 
        : `${title}\n${fullUrl}`;

      // Open share URL based on platform
      let shareUrl = "";
      
      switch (selectedPlatform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}&quote=${encodeURIComponent(comment || title)}`;
          break;
        case "linkedin":
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
          break;
        case "whatsapp":
          shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "width=600,height=400");
      }

      // Reset and close
      setTimeout(() => {
        setIsPosting(false);
        handleClose();
      }, 500);
    }, 800);
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStep(1);
      setSelectedPlatform(null);
      setComment("");
      setCopied(false);
    }, 300);
  };

  const platforms = [
    {
      id: "facebook" as Platform,
      name: "Facebook",
      icon: FacebookIcon,
      color: "bg-[#1877F2] hover:bg-[#1877F2]/90",
      textColor: "text-white"
    },
    {
      id: "linkedin" as Platform,
      name: "LinkedIn",
      icon: LinkedInIcon,
      color: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
      textColor: "text-white"
    },
    {
      id: "whatsapp" as Platform,
      name: "WhatsApp",
      icon: WhatsAppIcon,
      color: "bg-[#25D366] hover:bg-[#25D366]/90",
      textColor: "text-white"
    },
    {
      id: "copy" as Platform,
      name: "Copy Link",
      icon: LinkIcon,
      color: "bg-muted hover:bg-muted/80",
      textColor: "text-foreground"
    }
  ];

  return (
    <>
      {/* Share Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
      >
        <Share2 className="w-5 h-5" />
        <span>Share Article</span>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-background border border-border rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <div>
                    <h2 className="text-xl font-medium">
                      {step === 1 ? "Share Article" : "Add Your Comment"}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {step === 1 ? "Choose where you'd like to share" : "Preview and personalize your share"}
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6">
                  {step === 1 ? (
                    /* Step 1: Platform Selection */
                    <div className="space-y-3">
                      {platforms.map((platform) => {
                        const Icon = platform.icon;
                        const isSelected = selectedPlatform === platform.id;
                        const isCopied = platform.id === "copy" && copied;

                        return (
                          <motion.button
                            key={platform.id}
                            onClick={() => handlePlatformSelect(platform.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
                              isSelected
                                ? "ring-2 ring-primary bg-primary/5"
                                : "border border-border hover:border-primary/50"
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <div className={`p-3 rounded-lg ${platform.color}`}>
                                <Icon className={`w-5 h-5 ${platform.textColor}`} />
                              </div>
                              <span className="font-medium">{platform.name}</span>
                            </div>
                            {isCopied ? (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="flex items-center gap-2 text-green-600"
                              >
                                <Check className="w-5 h-5" />
                                <span className="text-sm font-medium">Copied!</span>
                              </motion.div>
                            ) : isSelected ? (
                              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                                <Check className="w-3 h-3 text-white" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 rounded-full border-2 border-border" />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ) : (
                    /* Step 2: Comment and Preview */
                    <div className="space-y-6">
                      {/* Comment Input */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Add your comment (optional)
                        </label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Share your thoughts about this article..."
                          rows={4}
                          className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          This comment will be included with your share
                        </p>
                      </div>

                      {/* Preview Card */}
                      <div>
                        <label className="block text-sm font-medium mb-3">
                          Share Preview
                        </label>
                        <div className="border border-border rounded-lg overflow-hidden">
                          {/* Platform Badge */}
                          <div className="px-4 py-2 bg-muted/50 border-b border-border flex items-center gap-2">
                            {selectedPlatform === "facebook" && <FacebookIcon className="w-4 h-4 text-[#1877F2]" />}
                            {selectedPlatform === "linkedin" && <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" />}
                            {selectedPlatform === "whatsapp" && <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />}
                            <span className="text-sm text-muted-foreground">
                              Sharing to {platforms.find(p => p.id === selectedPlatform)?.name}
                            </span>
                          </div>

                          {/* Comment Preview */}
                          {comment && (
                            <div className="px-4 py-3 border-b border-border bg-muted/20">
                              <p className="text-sm whitespace-pre-wrap">{comment}</p>
                            </div>
                          )}

                          {/* Article Preview */}
                          <div className="p-4">
                            <div className="flex gap-4">
                              {/* Thumbnail */}
                              <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-muted">
                                <img
                                  src={fullImageUrl}
                                  alt={title}
                                  className="w-full h-full object-cover"
                                />
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium mb-1 line-clamp-2">
                                  {title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                  {excerpt}
                                </p>
                                <p className="text-xs text-muted-foreground truncate">
                                  {fullUrl}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
                  {step === 1 ? (
                    <>
                      <p className="text-sm text-muted-foreground">
                        {selectedPlatform && selectedPlatform !== "copy"
                          ? "Click Next to continue"
                          : "Select a platform to share"}
                      </p>
                      <button
                        onClick={handleNext}
                        disabled={!selectedPlatform || selectedPlatform === "copy"}
                        className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>Next</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setStep(1);
                          setComment("");
                        }}
                        className="px-6 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePost}
                        disabled={isPosting}
                        className="flex items-center gap-2 px-6 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors disabled:opacity-50"
                      >
                        {isPosting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-4 h-4 border-2 border-background border-t-transparent rounded-full"
                            />
                            <span>Posting...</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-4 h-4" />
                            <span>Post</span>
                          </>
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}