const CATEGORIES = [
  { id: "youtube-edit", label: "YouTube Edits" },
  { id: "reels", label: "Reels & Shorts" },
  { id: "ads", label: "Ads & Commercials" },
  { id: "music-video", label: "Music Videos" }
];

const DRIVE = "https://drive.google.com";

const WORK = [
  ["Reel 001", "1LbFx-192OoH5HmylO7gQdYmyeYfAWr3B", "reels"],
  ["50-Second Final Cut", "13v-63Tu9HVm_dORtJN5PPe0NHBxeUZrU", "reels"],
  ["Reel 3 — V3", "1LiZ8CnNsagxwiHsEHiCZ-L9oMqOl2iDg", "reels"],
  ["Sample Reel", "1yVTzM35FJE9kjPYalfKl6GAQaBu4Swwx", "reels"],
  ["Coca-Cola Branding", "1pUm43wwx0lBLBLjzIwdPp3ZGz50nLeGq", "ads"],
  ["401K Contribution — Cameron Ad", "1embAbKycW_VT-vfSHCXRKGC_KFSsHKGr", "ads"],
  ["Infotik Ads", "1AIZ8f_fGdF9VfEYfiDLEL-AgyGtW4GnN", "ads"],
  ["QA Wolf", "1vEtxXISF8BjXnnHA2Fje-kxvOMVZkKJR", "ads"],
  ["Quadratic", "1WS8b0k1jY3Alvnhzb_PgSomC4GnaQCnf", "ads"],
  ["Forex Promo", "1H6hOn5EHShh0Qu6TIIQGRa44zsZBLYhh", "ads"],
  ["Guardiora", "1umXSsawGdD0q95sqDKNXM8SIpOUD2EUj", "ads"],
  ["Wizzz", "18xJtwYxFMG044It3mRynTEZGITk1R-CN", "ads"],
  ["Explainer Video 1", "1RnJ-7QMywZnYr3a_QF3oORc9ZptlpSzp", "ads"],
  ["Brand Example 1", "1QK_PrEUSKrx7rR1Uk3o80bqQQy41Vy5O", "ads"],
  ["Brand Example 2", "1uxHnYv-8U69Bp1kX0pHiXVpf-cy-Rwrd", "ads"],
  ["Documentary Cut — A", "1cvlFQK1PKGGFL06g-boMP7m9MOg8d-pL", "youtube-edit"],
  ["Documentary Cut — B", "1fGWh1k_ZHY1FHMPxn5hdRXzdtYJAzkcS", "youtube-edit"],
  ["Final Video 1", "1ER7w5SV9R5bSw878LPv0nApvMMJSubqY", "youtube-edit"],
  ["Twin Mind — Final Draft", "15ECYxr3iam8oXnKUEQxgT7z-Dlc3iSor", "youtube-edit"],
  ["Sequence 01", "1yG-CRhTjZYlsXWjS6uXO3BXlmMmpxtUC", "youtube-edit"],
  ["Experimental Cut 2", "1Mb9orowPdPBIdxvdpEnxTDaA3eLvJfoh", "youtube-edit"],
  ["Project 05", "18kK1xF7hT64k7F0gd5TWLPKQQQ_TtX4Q", "youtube-edit"],
  ["Video 7", "1X5Sl8dIyDEWECECQaeYT5PgVQEE-CztB", "youtube-edit"],
  ["Xyz", "1uShrZvloqXnfzR86Fu18nA_xTsi5D-A9", "youtube-edit"],
  ["Gozel Ora", "1w9uSVq5oh-Oq-r9y8NYqiBzeiFTP3aZy", "music-video"]
];

const PROJECTS = WORK.map(([title, fileId, category], i) => ({
  id: `work-${i + 1}`,
  title,
  category,
  embedUrl: `${DRIVE}/file/d/${fileId}/preview`,
  thumbnail: `${DRIVE}/thumbnail?id=${fileId}&sz=w1280`
}));

const REEL_FILE_ID = "1LbFx-192OoH5HmylO7gQdYmyeYfAWr3B";

const SHOWREEL = {
  title: "PlixMedia Showreel",
  description: "One minute of our best frames. Full reel on request.",
  embedUrl: `${DRIVE}/file/d/${REEL_FILE_ID}/preview`
};
