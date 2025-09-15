// import React from "react";
// import { Helmet } from "react-helmet-async";

// export default function MetaTags({ title, description, image }) {
//   return (
//     <Helmet>
//       {title && <title>{title}</title>}
//       {description && <meta name="description" content={description} />}
//       {image && <meta property="og:image" content={image} />}
//       {title && <meta property="og:title" content={title} />}
//       {description && <meta property="og:description" content={description} />}
//       <meta property="og:type" content="article" />
//       <meta name="twitter:card" content="summary_large_image" />
//     </Helmet>
//   );
// }

import React from "react";
import { Helmet } from "react-helmet-async";

export default function MetaTags({ title, description, image, url }) {
  return (
    <Helmet>
      {/* Basic SEO */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Open Graph (Facebook / WhatsApp / LinkedIn) */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:type" content="article" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
}