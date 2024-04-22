import React from "react";

function parseText(text) {
  // Split the text into paragraphs
  const paragraphs = text.split("\n\n");

  // Replace emphasized text with <strong> tags
  const parsedParagraphs = paragraphs.map((paragraph, index) => {
    const emphasizedText = paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    return <p key={index} dangerouslySetInnerHTML={{ __html: emphasizedText }} />;
  });

  return parsedParagraphs;
}

export default function Presentation({ data }) {
  return (
    <div className="container mx-auto p-8">
      {parseText(data)}
    </div>
  );
}
