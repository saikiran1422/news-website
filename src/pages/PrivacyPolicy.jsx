import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function PrivacyPolicy() {
  const { language } = useLanguage();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white shadow rounded">
      <h1 className="text-3xl font-bold mb-4">
        {language === "te" ? "గోప్యతా విధానం" : "Privacy Policy"}
      </h1>

      {language === "te" ? (
        <>
          <p className="mb-4 text-gray-700">
            మీ గోప్యత మాకు చాలా ముఖ్యమైనది. ఈ గోప్యతా విధానం ద్వారా, మా వెబ్‌సైట్‌ను
            ఉపయోగించే సమయంలో మేము మీ సమాచారం ఎలా సేకరిస్తాము, ఉపయోగిస్తాము మరియు
            రక్షిస్తామో వివరిస్తుంది.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">మేము సేకరించే సమాచారం</h2>
          <p className="mb-4 text-gray-700">
            మేము మీ బ్రౌజర్ రకం, IP చిరునామా, మీరు సందర్శించే పేజీలు వంటి డేటాను సేకరించవచ్చు.
            మీరు నోటిఫికేషన్‌లకు సబ్‌స్క్రైబ్ అయితే, మీ డివైస్ ఐడీని సేకరించవచ్చు.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">సమాచారం వినియోగం</h2>
          <p className="mb-4 text-gray-700">
            ఈ సమాచారాన్ని వెబ్‌సైట్‌ను మెరుగుపరచడానికి, వ్యక్తిగత కంటెంట్ అందించడానికి
            మరియు మీరు సబ్‌స్క్రైబ్ అయితే నోటిఫికేషన్లు పంపడానికి ఉపయోగిస్తాము.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">మూడవ పక్ష సేవలు</h2>
          <p className="mb-4 text-gray-700">
            మేము Google Analytics మరియు Google Ads ను ఉపయోగించవచ్చు. ఇవి కుకీలు ఉపయోగించి
            డేటాను సేకరిస్తాయి. వీటి స్వంత గోప్యతా విధానం ఉంటుంది.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">మీ ఎంపికలు</h2>
          <p className="mb-4 text-gray-700">
            మీరు బ్రౌజర్‌లో కుకీలను నిలిపివేయవచ్చు లేదా ఎప్పుడైనా నోటిఫికేషన్‌ల నుంచి
            అనసబ్‌స్క్రైబ్ కావచ్చు.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">సంప్రదించండి</h2>
          <p className="mb-4 text-gray-700">
            ఈ గోప్యతా విధానం గురించి మీకు ప్రశ్నలు ఉంటే, మాకు{" "}
            <a href="mailto:your-email@example.com" className="text-blue-600">
              your-email@example.com
            </a>{" "}
            కు రాయండి.
          </p>
        </>
      ) : (
        <>
          <p className="mb-4 text-gray-700">
            Your privacy is important to us. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
          <p className="mb-4 text-gray-700">
            We may collect analytics data such as your browser type, IP address, and
            pages you visit. If you subscribe to notifications, we may collect your
            device ID to send updates.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Information</h2>
          <p className="mb-4 text-gray-700">
            We use information to improve the website, provide personalized content,
            and send notifications if you opt in.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
          <p className="mb-4 text-gray-700">
            We may use Google Analytics and Google Ads, which may set cookies and
            collect data. These services have their own privacy policies.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Your Choices</h2>
          <p className="mb-4 text-gray-700">
            You can disable cookies in your browser or unsubscribe from
            notifications at any time.
          </p>

          <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
          <p className="mb-4 text-gray-700">
            If you have questions about this Privacy Policy, contact us at{" "}
            <a href="mailto:your-email@example.com" className="text-blue-600">
              your-email@example.com
            </a>
            .
          </p>
        </>
      )}

      <Link to="/" className="text-red-600 hover:underline">
        ← {language === "te" ? "హోమ్‌కి తిరిగి వెళ్ళండి" : "Back to Home"}
      </Link>
    </div>
  );
}
