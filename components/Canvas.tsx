"use client";

import { useCallback } from "react";
import { useEditor } from "@/hooks/useEditor";
import { Upload } from "lucide-react";
import { CanvasPreview } from "./CanvasPreview";
import { convertHeicToJpeg } from "@/lib/image-utils";
import { ConfirmDialog } from "./ConfirmDialog";
import { useState, useRef, useEffect } from "react"; // Add useRef, useCallback, useEffect
import { useAuth } from "@/hooks/useAuth";
import { AuthDialog } from "./AuthDialog";
import { cn, isSubscriptionActive } from "@/lib/utils";
import { useEditorPanel } from "@/contexts/EditorPanelContext";
import { useIsMobile } from "@/hooks/useIsMobile"; // Add this import
import { incrementGenerationCount } from "@/lib/supabase-utils";
import { useToast } from "@/hooks/use-toast";
import { ProPlanDialog } from "./ProPlanDialog";
import { supabase } from "@/lib/supabaseClient";

interface CanvasProps {
  shouldAutoUpload?: boolean;
  mode?:
  | "full"
  | "draw-only"
  | "text-only"
  | "shapes-only"
  | "remove-background-only"
  | "change-background-only"
  | "clone-image-only"
  | "overlay-only"; // Add overlay-only
}

export function Canvas({ shouldAutoUpload, mode = "full" }: CanvasProps) {
  const {
    image,
    isProcessing,
    isConverting,
    handleImageUpload,
    processingMessage,
    textSets,
    setProcessingMessage,
    setIsProcessing,
    setIsConverting,
  } = useEditor();
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [showConvertDialog, setShowConvertDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); // Add this ref
  const [hasTriedAutoUpload, setHasTriedAutoUpload] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const [showProPlanDialog, setShowProPlanDialog] = useState(false);
  const { user } = useAuth();
  const { isPanelOpen } = useEditorPanel();
  const isMobile = useIsMobile(); // Add this hook
  const { toast } = useToast();

  // Add state for subscription status
  const [expiresAt, setExpiresAt] = useState<string | null>(null);

  // Add effect to fetch subscription status
  useEffect(() => {
    async function fetchSubscriptionStatus() {
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("expires_at")
          .eq("id", user.id)
          .single();

        setExpiresAt(data?.expires_at || null);
      }
    }

    fetchSubscriptionStatus();
  }, [user]);

  // Add this function inside the Canvas component
  const preloadFonts = useCallback(async (fontFamily: string) => {
    try {
      await document.fonts.load(`400 16px "${fontFamily}"`);
      await document.fonts.load(`700 16px "${fontFamily}"`);
    } catch (error) {
      toast({ variant: "destructive", title: "Failed to preload font" });
    }
  }, []);

  const handleFileProcess = async (file: File) => {
    try {
      setIsProcessing(true);
      setProcessingMessage("Analyzing your image, please wait...");

      // Pass authentication status and userId to handleImageUpload
      await handleImageUpload(file, {
        isAuthenticated: !!user,
        userId: user?.id,
      });

      // Only increment count for authenticated users
      if (user) {
        await incrementGenerationCount(user);
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      // Always show toast on error
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      });

      console.error("Error in handleFileProcess:", error);
    } finally {
      setIsProcessing(false);
      setProcessingMessage(""); // Clear any processing message
    }
  };

  const handleConvertConfirm = async () => {
    if (!pendingFile) return;

    try {
      setShowConvertDialog(false);
      setIsConverting(true); // Set converting state first
      setProcessingMessage("Converting image format...");

      const convertedFile = await convertHeicToJpeg(pendingFile);
      await handleFileProcess(convertedFile);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error processing image. Please try again.",
      });
    } finally {
      setPendingFile(null);
      setIsConverting(false); // Reset converting state
    }
  };

  const handleConvertCancel = () => {
    setShowConvertDialog(false);
    setPendingFile(null);
    // Reset the file input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      e.target.value = "";

      const validTypes = [
        "image/jpeg",
        "image/png",
        "image.webp",
        "image.webp",
        "image.heic",
        "image/heic",
        "image.heif",
        "image/heif",
      ];
      const fileType = file.type.toLowerCase();
      const fileName = file.name.toLowerCase();

      // Check if it's HEIC/HEIF first
      if (
        fileType.includes("heic") ||
        fileType.includes("heif") ||
        fileName.endsWith(".heic") ||
        fileName.endsWith(".heif")
      ) {
        setPendingFile(file);
        setShowConvertDialog(true);
        return;
      }

      // For other image types
      if (validTypes.includes(fileType)) {
        await handleFileProcess(file);
      } else {
        alert(
          "Please upload a valid image file (JPG, PNG, WEBP, HEIC, or HEIF)"
        );
      }
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    const fileType = file.type.toLowerCase();
    const fileName = file.name.toLowerCase();

    // Check if it's HEIC/HEIF first
    if (
      fileType.includes("heic") ||
      fileType.includes("heif") ||
      fileName.endsWith(".heic") ||
      fileName.endsWith(".heif")
    ) {
      setPendingFile(file);
      setShowConvertDialog(true);
      return;
    }

    // For other image types
    const validTypes = ["image/jpeg", "image/png", "image.webp", "image.webp"];
    if (validTypes.includes(fileType)) {
      await handleFileProcess(file);
    } else {
      alert("Please upload a valid image file (JPG, PNG, WEBP, HEIC, or HEIF)");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const getLoadingMessage = () => {
    if (isProcessing) {
      if (!user || !expiresAt || !isSubscriptionActive(expiresAt)) {
        return (
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-2">
              <p className="text-white text-sm font-bold">
                {processingMessage || "Analyzing with Basic AI ✨"}
              </p>
            </div>
            {/* <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
              <p className="text-white/90 text-xs">
                💫 Upgrade to Pro for 2x faster processing & HD quality
              </p>
              <button
                onClick={handleUpgradeClick}
                className="mt-2 px-3 py-1 text-xs font-medium text-white bg-purple-500/30 hover:bg-purple-500/40 rounded-full transition-colors"
              >
                Upgrade Now
              </button>
            </div> */}
          </div>
        );
      }
      return (
        <div className="flex items-center gap-2">
          <span className="animate-pulse">✨</span>
          <p className="text-white text-sm font-bold">
            {processingMessage || "Processing with Premium AI ✨"}
          </p>
          <span className="animate-pulse">✨</span>
        </div>
      );
    }
    return <p className="text-white text-sm font-bold">Loading image...</p>;
  };

  // Inside useEffect where you handle text changes
  useEffect(() => {
    const loadFonts = async () => {
      const fontPromises = textSets.map((textSet) =>
        preloadFonts(textSet.fontFamily)
      );
      await Promise.all(fontPromises);
    };

    loadFonts();
  }, [textSets, preloadFonts]);

  useEffect(() => {
    const handleAutoUpload = () => {
      if (
        shouldAutoUpload &&
        !hasTriedAutoUpload &&
        fileInputRef.current &&
        !image.original
      ) {
        setHasTriedAutoUpload(true);
        fileInputRef.current.click();
      }
    };

    // Small delay to ensure proper initialization
    const timeoutId = setTimeout(handleAutoUpload, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };
  }, []); // Empty dependency array - only run once on mount

  useEffect(() => {
    // Cleanup function for file input and auto-upload state
    return () => {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setHasTriedAutoUpload(false);
      setPendingFile(null);
      setShowConvertDialog(false);
      setShowAuthDialog(false);
    };
  }, []);

  const handleUploadClick = (e: React.MouseEvent<HTMLElement>) => {
    // No longer need to check auth here
  };

  const handleUpgradeClick = () => {
    if (user) {
      setShowProPlanDialog(true);
    } else {
      setShowAuthDialog(true);
    }
  };

  return (
    <>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center w-full h-full",
          "p-4 sm:p-6",
          "overflow-hidden",
          isMobile && "mt-2",
          isPanelOpen && isMobile && "mb-4"
        )}
      >
        {!image.original ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className={cn(
              "w-full transition-all duration-300",
              "relative flex items-center justify-center",
              isMobile
                ? isPanelOpen
                  ? "h-[65vh]" // Increased height for upload area
                  : "h-[75vh]" // Increased height for upload area
                : isPanelOpen
                  ? "h-[calc(80vh-8rem)]"
                  : "h-[calc(100vh-10rem)]"
            )}
          >
            <input
              ref={fileInputRef}
              id="canvas-upload"
              type="file"
              onChange={onFileChange}
              accept="image/jpeg,image/png,image.webp,image.heic,image.heif,.heic,.heif,.jpg,.jpeg,.png,.webp"
              className="hidden"
              disabled={isConverting || isProcessing} // Disable during conversion
            />
            {isMobile ? (
              <div className="flex flex-col items-center gap-4">
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {isConverting
                    ? "Convertendo imagem..."
                    : "Carregue uma imagem para começar"}
                </p>
                <label
                  htmlFor="canvas-upload"
                  className={cn(
                    "bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-colors",
                    (isConverting || isProcessing) &&
                    "opacity-50 cursor-not-allowed"
                  )}
                  onClick={(e) =>
                    (isConverting || isProcessing) && e.preventDefault()
                  }
                >
                  <Upload className="w-5 h-5" />
                  <span>{isConverting ? "Convertendo..." : "Carregar"}</span>
                </label>
              </div>
            ) : (
              <label
                htmlFor="canvas-upload"
                className={cn(
                  "absolute inset-0 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600/50 rounded-xl transition-all bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800/80 cursor-pointer",
                  (isConverting || isProcessing) &&
                  "opacity-50 cursor-not-allowed"
                )}
                onClick={(e) =>
                  (isConverting || isProcessing) && e.preventDefault()
                }
              >
                <div className="text-center space-y-6">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white/90">
                    {isConverting
                      ? "Convertendo formato da imagem..."
                      : "Carregue uma imagem para começar"}
                  </h3>
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-gray-100 dark:bg-gray-800/50 backdrop-blur-sm flex items-center justify-center border border-gray-200 dark:border-gray-700 shadow-xl">
                    <Upload className="w-10 h-10 text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-600 font-medium dark:text-gray-400">
                      Clique aqui ou arraste e solte a imagem
                    </p>
                    <p className="text-gray-600 text-sm dark:text-gray-400">
                      Suporta: JPG, PNG, WEBP, HEIC, HEIF
                    </p>
                  </div>
                </div>
              </label>
            )}
          </div>
        ) : (
          <div
            className={cn(
              "relative w-full h-full",
              "max-w-5xl",
              "flex items-center justify-center",
              isMobile
                ? isPanelOpen
                  ? "h-[48vh] mb-6" // Reduced height and increased bottom margin
                  : "h-full"
                : isPanelOpen
                  ? "h-[calc(85vh-8rem)]"
                  : "h-full",
              !user && "pt-10"
            )}
          >
            {(isProcessing || isConverting) && (
              <div className="absolute inset-0 flex items-center justify-center z-50 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                  {getLoadingMessage()}
                </div>
              </div>
            )}

            {image.original && (
              <div className="w-full h-full">
                <CanvasPreview />
              </div>
            )}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={showConvertDialog}
        onClose={handleConvertCancel}
        onConfirm={handleConvertConfirm}
        title="Convert Image Format"
        description="This image is in HEIC/HEIF format. To ensure compatibility, it needs to be converted to JPEG. Would you like to proceed with the conversion?"
      />

      <AuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
      />

      <ProPlanDialog
        isOpen={showProPlanDialog}
        onClose={() => setShowProPlanDialog(false)}
      />
    </>
  );
}
