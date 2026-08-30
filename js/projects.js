const CATEGORIES = [
  { id: "youtube-edit", label: "YouTube Edits" },
  { id: "reels", label: "Reels & Shorts" },
  { id: "ads", label: "Ads & Commercials" },
  { id: "music-video", label: "Music Videos" }
];

const DRIVE = "https://drive.google.com";

const WORK = [
  ["Reel 001", "1LbFx-192OoH5HmylO7gQdYmyeYfAWr3B", "reels", null],
  ["50-Second Final Cut", "13v-63Tu9HVm_dORtJN5PPe0NHBxeUZrU", "reels", null],
  ["Reel 3 — V3", "1LiZ8CnNsagxwiHsEHiCZ-L9oMqOl2iDg", "reels", null],
  ["Sample Reel", "1yVTzM35FJE9kjPYalfKl6GAQaBu4Swwx", "reels", null],
  ["Coca-Cola Branding", "1pUm43wwx0lBLBLjzIwdPp3ZGz50nLeGq", "ads", "Coca-Cola"],
  ["401K Contribution — Cameron Ad", "1embAbKycW_VT-vfSHCXRKGC_KFSsHKGr", "ads", null],
  ["Infotik Ads", "1AIZ8f_fGdF9VfEYfiDLEL-AgyGtW4GnN", "ads", "Infotik"],
  ["QA Wolf", "1vEtxXISF8BjXnnHA2Fje-kxvOMVZkKJR", "ads", "QA Wolf"],
  ["Quadratic", "1WS8b0k1jY3Alvnhzb_PgSomC4GnaQCnf", "ads", "Quadratic"],
  ["Forex Promo", "1H6hOn5EHShh0Qu6TIIQGRa44zsZBLYhh", "ads", null],
  ["Guardiora", "1umXSsawGdD0q95sqDKNXM8SIpOUD2EUj", "ads", "Guardiora"],
  ["Wizzz", "18xJtwYxFMG044It3mRynTEZGITk1R-CN", "ads", "Wizzz"],
  ["Explainer Video 1", "1RnJ-7QMywZnYr3a_QF3oORc9ZptlpSzp", "ads", null],
  ["Brand Example 1", "1QK_PrEUSKrx7rR1Uk3o80bqQQy41Vy5O", "ads", null],
  ["Brand Example 2", "1uxHnYv-8U69Bp1kX0pHiXVpf-cy-Rwrd", "ads", null],
  ["Documentary Cut — A", "1cvlFQK1PKGGFL06g-boMP7m9MOg8d-pL", "youtube-edit", null],
  ["Documentary Cut — B", "1fGWh1k_ZHY1FHMPxn5hdRXzdtYJAzkcS", "youtube-edit", null],
  ["Final Video 1", "1ER7w5SV9R5bSw878LPv0nApvMMJSubqY", "youtube-edit", null],
  ["Twin Mind — Final Draft", "15ECYxr3iam8oXnKUEQxgT7z-Dlc3iSor", "youtube-edit", "Twin Mind"],
  ["Sequence 01", "1yG-CRhTjZYlsXWjS6uXO3BXlmMmpxtUC", "youtube-edit", null],
  ["Experimental Cut 2", "1Mb9orowPdPBIdxvdpEnxTDaA3eLvJfoh", "youtube-edit", null],
  ["Project 05", "18kK1xF7hT64k7F0gd5TWLPKQQQ_TtX4Q", "youtube-edit", null],
  ["Video 7", "1X5Sl8dIyDEWECECQaeYT5PgVQEE-CztB", "youtube-edit", null],
  ["Xyz", "1uShrZvloqXnfzR86Fu18nA_xTsi5D-A9", "youtube-edit", null],
  ["Gozel Ora", "1w9uSVq5oh-Oq-r9y8NYqiBzeiFTP3aZy", "music-video", "Gozel Ora"]
];

const PROJECTS = WORK.map(([title, fileId, category, client], i) => ({
  id: `work-${i + 1}`,
  title,
  category,
  client,
  embedUrl: `${DRIVE}/file/d/${fileId}/preview`,
  thumbnail: `${DRIVE}/thumbnail?id=${fileId}&sz=w600`
}));

const REEL_FILE_ID = "1LbFx-192OoH5HmylO7gQdYmyeYfAWr3B";

const SHOWREEL = {
  title: "PlixMedia Showreel",
  description: "One minute of our best frames. Full reel on request.",
  embedUrl: `${DRIVE}/file/d/${REEL_FILE_ID}/preview`
};
