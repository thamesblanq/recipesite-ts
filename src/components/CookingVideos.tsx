import { useSearchVideosQuery } from '@/features/services/micKitApi';
import { MixkitVideo } from '@/types';

const CookingVideos = () => {
  const { data, error, isLoading } = useSearchVideosQuery('cooking');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load videos</p>;

  const videos = data?.results || []; // Adjust if the API response structure is different

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {videos.map((video: MixkitVideo) => (
        <div key={video.id} className="relative pb-9/16">
          <video
            className="absolute top-0 left-0 w-full h-full"
            src={video.url} // Ensure the URL field is correct
            controls
            title={video.title}
          >
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-0 bg-black bg-opacity-50 text-white p-2 w-full text-center">
            {video.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CookingVideos;
