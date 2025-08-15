import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
  src: string;
  poster?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    // Dispose existing player if it exists
    if (playerRef.current) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    // Initialize new player
    playerRef.current = videojs(videoRef.current, {
      controls: true,
      responsive: true,
      fluid: true,
      fill: true,
      playbackRates: [0.5, 1, 1.25, 1.5, 2],
      poster: poster,
      preload: 'auto',
      html5: {
        vhs: {
          overrideNative: true
        }
      },
      sources: [{
        src: src,
        type: src.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'
      }]
    });

    // Player ready callback
    playerRef.current.ready(() => {
      console.log('Video player is ready');
    });

    // Error handling
    playerRef.current.on('error', (error: any) => {
      console.error('Video player error:', error);
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src, poster]);

  return (
    <div className="relative w-full">
      <div 
        data-vjs-player
        className="vjs-custom-skin"
      >
        <video
          ref={videoRef}
          className="video-js vjs-default-skin vjs-big-play-centered"
          controls
          preload="auto"
          width="100%"
          height="400"
          poster={poster}
          data-setup="{}"
        >
          <source src={src} type={src.includes('.m3u8') ? 'application/x-mpegURL' : 'video/mp4'} />
          <p className="vjs-no-js">
            Bu videoyu oynatmak için lütfen 
            <a href="https://videojs.com/html5-video-support/" target="_blank" rel="noopener noreferrer">
              HTML5 destekli bir tarayıcı
            </a>
            kullanın.
          </p>
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;