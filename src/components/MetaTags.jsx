import React from "react";
import { Helmet } from "react-helmet-async";

export default function MetaTags({ title, description, image }) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="article" />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
}
