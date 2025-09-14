import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function Terms() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">
        {language === "te" ? "నియమాలు & షరతులు" : "Terms & Conditions"}
      </h1>

      {language === "te" ? (
        <>
          <p className="mb-4 text-gray-700">
            ఈ వెబ్‌సైట్‌ను ఉపయోగించడం ద్వారా, మీరు క్రింది నియమాలు మరియు షరతులను అంగీకరిస్తారు.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">కంటెంట్ వినియోగం</h2>
          <p className="mb-4 text-gray-700">
            అన్ని వ్యాసాలు మరియు కంటెంట్ సమాచారం కోసం మాత్రమే. అనుమతి లేకుండా మీరు వాటిని
            పునర్ముద్రణ చేయరాదు.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">వినియోగదారుల ప్రవర్తన</h2>
          <p className="mb-4 text-gray-700">
            వినియోగదారులు వెబ్‌సైట్‌ను తప్పుగా ఉపయోగించరాదు, అనధికార ప్రాప్తి ప్రయత్నించరాదు,
            లేదా హానికరమైన కంటెంట్‌ను పంచరాదు.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">బాధ్యత</h2>
          <p className="mb-4 text-gray-700">
            వెబ్‌సైట్ లోపాలు, డౌన్‌టైమ్ లేదా మూడవ పక్ష లింకుల కోసం మేము బాధ్యత వహించము.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">మార్పులు</h2>
          <p className="mb-4 text-gray-700">
            ఈ నియమాలు ఎప్పుడైనా మార్చబడవచ్చు. వెబ్‌సైట్‌ను కొనసాగించడం అంటే మీరు తాజా
            షరతులను అంగీకరిస్తున్నారనే అర్థం.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4 text-gray-700">
            By using this website, you agree to the following terms and conditions.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Use of Content</h2>
          <p className="mb-4 text-gray-700">
            All articles and content are for informational purposes only. You may
            not reproduce, distribute, or republish without permission.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">User Conduct</h2>
          <p className="mb-4 text-gray-700">
            Users agree not to misuse the website, attempt unauthorized access, or
            spread harmful content.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Liability</h2>
          <p className="mb-4 text-gray-700">
            We are not responsible for errors, downtime, or third-party links.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Changes</h2>
          <p className="mb-4 text-gray-700">
            These Terms may be updated at any time. Continued use of the website
            means acceptance of the latest Terms.
          </p>
        </>
      )}

      <Link to="/" className="text-red-600 hover:underline">
        ← {language === "te" ? "హోమ్‌కి తిరిగి వెళ్ళండి" : "Back to Home"}
      </Link>
    </div>
  );
}
