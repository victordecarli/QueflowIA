export const isInAppBrowser = (): boolean => {
  const ua = navigator.userAgent || navigator.vendor;
  
  // Common in-app browser patterns
  const patterns = [
    'FBAN', 'FBAV',                 // Facebook
    'Twitter',                      // Twitter
    'Instagram',                    // Instagram
    'LinkedInApp',                  // LinkedIn
    'Line',                         // Line
    'KAKAOTALK',                   // KakaoTalk
    'WeChat', 'MicroMessenger',     // WeChat
    'WhatsApp',                     // WhatsApp
    'TikTok'                        // TikTok
  ];

  return patterns.some(pattern => ua.includes(pattern));
};

export const openInBrowser = () => {
  const currentUrl = window.location.href;
  
  // Try to use advanced APIs first
  if (navigator.share) {
    navigator.share({
      url: currentUrl
    }).catch(() => {
      // Fallback to window.open
      window.open(currentUrl, '_blank');
    });
  } else {
    // Basic fallback
    window.open(currentUrl, '_blank');
  }
};
