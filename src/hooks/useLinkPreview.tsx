import { useState, useEffect } from "preact/hooks";
import { LinkPreviewData } from "../types";

export default function useLinkPreview(url: string) {
  const [linkPreviewData, setLinkPreviewData] =
    useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetch(`https://api.linkpreview.net/?q=${url}`, {
          headers: {
            "X-Linkpreview-Api-Key": "7a291e07b30967eea5eadce65b05a52e",
          },
        }).then((res) => res.json());

        setLinkPreviewData(data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { loading, error, linkPreviewData };
}
