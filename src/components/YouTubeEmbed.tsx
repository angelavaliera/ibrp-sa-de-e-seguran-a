interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

const YouTubeEmbed = ({ url, title = "Vídeo" }: YouTubeEmbedProps) => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return null;

  return (
    <div className="rounded-2xl overflow-hidden aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
        loading="lazy"
      />
    </div>
  );
};

export default YouTubeEmbed;
