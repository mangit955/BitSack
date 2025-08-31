import { useEffect } from "react";
import { ShareIcon } from "../../icons/Shareicon";
import { ExternalLink, Trash2 } from "lucide-react";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
}

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
      };
    };
  }
}

// Extract YouTube video ID
function extractYouTubeId(url: string) {
  const regex =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
  const match = url.match(regex);
  return match ? match[1] : "";
}

export function Card({ title, link, type }: CardProps) {
  // Load Twitter embed script dynamically
  useEffect(() => {
    if (type === "twitter" && window.twttr) {
      window.twttr.widgets.load();
    }
  }, [type, link]);

  return (
    <div className="flex flex-col h-48 w-full md:w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-200">
      {/* Card Header */}
      <div className="flex justify-between items-center p-3 border-b border-gray-200">
        <div className="flex items-center gap-2 text-gray-800 font-medium text-sm md:text-base">
          <ShareIcon size="md" />
          <span className="truncate">{title}</span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 text-gray-500">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
            title="Open in new tab"
          >
            <ExternalLink size={18} />
          </a>
          <button
            className="hover:text-red-500 transition-colors"
            title="Remove card"
            onClick={() => console.log("Delete clicked")}
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 p-3 overflow-hidden">
        {type === "youtube" && (
          <iframe
            className="w-full h-full rounded-md"
            src={`https://www.youtube.com/embed/${extractYouTubeId(link)}`}
            title="YouTube video preview"
            allowFullScreen
          />
        )}

        {type === "twitter" && (
          <div className="h-full overflow-y-auto">
            <blockquote className="twitter-tweet">
              <a href={link}></a>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}
