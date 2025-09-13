const fetch = require("node-fetch");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body);
    const { title, message, url } = body;

    const res = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Basic ${process.env.ONESIGNAL_REST_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.ONESIGNAL_APP_ID,
        included_segments: ["All"],
        headings: { en: title },
        contents: { en: message },
        url,
      }),
    });

    const data = await res.json();
    if (res.status >= 400) throw new Error(data.errors || "OneSignal error");

    return { statusCode: 200, body: JSON.stringify({ success: true, data }) };
  } catch (err) {
    console.error("Notification error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
