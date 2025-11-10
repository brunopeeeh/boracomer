import React from "react";

interface DeviceFrameProps {
  children: React.ReactNode;
  width?: number; // px
  height?: number; // px (fallback when viewport too tall)
}

// A simple phone-like frame to center mobile UI on desktop
const DeviceFrame: React.FC<DeviceFrameProps> = ({ children, width = 420, height = 820 }) => {
  return (
    <div className="w-full h-screen bg-muted/20 flex items-center justify-center">
      <div
        className="bg-background border border-border rounded-[28px] shadow-2xl overflow-hidden"
        style={{ width, height: Math.min(height, window.innerHeight - 48) }}
      >
        {/* Optional top notch / speaker bar */}
        <div className="h-2 w-24 bg-black/10 rounded-b-xl mx-auto mt-2" />
        {/* Scrollable viewport inside the frame */}
        <div className="h-[calc(100%-0.75rem)] overflow-y-auto scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DeviceFrame;