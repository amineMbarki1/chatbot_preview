import useLinkPreview from "../../hooks/useLinkPreview";

export default function LinkPreview({ url }: { url: string }) {
  const { linkPreviewData, error, loading } = useLinkPreview(url);

  return (
    <>
      <p className="text-sm font-normal pb-2.5 text-gray-900 dark:text-white">
        <a
          href={url}
          className="text-blue-700  underline hover:no-underline font-medium break-all"
        >
          {url}
        </a>
      </p>
      {loading && <span>Loading link preview ...</span>}
      {error && <span>Error loading preview</span>}
      {linkPreviewData && (
        <a
          href={url}
          className="block bg-gray-50 dark:bg-gray-600 rounded-xl p-4 mb-2 hover:bg-gray-200 dark:hover:bg-gray-500"
        >
          <img src={linkPreviewData.image} className="rounded-lg mb-2" />
          <span className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {linkPreviewData.description}
          </span>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
            {linkPreviewData.title}
          </span>
        </a>
      )}
    </>
  );
}
