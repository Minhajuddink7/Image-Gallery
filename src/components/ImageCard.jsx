import React from "react";
import { saveAs } from "file-saver";
export default function ImageCard({ image }) {
  const tags = image.tags.split(",");
  const saveFile = () => {
    async function fetchData() {
      try {
        const res = await fetch(image.webformatURL);
        const imageBlob = await res.blob();
        await saveAs(new Blob([imageBlob], { type: "image/png" }), "image");
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md">
      <img src={image.webformatURL} alt="" className="w-full" />
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          Photo by {image.user}
        </div>
        <ul>
          <li>
            <strong>Views:</strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads:</strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes:</strong>
            {image.likes}
          </li>
        </ul>
        <div
          className="cursor-pointer inline-block bg-purple-700 rounded-full px-3 py-1 text-sm font-semibold text-white mt-3"
          onClick={saveFile}
        >
          Download
        </div>
      </div>
      <div className="px-6 py-4">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-1 my-1"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
