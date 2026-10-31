-- ASCEND community schema for Supabase
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  avatar_url text,
  bio text,
  reputation int default 0,
  post_count int default 0,
  role text default 'user',
  banned boolean default false,
  suspended boolean default false,
  created_at timestamptz default now()
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  color text,
  created_at timestamptz default now()
);

create table if not exists threads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  category_id uuid references categories(id) on delete cascade,
  author_id uuid references profiles(id) on delete cascade,
  views int default 0,
  pinned boolean default false,
  locked boolean default false,
  created_at timestamptz default now()
);

create table if not exists comments (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade,
  author_id uuid references profiles(id) on delete cascade,
  content text not null,
  parent_id uuid references comments(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  target_type text not null,
  target_id uuid not null,
  kind text not null check (kind in ('like','dislike')),
  unique (user_id, target_type, target_id)
);

create table if not exists follows (
  follower_id uuid references profiles(id) on delete cascade,
  following_id uuid references profiles(id) on delete cascade,
  primary key (follower_id, following_id)
);

create table if not exists bookmarks (
  user_id uuid references profiles(id) on delete cascade,
  thread_id uuid references threads(id) on delete cascade,
  primary key (user_id, thread_id)
);

create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  type text,
  text text,
  link text,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  from_id uuid references profiles(id) on delete cascade,
  to_id uuid references profiles(id) on delete cascade,
  content text not null,
  read boolean default false,
  created_at timestamptz default now()
);

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid references profiles(id) on delete cascade,
  target_type text,
  target_id uuid,
  reason text,
  resolved boolean default false,
  created_at timestamptz default now()
);

create table if not exists polls (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  created_at timestamptz default now(),
  ends_at timestamptz
);

create table if not exists poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid references polls(id) on delete cascade,
  text text not null
);

create table if not exists poll_votes (
  poll_id uuid references polls(id) on delete cascade,
  option_id uuid references poll_options(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  primary key (poll_id, user_id)
);

-- RLS
alter table profiles enable row level security;
alter table threads enable row level security;
alter table comments enable row level security;

create policy "profiles are viewable by everyone" on profiles for select using (true);
create policy "users can update own profile" on profiles for update using (auth.uid() = id);

create policy "threads are viewable by everyone" on threads for select using (true);
create policy "authenticated users can create threads" on threads for insert with check (auth.uid() = author_id);
create policy "authors can update own threads" on threads for update using (auth.uid() = author_id);

create policy "comments are viewable by everyone" on comments for select using (true);
create policy "authenticated users can create comments" on comments for insert with check (auth.uid() = author_id);