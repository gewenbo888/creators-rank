// Schema kept identical to the ranking-site template.
// Semantic relabels (in i18n.ts):
//   h_index   → Overall Score (0-100; weighted composite of 6 criteria)
//   citations → Followers (total reach across primary platform)
//   papers    → Engagement Rate (×10; 8.2% = 82)
//   field     → Niche specialty
//   native_province_*  → Niche category (group axis)
//   notable_work → Sub-scores (quality/frequency/commercial/cross-platform) + strengths/weaknesses + audience
//
// Weighting scheme:
//   Engagement rate         : 20%   (raw followers without engagement = dead reach)
//   Cross-platform presence : 20%   (single-platform = fragile, see TikTok ban risk)
//   Content quality         : 18%
//   Follower count          : 18%
//   Commercial influence    : 16%
//   Posting frequency       :  8%   (quality > quantity)
//
// Snapshot of the global creator economy, April 2026.
// Follower counts and engagement rates are approximations from public profiles
// (YouTube, Instagram, TikTok, X), Modash / HypeAuditor, and Social Blade.
// Treat as descriptive, not endorsement.

export interface Researcher {
  id: number;
  name_en: string;
  name_zh: string;
  affiliation_en: string;
  affiliation_zh: string;
  field_en: string;
  field_zh: string;
  h_index: number;     // Overall Score
  citations: number;   // Total followers (across primary platform)
  papers: number;      // Engagement rate ×10
  notable_work_en: string;
  notable_work_zh: string;
  country: string;
  native_province_en: string;
  native_province_zh: string;
  homepage?: string;
}

export interface ProvinceStats {
  province_en: string;
  province_zh: string;
  count: number;
  researchers: Researcher[];
  avg_h_index: number;
  total_citations: number;
}

export function getProvinceStats(data: Researcher[]): ProvinceStats[] {
  const map = new Map<string, Researcher[]>();
  for (const r of data) {
    const key = r.native_province_en;
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  const stats: ProvinceStats[] = [];
  for (const [province_en, rs] of map) {
    stats.push({
      province_en,
      province_zh: rs[0].native_province_zh,
      count: rs.length,
      researchers: rs.sort((a, b) => b.h_index - a.h_index),
      avg_h_index: Math.round(rs.reduce((s, r) => s + r.h_index, 0) / rs.length),
      total_citations: rs.reduce((s, r) => s + r.citations, 0),
    });
  }
  return stats.sort((a, b) => b.count - a.count || b.avg_h_index - a.avg_h_index);
}

type _R = {
  n: string; z: string;
  a: string; az: string;
  f: string; fz: string;
  h: number; c: number; p: number;
  w: string; wz: string;
  g: string;
  pn: string; pz: string;
  hp?: string;
};

const _data: _R[] = [
  // === COMEDY / ENTERTAINMENT ===
  {n:"MrBeast (Jimmy Donaldson)",z:"MrBeast (吉米·唐纳森)",a:"Beast Industries",az:"Beast Industries",f:"Stunts · giveaways · philanthropy",fz:"挑战 · 送礼 · 慈善",h:97,c:425000000,p:120,w:"Quality 10·Frequency 8·Commercial 10·Cross-platform 10. The biggest creator on earth (425M YT, 110M IG, 120M TT). Strengths: production value, distribution mastery, Beast Burger/Feastables empire. Weaknesses: format fatigue rumblings, Quiddich-scale crew burnout. Audience: 13-34 global, M-skewed.",wz:"质量 10 · 频率 8 · 商业化 10 · 跨平台 10。地球第一大创作者 (4.25 亿 YT、1.1 亿 IG、1.2 亿 TT)。优点：制作精良、分发精通、Beast Burger/Feastables 帝国；缺点：格式疲劳传闻、团队规模化倦怠。受众：13-34 岁全球，男性偏多。",g:"🇺🇸",pn:"Comedy & Entertainment",pz:"娱乐",hp:"https://youtube.com/@MrBeast"},
  {n:"Khaby Lame",z:"Khaby Lame",a:"Independent",az:"独立",f:"Silent reaction comedy",fz:"无声反应喜剧",h:88,c:162000000,p:95,w:"Quality 9·Frequency 9·Commercial 9·Cross-platform 9. Italian creator who became the most-followed on TikTok via wordless reactions to overcomplicated life-hack videos. Strengths: universal language (no English needed), brand-friendly. Weaknesses: format ceiling, less depth. Audience: 13-30 global.",wz:"质量 9 · 频率 9 · 商业化 9 · 跨平台 9。意大利创作者，凭无声吐槽过度复杂生活技巧视频登顶 TikTok 粉丝榜。优点：普世语言（无需英文），品牌友好；缺点：格式上限，深度有限。受众：13-30 岁全球。",g:"🇮🇹",pn:"Comedy & Entertainment",pz:"娱乐"},
  {n:"Charli D'Amelio",z:"Charli D'Amelio",a:"Independent",az:"独立",f:"Dance · lifestyle · brand collabs",fz:"舞蹈 · 生活 · 品牌合作",h:75,c:158000000,p:60,w:"Quality 7·Frequency 7·Commercial 9·Cross-platform 8. The TikTok original star. Strengths: massive Gen Z mind-share, family business empire. Weaknesses: declining engagement vs peak, brand-deal saturation. Audience: 12-24 girls.",wz:"质量 7 · 频率 7 · 商业化 9 · 跨平台 8。TikTok 初代顶流。优点：Z 世代心智占有，家族商业帝国；缺点：互动率较巅峰下滑，广告饱和。受众：12-24 岁女性。",g:"🇺🇸",pn:"Comedy & Entertainment",pz:"娱乐"},
  {n:"Bella Poarch",z:"Bella Poarch",a:"Warner Records",az:"华纳唱片",f:"TikTok · music",fz:"TikTok · 音乐",h:72,c:96000000,p:75,w:"Quality 8·Frequency 6·Commercial 8·Cross-platform 7. Pioneered short-form viral sound formats. Strengths: huge organic reach, music pivot. Weaknesses: posting frequency low, music has not gone mainstream. Audience: 13-25.",wz:"质量 8 · 频率 6 · 商业化 8 · 跨平台 7。短视频神曲格式开创者。优点：自然流量惊人，转型音乐人；缺点：发布频率低，音乐未突破主流。受众：13-25 岁。",g:"🇵🇭",pn:"Comedy & Entertainment",pz:"娱乐"},
  {n:"Zach King",z:"Zach King",a:"Independent",az:"独立",f:"VFX magic edits",fz:"特效魔法剪辑",h:82,c:81000000,p:88,w:"Quality 10·Frequency 7·Commercial 8·Cross-platform 8. Pioneer of the 'magic edit' on Vine, now TikTok. Strengths: technically virtuoso, family-safe, brand-friendly. Weaknesses: format-bound, slow to evolve. Audience: 8-35 family.",wz:"质量 10 · 频率 7 · 商业化 8 · 跨平台 8。Vine 时代的'魔法剪辑'鼻祖，现在 TikTok。优点：技术大师，家庭友好，品牌友好；缺点：受格式限制，演化慢。受众：8-35 岁全家。",g:"🇺🇸",pn:"Comedy & Entertainment",pz:"娱乐"},
  {n:"IShowSpeed (Darren Watkins)",z:"IShowSpeed (达伦·沃特金斯)",a:"AMP / Independent",az:"AMP / 独立",f:"Live streaming · gaming · IRL chaos",fz:"直播 · 游戏 · 户外混乱",h:88,c:36000000,p:130,w:"Quality 8·Frequency 10·Commercial 8·Cross-platform 9. Football-loving Gen Z streamer who took the world tour viral. Strengths: highest live engagement on YouTube, beloved across Asia/Brazil. Weaknesses: chaotic content, controversies. Audience: 12-25 global, M-skew.",wz:"质量 8 · 频率 10 · 商业化 8 · 跨平台 9。爱足球的 Z 世代主播，世界巡回直播刷屏。优点：YouTube 直播互动率最高，亚洲/巴西热度爆棚；缺点：内容混乱，争议多。受众：12-25 岁全球男性。",g:"🇺🇸",pn:"Comedy & Entertainment",pz:"娱乐"},

  // === TECH / REVIEWS ===
  {n:"MKBHD (Marques Brownlee)",z:"MKBHD (马库斯·布朗利)",a:"Independent",az:"独立",f:"Tech reviews · cinematography · interviews",fz:"科技评测 · 拍摄 · 访谈",h:91,c:23000000,p:88,w:"Quality 10·Frequency 8·Commercial 9·Cross-platform 9. The standard for tech reviews. Strengths: editorial integrity, cinematography quality, Waveform podcast, smartwatch line. Weaknesses: pacing slower than competitors. Audience: 18-45 tech enthusiasts.",wz:"质量 10 · 频率 8 · 商业化 9 · 跨平台 9。科技评测标杆。优点：编辑独立性，拍摄质量，Waveform 播客，智能手表产品；缺点：节奏慢于竞品。受众：18-45 岁科技爱好者。",g:"🇺🇸",pn:"Tech & Reviews",pz:"科技测评",hp:"https://youtube.com/@mkbhd"},
  {n:"Linus Tech Tips",z:"Linus Tech Tips",a:"Linus Media Group",az:"Linus Media Group",f:"PC tech · enthusiast hardware",fz:"PC 硬件 · 发烧友",h:80,c:16000000,p:75,w:"Quality 8·Frequency 10·Commercial 9·Cross-platform 8. Daily PC tech videos at industrial scale. Strengths: high cadence, multi-channel empire (Floatplane, ShortCircuit), subscription model. Weaknesses: 2023 quality scandal scars, scattered focus. Audience: 16-40 PC enthusiasts.",wz:"质量 8 · 频率 10 · 商业化 9 · 跨平台 8。工业化产能的 PC 科技频道。优点：发布频率高，多频道矩阵 (Floatplane、ShortCircuit)，订阅模式；缺点：2023 质量丑闻余波，焦点分散。受众：16-40 岁 PC 玩家。",g:"🇨🇦",pn:"Tech & Reviews",pz:"科技测评"},
  {n:"Unbox Therapy",z:"Unbox Therapy",a:"Independent",az:"独立",f:"Gadget unboxings · novelty tech",fz:"开箱 · 新奇科技",h:74,c:19000000,p:60,w:"Quality 7·Frequency 8·Commercial 8·Cross-platform 7. Unboxing pioneer. Strengths: massive subscriber base, brand recognition. Weaknesses: peak audience reached, formats getting tired. Audience: 18-45 tech curious.",wz:"质量 7 · 频率 8 · 商业化 8 · 跨平台 7。开箱视频鼻祖。优点：订阅基数大，品牌认知高；缺点：受众已见顶，格式疲劳。受众：18-45 岁科技爱好者。",g:"🇨🇦",pn:"Tech & Reviews",pz:"科技测评"},

  // === BEAUTY / FASHION ===
  {n:"Huda Kattan",z:"Huda Kattan",a:"Huda Beauty",az:"Huda Beauty",f:"Beauty · founder · entrepreneurship",fz:"美妆 · 创始人 · 创业",h:84,c:56000000,p:80,w:"Quality 9·Frequency 8·Commercial 10·Cross-platform 8. Iraqi-American beauty mogul; Huda Beauty is a $1B+ brand. Strengths: built a real consumer business, MENA trust. Weaknesses: less hands-on content lately. Audience: 18-40 women.",wz:"质量 9 · 频率 8 · 商业化 10 · 跨平台 8。伊拉克裔美籍美妆女王，Huda Beauty 是 10 亿美元+ 品牌。优点：搭建了真正的消费品生意，MENA 区信任度高；缺点：近年亲自出镜内容减少。受众：18-40 岁女性。",g:"🇺🇸",pn:"Beauty & Fashion",pz:"美妆时尚"},
  {n:"Mikayla Nogueira",z:"Mikayla Nogueira",a:"Independent",az:"独立",f:"Drugstore makeup reviews",fz:"开架彩妆评测",h:80,c:22000000,p:90,w:"Quality 8·Frequency 9·Commercial 8·Cross-platform 8. Boston-accented makeup honesty went viral. Strengths: authentic voice, drugstore-budget niche, very high engagement. Weaknesses: 2023 fake-lashes-mascara controversy. Audience: 16-35 women.",wz:"质量 8 · 频率 9 · 商业化 8 · 跨平台 8。波士顿口音 + 真实彩妆推荐走红。优点：声音真实，开架预算定位，互动率极高；缺点：2023 年假睫毛-睫毛膏争议。受众：16-35 岁女性。",g:"🇺🇸",pn:"Beauty & Fashion",pz:"美妆时尚"},
  {n:"James Charles",z:"James Charles",a:"Independent",az:"独立",f:"Makeup · drama · collabs",fz:"彩妆 · 戏剧 · 合作",h:62,c:24000000,p:55,w:"Quality 7·Frequency 7·Commercial 6·Cross-platform 7. Bell-cover boy fall-from-grace. Strengths: peak technical skill, large audience. Weaknesses: ongoing controversies, brand pulled. Audience: 14-25 (declining engagement).",wz:"质量 7 · 频率 7 · 商业化 6 · 跨平台 7。Cover Girl 男代言人式陨落。优点：技术巅峰，受众大；缺点：争议持续，品牌断链。受众：14-25 岁（互动率下滑）。",g:"🇺🇸",pn:"Beauty & Fashion",pz:"美妆时尚"},

  // === GAMING ===
  {n:"PewDiePie (Felix Kjellberg)",z:"PewDiePie (菲利克斯·谢尔贝格)",a:"Independent (Japan-based)",az:"独立 (居日)",f:"Gaming · vlogs · semi-retired",fz:"游戏 · vlog · 半退休",h:75,c:110000000,p:50,w:"Quality 8·Frequency 4·Commercial 7·Cross-platform 6. Original YouTube king, now lives in Japan and posts sporadically. Strengths: legacy reach, devoted core fans. Weaknesses: posts maybe monthly, focus on family + chess + Japanese learning. Audience: 18-40 nostalgia layer.",wz:"质量 8 · 频率 4 · 商业化 7 · 跨平台 6。YouTube 初代之王，现居日本，发布间歇。优点：传奇影响力，核心粉丝忠诚；缺点：频率约月更，重心转向家庭+国际象棋+日语；受众：18-40 岁怀旧层。",g:"🇯🇵",pn:"Gaming",pz:"游戏"},
  {n:"Markiplier (Mark Fischbach)",z:"Markiplier",a:"Independent",az:"独立",f:"Horror gaming · let's plays · films",fz:"恐怖游戏 · 实况 · 电影",h:84,c:38000000,p:80,w:"Quality 9·Frequency 7·Commercial 8·Cross-platform 8. Long-running gaming/let's-play, transitioning to film/streaming. Strengths: very loyal audience, branched into film. Weaknesses: less gaming, more meta. Audience: 18-35 horror/gaming.",wz:"质量 9 · 频率 7 · 商业化 8 · 跨平台 8。长青游戏实况主，正向电影/流媒体转型。优点：粉丝极忠诚，已布局电影；缺点：游戏内容减少，元素变多元。受众：18-35 岁恐怖/游戏粉。",g:"🇺🇸",pn:"Gaming",pz:"游戏"},
  {n:"Ninja (Tyler Blevins)",z:"Ninja (泰勒·布列文斯)",a:"Independent / Twitch / YouTube",az:"独立 / Twitch / YouTube",f:"Fortnite · livestream · esports",fz:"堡垒之夜 · 直播 · 电竞",h:74,c:19000000,p:60,w:"Quality 7·Frequency 8·Commercial 9·Cross-platform 8. The streamer who took streaming mainstream. Strengths: brand deals (Adidas, Red Bull), recovering from cancer publicly. Weaknesses: viewership declined post-Mixer era. Audience: 13-30 gamers.",wz:"质量 7 · 频率 8 · 商业化 9 · 跨平台 8。把直播推入主流的人。优点：品牌合作 (Adidas、Red Bull)，公开抗癌；缺点：Mixer 时代之后观众下滑。受众：13-30 岁玩家。",g:"🇺🇸",pn:"Gaming",pz:"游戏"},
  {n:"Jacksepticeye (Sean McLoughlin)",z:"Jacksepticeye (肖恩·麦克劳林)",a:"Independent",az:"独立",f:"Energetic gaming · charity",fz:"高能游戏 · 公益",h:80,c:31000000,p:75,w:"Quality 8·Frequency 8·Commercial 8·Cross-platform 8. Irish energy embodied. Strengths: charitable streams (Thankmas raises millions), wholesome reputation. Weaknesses: format hasn't evolved much. Audience: 16-30 gaming + charity-leaning.",wz:"质量 8 · 频率 8 · 商业化 8 · 跨平台 8。爱尔兰能量化身。优点：公益直播 (Thankmas 募集数百万)，口碑温暖；缺点：格式演化不大。受众：16-30 岁游戏+公益向。",g:"🇮🇪",pn:"Gaming",pz:"游戏"},
  {n:"DanTDM (Daniel Middleton)",z:"DanTDM (丹尼尔·米德尔顿)",a:"Independent",az:"独立",f:"Minecraft · family-safe gaming",fz:"我的世界 · 家庭友好游戏",h:75,c:28000000,p:65,w:"Quality 8·Frequency 8·Commercial 9·Cross-platform 7. Minecraft-era kid-favorite still going. Strengths: family-safe, Minecraft loyalty, books + merch lines. Weaknesses: Minecraft is mature, audience graduated. Audience: 8-16 kids.",wz:"质量 8 · 频率 8 · 商业化 9 · 跨平台 7。Minecraft 时代的儿童偶像，至今活跃。优点：家庭友好，Minecraft 粉丝忠诚，图书+周边线；缺点：Minecraft 成熟，受众长大。受众：8-16 岁少儿。",g:"🇬🇧",pn:"Gaming",pz:"游戏"},

  // === MUSIC / CELEBRITY ===
  {n:"Selena Gomez",z:"赛琳娜·戈麦斯",a:"Independent / Rare Beauty",az:"独立 / Rare Beauty",f:"Singer · actress · Rare Beauty founder",fz:"歌手 · 演员 · Rare Beauty 创始人",h:88,c:425000000,p:75,w:"Quality 8·Frequency 7·Commercial 10·Cross-platform 9. Largest IG account by some measures. Strengths: Rare Beauty $2B+ valuation, mental-health advocacy. Weaknesses: posts less frequently lately, Hollywood priorities. Audience: 15-40 women.",wz:"质量 8 · 频率 7 · 商业化 10 · 跨平台 9。某些口径下 IG 第一大号。优点：Rare Beauty 估值 20 亿美元+，心理健康倡议；缺点：发布频率下降，好莱坞优先；受众：15-40 岁女性。",g:"🇺🇸",pn:"Music & Celebrity",pz:"音乐与名人"},
  {n:"Cristiano Ronaldo",z:"克里斯蒂亚诺·罗纳尔多",a:"Al-Nassr / CR7",az:"利雅得胜利 / CR7",f:"Football · CR7 brand",fz:"足球 · CR7 品牌",h:91,c:660000000,p:70,w:"Quality 9·Frequency 9·Commercial 10·Cross-platform 9. Most-followed person on Instagram (660M). Strengths: brand machine, Saudi sportswashing controversy aside, generational athlete. Weaknesses: not a 'creator' in the traditional sense. Audience: global football.",wz:"质量 9 · 频率 9 · 商业化 10 · 跨平台 9。Instagram 全球第一大粉账号 (6.6 亿)。优点：品牌机器，沙特争议另说，时代级运动员；缺点：非传统意义上的'创作者'。受众：全球足球迷。",g:"🇵🇹",pn:"Music & Celebrity",pz:"音乐与名人"},
  {n:"BTS Jung Kook",z:"BTS 田柾国",a:"BIGHIT MUSIC / HYBE",az:"BIGHIT MUSIC / HYBE",f:"K-pop · solo career",fz:"K-pop · 个人发展",h:84,c:79000000,p:90,w:"Quality 10·Frequency 6·Commercial 10·Cross-platform 8. BTS's youngest, returned from military service 2025. Strengths: top-tier engagement (ARMY), global K-pop machine. Weaknesses: military hiatus impact, comeback in progress. Audience: K-pop ARMY 13-35.",wz:"质量 10 · 频率 6 · 商业化 10 · 跨平台 8。BTS 老幺，2025 年服完兵役归来。优点：顶级互动率 (ARMY)，全球 K-pop 机器；缺点：服役期影响，回归中。受众：13-35 岁 K-pop ARMY。",g:"🇰🇷",pn:"Music & Celebrity",pz:"音乐与名人"},
  {n:"Tate McRae",z:"Tate McRae",a:"RCA Records",az:"RCA Records",f:"Pop singer · dance",fz:"流行歌手 · 舞蹈",h:80,c:42000000,p:88,w:"Quality 9·Frequency 8·Commercial 9·Cross-platform 8. Canadian pop ascendant. Strengths: high engagement Gen Z, dance-driven format works on TikTok. Weaknesses: still building global radio presence. Audience: 14-25.",wz:"质量 9 · 频率 8 · 商业化 9 · 跨平台 8。加拿大流行歌手新星。优点：Z 世代互动高，舞蹈驱动格式适合 TikTok；缺点：全球电台覆盖仍在建。受众：14-25 岁。",g:"🇨🇦",pn:"Music & Celebrity",pz:"音乐与名人"},

  // === LIFESTYLE / VLOG ===
  {n:"Emma Chamberlain",z:"Emma Chamberlain",a:"Chamberlain Coffee",az:"Chamberlain Coffee",f:"Vlog · coffee brand · podcast",fz:"vlog · 咖啡品牌 · 播客",h:84,c:28000000,p:90,w:"Quality 9·Frequency 7·Commercial 10·Cross-platform 8. Defined casual Gen Z aesthetic. Strengths: Chamberlain Coffee, Anything Goes podcast, Vogue Met Gala correspondent. Weaknesses: posts less now, focus on business. Audience: 14-30 women.",wz:"质量 9 · 频率 7 · 商业化 10 · 跨平台 8。定义了 Z 世代休闲美学。优点：Chamberlain Coffee 咖啡品牌，Anything Goes 播客，Vogue 红毯解说；缺点：发布频率下降，重心移向生意；受众：14-30 岁女性。",g:"🇺🇸",pn:"Lifestyle & Vlog",pz:"生活方式 vlog"},
  {n:"David Dobrik",z:"David Dobrik",a:"Independent",az:"独立",f:"Vlog · prank · TikTok",fz:"vlog · 恶搞 · TikTok",h:70,c:30000000,p:60,w:"Quality 7·Frequency 6·Commercial 8·Cross-platform 8. Vlog Squad architect. Strengths: still big on TikTok, Dispo app legacy. Weaknesses: 2021 controversy hangover, less consistent. Audience: 16-30.",wz:"质量 7 · 频率 6 · 商业化 8 · 跨平台 8。Vlog Squad 主建筑师。优点：TikTok 仍大，Dispo 应用遗产；缺点：2021 争议余波，更不稳定；受众：16-30 岁。",g:"🇺🇸",pn:"Lifestyle & Vlog",pz:"生活方式 vlog"},
  {n:"Casey Neistat",z:"凯西·奈斯塔",a:"Independent",az:"独立",f:"Cinematic vlog · NYC",fz:"电影感 vlog · 纽约",h:74,c:12000000,p:70,w:"Quality 10·Frequency 5·Commercial 7·Cross-platform 7. Defined modern vlogging. Strengths: cinematography teacher to a generation, integrity. Weaknesses: posts rarely, post-Beme/CNN era diffuse. Audience: 18-40 creators/aspiring vloggers.",wz:"质量 10 · 频率 5 · 商业化 7 · 跨平台 7。现代 vlog 风格定义者。优点：一代创作者的电影感导师，操守好；缺点：发布稀少，Beme/CNN 时期之后焦点分散；受众：18-40 岁创作者/有志 vlogger。",g:"🇺🇸",pn:"Lifestyle & Vlog",pz:"生活方式 vlog"},
  {n:"Logan Paul",z:"Logan Paul",a:"Prime Hydration / WWE",az:"Prime Hydration / WWE",f:"Vlog · boxing · Prime · WWE",fz:"vlog · 拳击 · Prime · WWE",h:72,c:23000000,p:65,w:"Quality 7·Frequency 7·Commercial 10·Cross-platform 9. Prime Hydration is ~$1B/yr. Strengths: business empire scale, KSI rivalry-turned-partnership. Weaknesses: history of controversies. Audience: 14-30 M.",wz:"质量 7 · 频率 7 · 商业化 10 · 跨平台 9。Prime Hydration 年收入约 10 亿。优点：商业帝国规模，与 KSI 由敌转友；缺点：争议史长。受众：14-30 岁男性。",g:"🇺🇸",pn:"Lifestyle & Vlog",pz:"生活方式 vlog"},

  // === EDUCATION ===
  {n:"Veritasium (Derek Muller)",z:"Veritasium (德里克·穆勒)",a:"Independent",az:"独立",f:"Science · physics · counterintuitive",fz:"科学 · 物理 · 反直觉",h:88,c:18000000,p:90,w:"Quality 10·Frequency 6·Commercial 8·Cross-platform 7. Best long-form science on YouTube. Strengths: production quality, scientific rigor, occasional viral hits. Weaknesses: monthly cadence, some sponsored content critiques. Audience: 18-50 STEM curious.",wz:"质量 10 · 频率 6 · 商业化 8 · 跨平台 7。YouTube 最佳长视频科学频道。优点：制作质量，科学严谨，偶有病毒爆款；缺点：月更节奏，部分赞助内容受批评；受众：18-50 岁 STEM 爱好者。",g:"🇨🇦",pn:"Education",pz:"教育科普"},
  {n:"Vsauce (Michael Stevens)",z:"Vsauce (迈克尔·史蒂文斯)",a:"Independent",az:"独立",f:"Science · philosophy · curiosity",fz:"科学 · 哲学 · 好奇心",h:80,c:22000000,p:75,w:"Quality 10·Frequency 4·Commercial 6·Cross-platform 6. The asking-the-right-questions channel. Strengths: cult following, deep philosophical takes. Weaknesses: very rare uploads (a few/year). Audience: 18-45 thinkers.",wz:"质量 10 · 频率 4 · 商业化 6 · 跨平台 6。提出'对的问题'的频道。优点：邪教级粉丝群，深度哲学；缺点：发布极稀（一年几条）；受众：18-45 岁思考者。",g:"🇺🇸",pn:"Education",pz:"教育科普"},
  {n:"Hank & John Green",z:"汉克与约翰·格林",a:"Vlogbrothers / SciShow / Crash Course",az:"Vlogbrothers / SciShow / Crash Course",f:"Educational empire · 14M+ across channels",fz:"教育帝国 · 跨频道 1400 万+",h:82,c:14000000,p:80,w:"Quality 10·Frequency 10·Commercial 7·Cross-platform 9. Multi-channel educational empire. Strengths: incredibly consistent, charity-aligned (Project for Awesome), free Crash Course. Weaknesses: niche-mature audience. Audience: 14-35 nerd-leaning.",wz:"质量 10 · 频率 10 · 商业化 7 · 跨平台 9。多频道教育帝国。优点：稳定到惊人，公益取向 (Project for Awesome)，Crash Course 免费；缺点：受众小众而成熟；受众：14-35 岁书呆子向。",g:"🇺🇸",pn:"Education",pz:"教育科普"},
  {n:"Ali Abdaal",z:"Ali Abdaal",a:"Independent",az:"独立",f:"Productivity · entrepreneurship",fz:"效率 · 创业",h:80,c:6500000,p:88,w:"Quality 9·Frequency 8·Commercial 9·Cross-platform 8. Doctor-turned-creator. Strengths: book ('Feel-Good Productivity') + course empire, high engagement. Weaknesses: 'productivity guru' fatigue. Audience: 22-40 knowledge workers.",wz:"质量 9 · 频率 8 · 商业化 9 · 跨平台 8。医生转型创作者。优点：图书 (《Feel-Good Productivity》) + 课程帝国，互动高；缺点：'效率大师'疲劳；受众：22-40 岁知识工作者。",g:"🇬🇧",pn:"Education",pz:"教育科普"},

  // === COOKING ===
  {n:"Joshua Weissman",z:"Joshua Weissman",a:"Independent",az:"独立",f:"Cooking · sourdough · 'But Better' series",fz:"烹饪 · 酸面包 · 'But Better' 系列",h:84,c:11000000,p:90,w:"Quality 10·Frequency 8·Commercial 8·Cross-platform 8. Energetic, technique-deep cooking. Strengths: production quality, three cookbooks, tight community. Weaknesses: persona is acquired taste. Audience: 18-45 home cooks.",wz:"质量 10 · 频率 8 · 商业化 8 · 跨平台 8。高能量、技术深度的烹饪频道。优点：制作质量，三本食谱，社区紧密；缺点：风格因人而异；受众：18-45 岁家庭厨师。",g:"🇺🇸",pn:"Cooking",pz:"美食"},
  {n:"Babish (Andrew Rea)",z:"Babish (安德鲁·雷亚)",a:"Babish Culinary Universe",az:"Babish Culinary Universe",f:"Pop-culture food recreations",fz:"流行文化美食复刻",h:82,c:11000000,p:80,w:"Quality 10·Frequency 8·Commercial 9·Cross-platform 7. 'Binging with Babish' formula. Strengths: niche-defining format, knife brand. Weaknesses: format risks repetition. Audience: 16-40 cooking + pop-culture.",wz:"质量 10 · 频率 8 · 商业化 9 · 跨平台 7。'Binging with Babish' 模式。优点：定义品类的格式，自有刀具品牌；缺点：格式有重复风险；受众：16-40 岁美食+流行文化。",g:"🇺🇸",pn:"Cooking",pz:"美食"},
  {n:"Gordon Ramsay",z:"戈登·拉姆齐",a:"Studio Ramsay Global",az:"Studio Ramsay Global",f:"Celebrity chef · TV · TikTok pivots",fz:"明星厨师 · 电视 · TikTok 转型",h:80,c:35000000,p:65,w:"Quality 9·Frequency 7·Commercial 10·Cross-platform 9. Established TV legend now huge on TikTok. Strengths: cross-generational reach, restaurant empire, Hell's Kitchen IP. Weaknesses: digital-native creators outpace him in engagement. Audience: 18-65 mainstream.",wz:"质量 9 · 频率 7 · 商业化 10 · 跨平台 9。电视传奇后转型 TikTok 也大火。优点：跨代触达，餐厅帝国，《地狱厨房》IP；缺点：互动率被数字原生创作者超越；受众：18-65 岁主流。",g:"🇬🇧",pn:"Cooking",pz:"美食"},
  {n:"Chef Wang Gang",z:"美食作家王刚",a:"Independent",az:"独立",f:"Authentic Sichuan home cooking",fz:"地道川菜家常",h:82,c:1700000,p:95,w:"Quality 10·Frequency 8·Commercial 6·Cross-platform 6. Cult Chinese cooking creator. Strengths: 'three first' (first oil/wok/dish) ritual, authentic Sichuan technique. Weaknesses: smaller in West, no English subs by default. Audience: Chinese diaspora + cooking nerds.",wz:"质量 10 · 频率 8 · 商业化 6 · 跨平台 6。中国烹饪邪典创作者。优点：'三大第一'（颠勺、宽油、起锅）仪式，地道川菜技法；缺点：海外受众小，默认无英文字幕；受众：华人圈+烹饪发烧友。",g:"🇨🇳",pn:"Cooking",pz:"美食"},

  // === FITNESS ===
  {n:"Pamela Reif",z:"Pamela Reif",a:"Independent / NAJU brand",az:"独立 / NAJU 品牌",f:"Home workouts · no-equipment routines",fz:"家庭训练 · 无器械",h:82,c:11000000,p:88,w:"Quality 9·Frequency 9·Commercial 9·Cross-platform 9. German fitness creator, multilingual. Strengths: free YouTube routines that actually work, food brand. Weaknesses: same-format-fatigue critique. Audience: 18-35 women home-fitness.",wz:"质量 9 · 频率 9 · 商业化 9 · 跨平台 9。德国健身博主，多语言。优点：免费 YouTube 训练真有效，食品品牌；缺点：格式重复批评；受众：18-35 岁女性家庭健身。",g:"🇩🇪",pn:"Fitness",pz:"健身"},
  {n:"Chris Heria",z:"Chris Heria",a:"THENX",az:"THENX",f:"Calisthenics · street workout",fz:"自重训练 · 街头健身",h:74,c:6500000,p:80,w:"Quality 8·Frequency 8·Commercial 8·Cross-platform 7. Calisthenics spokesperson. Strengths: THENX app + program, real technical depth. Weaknesses: form-criticism backlash, paid app criticism. Audience: 16-35 M home workout.",wz:"质量 8 · 频率 8 · 商业化 8 · 跨平台 7。自重训练代言人。优点：THENX 应用+课程，技术深度真实；缺点：动作纠错争议，付费应用批评；受众：16-35 岁男性家庭训练。",g:"🇺🇸",pn:"Fitness",pz:"健身"},
  {n:"Joe Wicks",z:"Joe Wicks",a:"The Body Coach",az:"The Body Coach",f:"HIIT · UK family fitness",fz:"HIIT · 英国家庭健身",h:75,c:5000000,p:75,w:"Quality 8·Frequency 8·Commercial 9·Cross-platform 8. UK PE-with-Joe pandemic hero. Strengths: family-friendly, books + app empire, MBE. Weaknesses: post-pandemic interest dropped. Audience: UK families.",wz:"质量 8 · 频率 8 · 商业化 9 · 跨平台 8。英国疫情期'PE with Joe'国民教练。优点：家庭友好，图书+应用帝国，MBE 勋章；缺点：疫情后热度下降；受众：英国家庭。",g:"🇬🇧",pn:"Fitness",pz:"健身"},

  // === BUSINESS / FINANCE ===
  {n:"Gary Vaynerchuk",z:"Gary Vaynerchuk",a:"VaynerMedia",az:"VaynerMedia",f:"Marketing · NFTs · agency",fz:"营销 · NFT · 代理",h:78,c:11000000,p:75,w:"Quality 7·Frequency 10·Commercial 10·Cross-platform 10. Most omnipresent business creator. Strengths: every-platform native, agency owner, VeeFriends NFTs. Weaknesses: hustle-culture critique, NFT bag holding. Audience: 22-45 marketers/entrepreneurs.",wz:"质量 7 · 频率 10 · 商业化 10 · 跨平台 10。最无处不在的商业创作者。优点：每个平台都原生，代理公司，VeeFriends NFT；缺点：'卷文化'批评，NFT 套牢；受众：22-45 岁营销/创业者。",g:"🇺🇸",pn:"Business & Finance",pz:"商业财经"},
  {n:"Graham Stephan",z:"Graham Stephan",a:"Independent",az:"独立",f:"Personal finance · real estate · investing",fz:"个人理财 · 地产 · 投资",h:80,c:5000000,p:88,w:"Quality 9·Frequency 9·Commercial 8·Cross-platform 8. Personal finance with realtor depth. Strengths: high engagement, transparent on numbers, daily uploads. Weaknesses: ad reads everywhere, 'iced coffee' meme. Audience: 22-40 investors.",wz:"质量 9 · 频率 9 · 商业化 8 · 跨平台 8。带房产中介深度的个人理财。优点：互动高，数字透明，日更；缺点：广告口播无处不在，'冰咖啡'梗；受众：22-40 岁投资者。",g:"🇺🇸",pn:"Business & Finance",pz:"商业财经"},
  {n:"Codie Sanchez",z:"Codie Sanchez",a:"Contrarian Thinking",az:"Contrarian Thinking",f:"Boring businesses · acquisitions",fz:"无聊生意 · 收购",h:78,c:1500000,p:90,w:"Quality 9·Frequency 8·Commercial 9·Cross-platform 8. Buying boring businesses meta-influencer. Strengths: distinctive thesis, newsletter, holding company. Weaknesses: course-pushing critique. Audience: 25-45 aspiring acquirers.",wz:"质量 9 · 频率 8 · 商业化 9 · 跨平台 8。'收购无聊生意'流派意见领袖。优点：观点鲜明，含 newsletter，控股公司；缺点：课程推销批评；受众：25-45 岁有志收购者。",g:"🇺🇸",pn:"Business & Finance",pz:"商业财经"},

  // === NEWS / COMMENTARY (PODCAST) ===
  {n:"Joe Rogan",z:"乔·罗根",a:"Spotify · The Joe Rogan Experience",az:"Spotify · 乔·罗根经验",f:"Long-form interviews · podcast",fz:"长访谈 · 播客",h:90,c:18000000,p:88,w:"Quality 9·Frequency 9·Commercial 10·Cross-platform 9. Defining podcaster of the era. Strengths: 3-hour interview format set the genre, Spotify exclusive ($200M+ deal). Weaknesses: regular controversies, unfiltered guests. Audience: 22-55 M.",wz:"质量 9 · 频率 9 · 商业化 10 · 跨平台 9。时代级播客标杆。优点：3 小时访谈格式定义了播客类型，Spotify 独家 ($2 亿+合同)；缺点：争议频发，嘉宾未审；受众：22-55 岁男性。",g:"🇺🇸",pn:"News & Commentary",pz:"新闻评论"},
  {n:"Lex Fridman",z:"莱克斯·弗里德曼",a:"Independent",az:"独立",f:"Long interviews · AI · science",fz:"长访谈 · AI · 科学",h:82,c:5000000,p:85,w:"Quality 9·Frequency 6·Commercial 8·Cross-platform 7. The polite-Russian-MIT-guy podcast. Strengths: gets unusual guests (Musk, Putin, Altman, scientists), serious questions. Weaknesses: monotone style polarises, sometimes too credulous. Audience: 22-45 thoughtful tech.",wz:"质量 9 · 频率 6 · 商业化 8 · 跨平台 7。'温和俄裔 MIT 男'式播客。优点：嘉宾稀有 (马斯克、普京、Altman、科学家)，问题严肃；缺点：单调风格评价两极，偶显轻信；受众：22-45 岁思考型科技人。",g:"🇺🇸",pn:"News & Commentary",pz:"新闻评论"},
  {n:"Jordan Peterson",z:"乔丹·彼得森",a:"Independent / Daily Wire",az:"独立 / Daily Wire",f:"Psychology · culture · religion",fz:"心理学 · 文化 · 宗教",h:74,c:9000000,p:80,w:"Quality 8·Frequency 7·Commercial 9·Cross-platform 8. Polarising clinical psychologist. Strengths: meaningful audience reach, books bestseller. Weaknesses: extremely controversial, health setbacks. Audience: 18-50 M.",wz:"质量 8 · 频率 7 · 商业化 9 · 跨平台 8。极具争议的临床心理学家。优点：受众触达有深度，著作畅销；缺点：争议性极强，健康问题；受众：18-50 岁男性。",g:"🇨🇦",pn:"News & Commentary",pz:"新闻评论"},

  // === CHINESE / ASIAN CREATORS ===
  {n:"Li Ziqi",z:"李子柒",a:"Independent",az:"独立",f:"Rural Chinese cooking · slow cinema",fz:"乡村中国烹饪 · 慢电影",h:91,c:21000000,p:100,w:"Quality 10·Frequency 5·Commercial 10·Cross-platform 9. Most-watched Chinese creator on YouTube. Strengths: globally recognised, returned in late 2024 after lawsuit, cinematic quality. Weaknesses: extremely low frequency, scripted authenticity debate. Audience: 18-55 global lifestyle.",wz:"质量 10 · 频率 5 · 商业化 10 · 跨平台 9。YouTube 上观看量最高的中国创作者。优点：全球认知度高，2024 末打赢官司复出，电影级画面；缺点：发布频率极低，剧本式'真实'争议；受众：18-55 岁全球生活方式。",g:"🇨🇳",pn:"Chinese & Asian",pz:"华人 / 亚洲"},
  {n:"Papi Sauce / Papi酱",z:"Papi 酱",a:"Independent",az:"独立",f:"Comedy monologue · short video",fz:"喜剧独白 · 短视频",h:74,c:30000000,p:75,w:"Quality 8·Frequency 7·Commercial 8·Cross-platform 7. Original Chinese internet celebrity (Weibo era). Strengths: defined a generation of Chinese short-video, Weibo+Bilibili+Douyin presence. Weaknesses: peak audience past, Mama era. Audience: 25-45 Chinese millennials.",wz:"质量 8 · 频率 7 · 商业化 8 · 跨平台 7。中国互联网网红初代 (微博时代)。优点：定义了一代中国短视频，全平台覆盖；缺点：受众见顶，'宝妈'时代；受众：25-45 岁中国千禧一代。",g:"🇨🇳",pn:"Chinese & Asian",pz:"华人 / 亚洲"},
  {n:"Karen X. Cheng",z:"郑学敏",a:"Independent",az:"独立",f:"AI · creative tech experiments",fz:"AI · 创意科技实验",h:78,c:2500000,p:90,w:"Quality 10·Frequency 8·Commercial 8·Cross-platform 9. AI-creative pioneer. Strengths: each post is a creative-tech tutorial, viral AI use cases, very high engagement. Weaknesses: niche audience. Audience: 22-45 designers/creators.",wz:"质量 10 · 频率 8 · 商业化 8 · 跨平台 9。AI 创意先锋。优点：每条贴都是创意科技教程，AI 用例屡屡刷屏，互动率极高；缺点：受众小众；受众：22-45 岁设计师/创作者。",g:"🇺🇸",pn:"Chinese & Asian",pz:"华人 / 亚洲"},
];

export const researchers: Researcher[] = _data.map((d, i) => ({
  id: i + 1,
  name_en: d.n, name_zh: d.z,
  affiliation_en: d.a, affiliation_zh: d.az,
  field_en: d.f, field_zh: d.fz,
  h_index: d.h, citations: d.c, papers: d.p,
  notable_work_en: d.w, notable_work_zh: d.wz,
  country: d.g,
  native_province_en: d.pn, native_province_zh: d.pz,
  homepage: d.hp,
}));

export type SortKey = "h_index" | "citations" | "papers";

export function sortResearchers(data: Researcher[], key: SortKey): Researcher[] {
  return [...data].sort((a, b) => (b[key] as number) - (a[key] as number));
}
