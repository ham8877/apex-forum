// In-memory data store with seed content. Used when Supabase is not configured.
// Provides a fully functional demo backend for the Apex Forum community.

export type Role = "user" | "moderator" | "admin";
export type Badge = { id: string; name: string; icon: string; color: string };

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar: string;
  bio: string;
  reason?: string;
  joinDate: string;
  reputation: number;
  postCount: number;
  role: Role;
  banned: boolean;
  suspended: boolean;
  badges: Badge[];
  followers: string[];
  following: string[];
  bookmarks: string[];
  notifications: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  threadCount: number;
};

export type Thread = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  authorId: string;
  createdAt: string;
  views: number;
  likes: string[];
  dislikes: string[];
  pinned: boolean;
  locked: boolean;
};

export type Comment = {
  id: string;
  threadId: string;
  authorId: string;
  content: string;
  createdAt: string;
  likes: string[];
  dislikes: string[];
  parentId?: string;
};

export type Poll = {
  id: string;
  question: string;
  options: { id: string; text: string; votes: string[] }[];
  createdAt: string;
  endsAt: string;
};

export type Report = {
  id: string;
  reporterId: string;
  targetType: "thread" | "comment" | "user";
  targetId: string;
  reason: string;
  createdAt: string;
  resolved: boolean;
};

export type Message = {
  id: string;
  fromId: string;
  toId: string;
  content: string;
  createdAt: string;
  read: boolean;
};

export type Notification = {
  id: string;
  userId: string;
  type: string;
  text: string;
  link: string;
  createdAt: string;
  read: boolean;
};

type Store = {
  users: User[];
  categories: Category[];
  threads: Thread[];
  comments: Comment[];
  polls: Poll[];
  reports: Report[];
  messages: Message[];
  notifications: Notification[];
};

const g = globalThis as unknown as { __apexStore?: Store };
if (!g.__apexStore) g.__apexStore = createSeed();
const store = g.__apexStore;

function createSeed(): Store {
  const now = Date.now();
  const days = (d: number) => new Date(now - d * 86400000).toISOString();

  const badges: Badge[] = [
    { id: "founder", name: "Founder", icon: "Crown", color: "#f59e0b" },
    { id: "veteran", name: "Veteran", icon: "Shield", color: "#3b82f6" },
    { id: "top", name: "Top Contributor", icon: "Star", color: "#dc2626" },
  ];

  const users: User[] = [
    {
      id: "u1", username: "ApexAdmin", email: "admin@apex.gg", password: "admin123",
      avatar: "",
      bio: "Founder of Apex Forum. Building the ultimate self-improvement community.",
      joinDate: days(400), reputation: 9850, postCount: 312, role: "admin",
      banned: false, suspended: false, badges: [badges[0], badges[2]],
      followers: ["u2", "u3", "u4"], following: ["u2"], bookmarks: [], notifications: 3,
    },
    {
      id: "u2", username: "IronWill", email: "ironwill@ascend.gg", password: "password",
      avatar: "",
      bio: "Lifting since 2018. Natty or not, just consistent.",
      joinDate: days(280), reputation: 4210, postCount: 156, role: "moderator",
      banned: false, suspended: false, badges: [badges[1]],
      followers: ["u1", "u3"], following: ["u1", "u3"], bookmarks: [], notifications: 1,
    },
    {
      id: "u3", username: "StyleSage", email: "style@ascend.gg", password: "password",
      avatar: "",
      bio: "Men's fashion consultant. Fit is king.",
      joinDate: days(200), reputation: 3180, postCount: 98, role: "user",
      banned: false, suspended: false, badges: [badges[2]],
      followers: ["u2"], following: ["u1"], bookmarks: [], notifications: 0,
    },
    {
      id: "u4", username: "GlowUp", email: "glow@ascend.gg", password: "password",
      avatar: "",
      bio: "Skincare nerd. Retinol changed my life.",
      joinDate: days(150), reputation: 2450, postCount: 74, role: "user",
      banned: false, suspended: false, badges: [],
      followers: [], following: ["u3"], bookmarks: [], notifications: 0,
    },
    {
      id: "u5", username: "HairlineHero", email: "hair@ascend.gg", password: "password",
      avatar: "",
      bio: "Hair loss is not a death sentence.",
      joinDate: days(120), reputation: 1890, postCount: 61, role: "user",
      banned: false, suspended: false, badges: [],
      followers: [], following: [], bookmarks: [], notifications: 0,
    },
    {
      id: "u6", username: "MindsetMax", email: "mind@ascend.gg", password: "password",
      avatar: "",
      bio: "Discipline > motivation.",
      joinDate: days(90), reputation: 1560, postCount: 45, role: "user",
      banned: false, suspended: false, badges: [],
      followers: [], following: [], bookmarks: [], notifications: 0,
    },
  ];

  const categories: Category[] = [
    { id: "c1", name: "General Discussion", slug: "general", description: "Talk about anything and everything.", icon: "MessageSquare", color: "#737373", threadCount: 0 },
    { id: "c2", name: "Fitness & Wellness", slug: "fitness", description: "Training, nutrition, recovery.", icon: "Dumbbell", color: "#737373", threadCount: 0 },
    { id: "c3", name: "Fashion & Style", slug: "fashion", description: "Outfits, fits, and aesthetics.", icon: "Shirt", color: "#737373", threadCount: 0 },
    { id: "c4", name: "Grooming & Skincare", slug: "grooming", description: "Routines, products, and glow-ups.", icon: "Sparkles", color: "#737373", threadCount: 0 },
    { id: "c5", name: "Hair & Hairstyles", slug: "hair", description: "Cuts, care, and hair loss.", icon: "Scissors", color: "#737373", threadCount: 0 },
    { id: "c6", name: "Self Improvement", slug: "self-improvement", description: "Mindset, habits, discipline.", icon: "TrendingUp", color: "#737373", threadCount: 0 },
    { id: "c7", name: "Lifestyle", slug: "lifestyle", description: "Daily life, routines, productivity.", icon: "Coffee", color: "#737373", threadCount: 0 },
    { id: "c8", name: "Off Topic", slug: "off-topic", description: "Anything goes.", icon: "Hash", color: "#737373", threadCount: 0 },
  ];

  const threads: Thread[] = [
    { id: "t1", title: "My 6-month transformation (pics inside)", content: "Started at 210lbs, now at 175. Lifts went up, confidence went up. Here's what I did differently: tracked calories, slept 8hrs, lifted 4x/week. Happy to answer questions.", categoryId: "c2", authorId: "u4", createdAt: days(2), views: 1842, likes: ["u1","u2","u3","u5","u6"], dislikes: [], pinned: false, locked: false },
    { id: "t2", title: "Best budget skincare routine for beginners?", content: "I'm 19, oily skin, never used anything. What's the minimal effective routine? Cleanser + moisturizer + SPF?", categoryId: "c4", authorId: "u6", createdAt: days(1), views: 967, likes: ["u4","u2"], dislikes: [], pinned: false, locked: false },
    { id: "t3", title: "Suit fit guide — the 5 rules every man should know", content: "Shoulders, chest, waist, sleeve, trouser break. If you nail these, you'll look better than 90% of guys.", categoryId: "c3", authorId: "u3", createdAt: days(3), views: 2310, likes: ["u1","u2","u4","u5","u6"], dislikes: [], pinned: true, locked: false },
    { id: "t4", title: "Finasteride experiences — 1 year update", content: "No major sides, hair thickened noticeably. Bloodwork fine. Would recommend consulting a derm first.", categoryId: "c5", authorId: "u5", createdAt: days(5), views: 1520, likes: ["u1","u2"], dislikes: ["u3"], pinned: false, locked: false },
    { id: "t5", title: "How to build a morning routine that actually sticks", content: "Start tiny. 5 minutes. Stack habits. Don't try to overhaul everything day 1.", categoryId: "c6", authorId: "u2", createdAt: days(4), views: 1205, likes: ["u1","u3","u4","u6"], dislikes: [], pinned: false, locked: false },
    { id: "t6", title: "What's your go-to casual outfit for 2026?", content: "Looking for inspiration. Currently rotating overshirt + tee + straight jeans + clean sneakers.", categoryId: "c3", authorId: "u4", createdAt: days(0.5), views: 412, likes: ["u3"], dislikes: [], pinned: false, locked: false },
    { id: "t7", title: "Welcome to Apex Forum — read this first", content: "Rules: be respectful, no doxxing, no illegal content, contribute value. Introduce yourself below!", categoryId: "c1", authorId: "u1", createdAt: days(30), views: 5400, likes: ["u2","u3","u4","u5","u6"], dislikes: [], pinned: true, locked: false },
    { id: "t8", title: "Cold showers: placebo or real?", content: "I've been doing 2 min cold at end of shower for 30 days. Feel more alert. Science?", categoryId: "c7", authorId: "u6", createdAt: days(6), views: 680, likes: ["u2","u5"], dislikes: ["u4"], pinned: false, locked: false },
    { id: "t9", title: "Protein intake: 0.8 or 1g per lb?", content: "Debating with a friend. What does the evidence actually say for lifters?", categoryId: "c2", authorId: "u3", createdAt: days(7), views: 890, likes: ["u1","u2","u5"], dislikes: [], pinned: false, locked: false },
    { id: "t10", title: "Off-topic: what are you watching lately?", content: "Just finished a great series. Drop recommendations.", categoryId: "c8", authorId: "u2", createdAt: days(1.5), views: 320, likes: ["u4","u6"], dislikes: [], pinned: false, locked: false },
  ];

  const comments: Comment[] = [
    { id: "cm1", threadId: "t7", authorId: "u2", content: "Welcome everyone! Glad to be here. IronWill checking in.", createdAt: days(29), likes: ["u1","u3"], dislikes: [] },
    { id: "cm2", threadId: "t7", authorId: "u3", content: "StyleSage here. Looking forward to great discussions.", createdAt: days(29), likes: ["u1"], dislikes: [] },
    { id: "cm3", threadId: "t1", authorId: "u2", content: "Incredible progress. What was your starting bench?", createdAt: days(2), likes: ["u4"], dislikes: [] },
    { id: "cm4", threadId: "t1", authorId: "u4", content: "Started at 135x5, now 225x5. Consistency is everything.", createdAt: days(2), likes: ["u2","u1"], dislikes: [] },
    { id: "cm5", threadId: "t3", authorId: "u4", content: "The shoulder rule is underrated. Most guys buy too big.", createdAt: days(3), likes: ["u3","u1"], dislikes: [] },
    { id: "cm6", threadId: "t2", authorId: "u4", content: "Cleanser + moisturizer + SPF is perfect start. Add a retinoid later.", createdAt: days(1), likes: ["u6"], dislikes: [] },
  ];

  const polls: Poll[] = [
    { id: "p1", question: "What's your primary focus this month?", options: [
      { id: "o1", text: "Building muscle", votes: ["u2","u5"] },
      { id: "o2", text: "Losing fat", votes: ["u4","u6"] },
      { id: "o3", text: "Style upgrade", votes: ["u3"] },
      { id: "o4", text: "Skincare routine", votes: [] },
    ], createdAt: days(0), endsAt: days(-7) },
  ];

  const reports: Report[] = [];
  const messages: Message[] = [
    { id: "m1", fromId: "u3", toId: "u1", content: "Hey, can we pin the suit guide thread?", createdAt: days(1), read: false },
  ];
  const notifications: Notification[] = [
    { id: "n1", userId: "u1", type: "reply", text: "IronWill replied to your thread", link: "/thread/t7", createdAt: days(0.1), read: false },
    { id: "n2", userId: "u1", type: "like", text: "StyleSage liked your post", link: "/thread/t3", createdAt: days(0.5), read: false },
    { id: "n3", userId: "u1", type: "follow", text: "GlowUp started following you", link: "/profile/GlowUp", createdAt: days(1), read: true },
  ];

  // thread counts
  for (const c of categories) c.threadCount = threads.filter(t => t.categoryId === c.id).length;

  return { users, categories, threads, comments, polls, reports, messages, notifications };
}

// ---------- Accessors ----------
export function getStore(): Store { return store; }
export function getUsers() { return store.users; }
export function getUserById(id: string) { return store.users.find(u => u.id === id); }
export function getUserByUsername(username: string) { return store.users.find(u => u.username.toLowerCase() === username.toLowerCase()); }
export function getUserByEmail(email: string) { return store.users.find(u => u.email.toLowerCase() === email.toLowerCase()); }

export function getCategories() { return store.categories; }
export function getCategoryBySlug(slug: string) { return store.categories.find(c => c.slug === slug); }
export function getCategoryById(id: string) { return store.categories.find(c => c.id === id); }

export function getThreads(opts?: { categoryId?: string; sort?: string; q?: string }) {
  let list = [...store.threads];
  if (opts?.categoryId) list = list.filter(t => t.categoryId === opts.categoryId);
  if (opts?.q) {
    const q = opts.q.toLowerCase();
    list = list.filter(t => t.title.toLowerCase().includes(q) || t.content.toLowerCase().includes(q));
  }
  const sort = opts?.sort || "newest";
  if (sort === "newest") list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  if (sort === "popular") list.sort((a, b) => (b.likes.length - b.dislikes.length) - (a.likes.length - a.dislikes.length));
  if (sort === "trending") list.sort((a, b) => (b.views + b.likes.length * 5) - (a.views + a.likes.length * 5));
  // pinned first
  list.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  return list;
}

export function getThreadById(id: string) { return store.threads.find(t => t.id === id); }
export function getCommentsByThread(threadId: string) { return store.comments.filter(c => c.threadId === threadId).sort((a,b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); }
export function getAllComments() { return [...store.comments].sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); }

export function getPolls() { return store.polls; }
export function getPollById(id: string) { return store.polls.find(p => p.id === id); }

export function getReports() { return store.reports; }
export function getMessagesFor(userId: string) { return store.messages.filter(m => m.fromId === userId || m.toId === userId); }
export function getNotificationsFor(userId: string) { return store.notifications.filter(n => n.userId === userId).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); }

// ---------- Mutations ----------
function uid(prefix = "id") { return prefix + Math.random().toString(36).slice(2, 10); }

export function createUser(data: { username: string; email: string; password: string; reason?: string }): User {
  const user: User = {
    id: uid("u"), username: data.username, email: data.email, password: data.password,
    avatar: "",
    bio: "", reason: data.reason || "", joinDate: new Date().toISOString(), reputation: 0, postCount: 0, role: "user",
    banned: false, suspended: false, badges: [], followers: [], following: [], bookmarks: [], notifications: 0,
  };
  store.users.push(user);
  return user;
}

export function authenticate(email: string, password: string): User | null {
  const u = getUserByEmail(email);
  if (!u) return null;
  if (u.password !== password) return null;
  if (u.banned || u.suspended) return null;
  return u;
}

export function createThread(data: { title: string; content: string; categoryId: string; authorId: string }): Thread {
  const t: Thread = {
    id: uid("t"), title: data.title, content: data.content, categoryId: data.categoryId,
    authorId: data.authorId, createdAt: new Date().toISOString(), views: 0,
    likes: [], dislikes: [], pinned: false, locked: false,
  };
  store.threads.unshift(t);
  const u = getUserById(data.authorId); if (u) u.postCount += 1;
  const c = getCategoryById(data.categoryId); if (c) c.threadCount += 1;
  return t;
}

export function createComment(data: { threadId: string; authorId: string; content: string; parentId?: string }): Comment {
  const c: Comment = {
    id: uid("cm"), threadId: data.threadId, authorId: data.authorId, content: data.content,
    createdAt: new Date().toISOString(), likes: [], dislikes: [], parentId: data.parentId,
  };
  store.comments.push(c);
  const u = getUserById(data.authorId); if (u) u.postCount += 1;
  return c;
}

export function toggleLike(target: "thread" | "comment", id: string, userId: string, kind: "like" | "dislike") {
  const arr = target === "thread" ? store.threads : store.comments;
  const item = (arr as any[]).find(x => x.id === id);
  if (!item) return null;
  const likeArr: string[] = item.likes;
  const dislikeArr: string[] = item.dislikes;
  if (kind === "like") {
    if (likeArr.includes(userId)) likeArr.splice(likeArr.indexOf(userId), 1);
    else { likeArr.push(userId); const i = dislikeArr.indexOf(userId); if (i >= 0) dislikeArr.splice(i, 1); }
  } else {
    if (dislikeArr.includes(userId)) dislikeArr.splice(dislikeArr.indexOf(userId), 1);
    else { dislikeArr.push(userId); const i = likeArr.indexOf(userId); if (i >= 0) likeArr.splice(i, 1); }
  }
  return item;
}

export function incrementViews(threadId: string) {
  const t = getThreadById(threadId); if (t) t.views += 1;
}

export function updateUser(id: string, patch: Partial<User>) {
  const u = getUserById(id); if (!u) return null;
  Object.assign(u, patch);
  return u;
}

export function createReport(data: { reporterId: string; targetType: Report["targetType"]; targetId: string; reason: string }) {
  const r: Report = { id: uid("r"), ...data, createdAt: new Date().toISOString(), resolved: false };
  store.reports.push(r);
  return r;
}

export function resolveReport(id: string) { const r = store.reports.find(x => x.id === id); if (r) r.resolved = true; }

export function deleteThread(id: string) {
  const idx = store.threads.findIndex(t => t.id === id);
  if (idx >= 0) store.threads.splice(idx, 1);
  store.comments = store.comments.filter(c => c.threadId !== id);
}

export function deleteComment(id: string) {
  const idx = store.comments.findIndex(c => c.id === id);
  if (idx >= 0) store.comments.splice(idx, 1);
}

export function banUser(id: string, banned: boolean) { const u = getUserById(id); if (u) u.banned = banned; }
export function suspendUser(id: string, suspended: boolean) { const u = getUserById(id); if (u) u.suspended = suspended; }
export function deleteUser(id: string) {
  const idx = store.users.findIndex(u => u.id === id);
  if (idx >= 0) store.users.splice(idx, 1);
  // remove their content
  store.threads = store.threads.filter(t => t.authorId !== id);
  store.comments = store.comments.filter(c => c.authorId !== id);
}

export function toggleBookmark(userId: string, threadId: string) {
  const u = getUserById(userId); if (!u) return;
  const i = u.bookmarks.indexOf(threadId);
  if (i >= 0) u.bookmarks.splice(i, 1); else u.bookmarks.push(threadId);
}

export function toggleFollow(followerId: string, targetId: string) {
  const f = getUserById(followerId); const t = getUserById(targetId);
  if (!f || !t) return;
  const i = f.following.indexOf(targetId);
  if (i >= 0) { f.following.splice(i, 1); const j = t.followers.indexOf(followerId); if (j >= 0) t.followers.splice(j, 1); }
  else { f.following.push(targetId); t.followers.push(followerId); }
}

export function votePoll(pollId: string, optionId: string, userId: string) {
  const p = getPollById(pollId); if (!p) return;
  // remove previous vote
  for (const o of p.options) { const i = o.votes.indexOf(userId); if (i >= 0) o.votes.splice(i, 1); }
  const opt = p.options.find(o => o.id === optionId);
  if (opt) opt.votes.push(userId);
}

export function createMessage(fromId: string, toId: string, content: string) {
  const m: Message = { id: uid("msg"), fromId, toId, content, createdAt: new Date().toISOString(), read: false };
  store.messages.push(m);
  return m;
}

export function markMessageRead(id: string) { const m = store.messages.find(x => x.id === id); if (m) m.read = true; }

export function createNotification(userId: string, type: string, text: string, link: string) {
  const n: Notification = { id: uid("n"), userId, type, text, link, createdAt: new Date().toISOString(), read: false };
  store.notifications.push(n);
  const u = getUserById(userId); if (u) u.notifications += 1;
}

export function markNotificationsRead(userId: string) {
  store.notifications.filter(n => n.userId === userId).forEach(n => n.read = true);
  const u = getUserById(userId); if (u) u.notifications = 0;
}

export function searchAll(q: string) {
  const ql = q.toLowerCase();
  const threads = store.threads.filter(t => t.title.toLowerCase().includes(ql) || t.content.toLowerCase().includes(ql));
  const users = store.users.filter(u => u.username.toLowerCase().includes(ql));
  return { threads, users };
}

export function getOnlineCount() { return Math.floor(store.users.length * 0.4) + 2; }
export function getFeaturedMembers() { return [...store.users].sort((a,b) => b.reputation - a.reputation).slice(0, 5); }
export function getTrendingThreads() { return getThreads({ sort: "trending" }).slice(0, 5); }
export function getLatestThreads() { return getThreads({ sort: "newest" }).slice(0, 8); }
export function getTopContributors() { return [...store.users].sort((a,b) => b.postCount - a.postCount).slice(0, 5); }