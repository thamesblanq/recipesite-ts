// src/components/CookingVideos.tsx
import React from 'react';
import { useSearchVideosQuery } from '@/features/services/youtubeApi';
import { YouTubeVideo } from '@/types';

const CookingVideos: React.FC = () => {
  // Use the hook to fetch data
  const { data, error, isLoading } = useSearchVideosQuery();

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Failed to load videos</p>;

  // Ensure data is not null and define the videos array
  const videos: YouTubeVideo[] = data?.items || [];

  // Render the component
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos.map((video: YouTubeVideo) => (
        <div key={video.id.videoId} className="relative pb-9/16">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={video.snippet.title}
          ></iframe>
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full text-center">
            {video.snippet.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CookingVideos;
