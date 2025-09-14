// src/utils/date.js
// export function formatDate(dateString) {
//   if (!dateString) return "";
//   try {
//     const date = new Date(dateString); // Supabase gives UTC
//     return date.toLocaleString("en-IN", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,       // 12-hour clock (AM/PM)
//       timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // ✅ local zone
//     });
//   } catch (e) {
//     console.error("Date parse failed:", dateString, e);
//     return dateString;
//   }
// }

// src/utils/date.js
export function formatDate(dateString) {
  if (!dateString) return ""; // don’t fall back to current time

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // if parsing fails, return raw string

    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata", // ✅ fixed to IST
    });
  } catch (e) {
    console.error("Date parse failed:", dateString, e);
    return dateString;
  }
}