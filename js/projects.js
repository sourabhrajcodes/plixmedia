const CATEGORIES = [
  { id: "youtube-edit", label: "YouTube Edits" },
  { id: "reels", label: "Reels & Shorts" },
  { id: "ads", label: "Ads & Commercials" },
  { id: "music-video", label: "Music Videos" }
];

const DRIVE = "https://drive.google.com";

const WORK = [
  ["Rhythm & Motion — Fashion Reel", "1LbFx-192OoH5HmylO7gQdYmyeYfAWr3B", "reels", null],
  ["50 Seconds to Impact — Brand Teaser", "13v-63Tu9HVm_dORtJN5PPe0NHBxeUZrU", "reels", null],
  ["Neon Nights — Streetwear Reel V3", "1LiZ8CnNsagxwiHsEHiCZ-L9oMqOl2iDg", "reels", null],
  ["Signature Moves — Creator Reel", "1yVTzM35FJE9kjPYalfKl6GAQaBu4Swwx", "reels", null],
  ["Coca-Cola — Taste the Feeling Campaign", "1pUm43wwx0lBLBLjzIwdPp3ZGz50nLeGq", "ads", "Coca-Cola"],
  ["Secure Tomorrow — 401(k) Financial Ad", "1embAbKycW_VT-vfSHCXRKGC_KFSsHKGr", "ads", "Cameron Financial"],
  ["Infotik — Viral Ad Campaign", "1AIZ8f_fGdF9VfEYfiDLEL-AgyGtW4GnN", "ads", "Infotik"],
  ["QA Wolf — How It Works Explainer", "1vEtxXISF8BjXnnHA2Fje-kxvOMVZkKJR", "ads", "QA Wolf"],
  ["Quadratic — Product Launch Film", "1WS8b0k1jY3Alvnhzb_PgSomC4GnaQCnf", "ads", "Quadratic"],
  ["Forex Pro — Trading Platform Promo", "1H6hOn5EHShh0Qu6TIIQGRa44zsZBLYhh", "ads", "ForexPro"],
  ["Guardiora — Luxury Brand Film", "1umXSsawGdD0q95sqDKNXM8SIpOUD2EUj", "ads", "Guardiora"],
  ["Wizzz — App Launch Campaign", "18xJtwYxFMG044It3mRynTEZGITk1R-CN", "ads", "Wizzz"],
  ["The Big Idea — Animated Explainer", "1RnJ-7QMywZnYr3a_QF3oORc9ZptlpSzp", "ads", "Explainer Co."],
  ["Luxury Unboxed — Product Showcase", "1QK_PrEUSKrx7rR1Uk3o80bqQQy41Vy5O", "ads", "Luxury Co."],
  ["Style in Motion — Fashion Film", "1uxHnYv-8U69Bp1kX0pHiXVpf-cy-Rwrd", "ads", "Fashion House"],
  ["Voices of the Valley — Documentary", "1cvlFQK1PKGGFL06g-boMP7m9MOg8d-pL", "youtube-edit", "Documentary"],
  ["City Lights — Urban Documentary", "1fGWh1k_ZHY1FHMPxn5hdRXzdtYJAzkcS", "youtube-edit", "Documentary"],
  ["The Final Cut — Cinematic Montage", "1ER7w5SV9R5bSw878LPv0nApvMMJSubqY", "youtube-edit", "Cinematic"],
  ["Twin Mind — Psychological Thriller", "15ECYxr3iam8oXnKUEQxgT7z-Dlc3iSor", "youtube-edit", "Twin Mind"],
  ["Sequence 01 — Opening Titles Cut", "1yG-CRhTjZYlsXWjS6uXO3BXlmMmpxtUC", "youtube-edit", "Studio Cut"],
  ["Fractured Light — Experimental Film", "1Mb9orowPdPBIdxvdpEnxTDaA3eLvJfoh", "youtube-edit", "Art House"],
  ["Genesis — Brand Origin Story", "18kK1xF7hT64k7F0gd5TWLPKQQQ_TtX4Q", "youtube-edit", "Genesis"],
  ["Momentum — Highlights Reel 07", "1X5Sl8dIyDEWECECQaeYT5PgVQEE-CztB", "youtube-edit", "Highlights"],
  ["XYZ — Concept Edit", "1uShrZvloqXnfzR86Fu18nA_xTsi5D-A9", "youtube-edit", "XYZ Studio"],
  ["Gözel Ora — Official Music Video", "1w9uSVq5oh-Oq-r9y8NYqiBzeiFTP3aZy", "music-video", "Gözel Ora"],
  ["Version Enhanced 01 — VFX Enhanced Cut", "1Lduaz9C7ZcYTuuTHA39onSsYQl7LRTei", "youtube-edit", null]
];

const HIDDEN_IDS = new Set([
  "1LiZ8CnNsagxwiHsEHiCZ-L9oMqOl2iDg",
  "1yVTzM35FJE9kjPYalfKl6GAQaBu4Swwx",
  "1embAbKycW_VT-vfSHCXRKGC_KFSsHKGr",
  "1vEtxXISF8BjXnnHA2Fje-kxvOMVZkKJR",
  "1WS8b0k1jY3Alvnhzb_PgSomC4GnaQCnf",
  "18kK1xF7hT64k7F0gd5TWLPKQQQ_TtX4Q",
  "1w9uSVq5oh-Oq-r9y8NYqiBzeiFTP3aZy"
]);

const PROJECTS = WORK.filter(([, fileId]) => !HIDDEN_IDS.has(fileId)).map(([title, fileId, category, client], i) => ({
  id: `work-${i + 1}`,
  title,
  category,
  client,
  embedUrl: `${DRIVE}/file/d/${fileId}/preview`,
  thumbnail: `${DRIVE}/thumbnail?id=${fileId}&sz=w600`
}));

const REEL_FILE_ID = "1LbFx-192OoH5HmylO7gQdYmyeYfAWr3B";

const SHOWREEL = {
  title: "PlixMedia — Official Showreel 2025",
  description: "60 seconds of our best work across reels, commercials, documentaries & music videos.",
  embedUrl: `${DRIVE}/file/d/${REEL_FILE_ID}/preview`
};
