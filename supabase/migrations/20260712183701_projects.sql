-- supabase/migrations/<timestamp>_projects.sql

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  category text not null,
  summary text not null,
  problem text not null,
  solution text not null,
  features jsonb not null default '[]',
  challenges text not null,
  lessons text not null,
  tech_stack jsonb not null default '[]',
  github_url text,
  demo_url text,
  cover_image_url text,
  is_featured boolean not null default false,
  status text not null default 'published' check (status in ('draft', 'published')),
  sort_order int not null default 0,
  published_at timestamptz default now()
);

alter table projects enable row level security;

grant select on projects to anon, authenticated;

create policy "Anyone can read published projects"
  on projects
  for select
  to anon, authenticated
  using (status = 'published');

insert into projects (slug, title, category, summary, problem, solution, features, challenges, lessons, tech_stack, github_url, is_featured, sort_order) values
(
  'campus-collaboration-platform',
  'Campus Collaboration Platform',
  'mobile',
  'A Flutter platform that helps university students exchange skills, discover study groups, and collaborate academically.',
  'Students at AAU had no central place to find study groups or peers with complementary skills — coordination happened informally over scattered group chats.',
  'Built a five-person team project with feature-based Flutter architecture, JWT auth, and role-based access, giving students a structured way to post, discover, and join study groups.',
  '["Skill exchange listings", "Study group discovery", "Role-based access", "Full CRUD on group content"]',
  'Coordinating a five-person team around a shared Flutter codebase and agreeing on a feature-based folder structure that scaled as the app grew.',
  'Feature-based architecture pays off fast once more than one person is touching the codebase — file-type folders don''t scale past a solo project.',
  '["Flutter", "Dart", "Node.js", "JWT"]',
  'https://github.com/YordanosBisrat',
  true, 1
),
(
  'addisreview-v2',
  'AddisReview V2',
  'web',
  'A business discovery and review platform for Addis Ababa — search, rate, and review local businesses.',
  'Finding reliable reviews of local businesses in Addis Ababa is hard — most review platforms are built around markets that don''t reflect the local business landscape.',
  'A full-stack React/Vite + Node/Express/SQLite app with JWT auth, letting users search, rate, and review businesses across the city.',
  '["Business search", "Star ratings + written reviews", "JWT-authenticated accounts", "Responsive UI"]',
  'Designing a review moderation flow and a schema that could handle both business listings and nested review data cleanly in SQLite.',
  'Went through a senior-panel code review (6.5/10) that surfaced real gaps in error handling and query structure — invaluable for seeing how the code reads to someone else.',
  '["React", "Vite", "Node.js", "Express", "SQLite", "JWT"]',
  'https://github.com/YordanosBisrat',
  true, 2
),
(
  'minigit',
  'MiniGit',
  'systems',
  'A custom version control system inspired by Git, built from scratch in C++.',
  'Understanding how Git actually works under the hood — commits, trees, blobs — required building a simplified version rather than just reading about it.',
  'Implemented core Git primitives (object storage, commit history, basic diffing) in C++ using object-oriented design and direct file handling.',
  '["Object storage model", "Commit history tracking", "File diffing", "Custom CLI"]',
  'Designing the object storage layer to correctly track file states across commits without an existing library to lean on.',
  'Building a tool you use every day from scratch is the fastest way to actually understand it — abstractions stop being magic once you''ve implemented them.',
  '["C++", "Data Structures", "File I/O"]',
  'https://github.com/YordanosBisrat',
  true, 3
),
(
  'hierarchical-solar-system-simulator',
  'Hierarchical Solar System Simulator',
  'graphics',
  'An OpenGL-based solar system simulator demonstrating hierarchical transformations and animation.',
  'Computer graphics coursework required demonstrating a real understanding of hierarchical matrix transformations, not just using a library''s built-in scene graph.',
  'Built a solar system simulator in OpenGL/C++ with planets orbiting hierarchically around the sun, each with independent rotation and orbital speed.',
  '["Hierarchical transformation matrices", "Independent orbital + rotational animation", "Camera controls"]',
  'A rendering bug in the transformation hierarchy caused child bodies to inherit incorrect parent rotations — traced and fixed before submission.',
  'Matrix transformation order matters enormously in hierarchical scenes — getting parent-child transform composition right took real debugging, not guesswork.',
  '["OpenGL", "C++", "Linear Algebra"]',
  'https://github.com/YordanosBisrat',
  true, 4
),
(
  'blame-the-director',
  'Blame the Director',
  'mobile',
  'A movie review application built with Flutter using modern state management and API integration.',
  'Wanted hands-on practice with BLoC state management and Dio for real API integration, beyond what Provider-based coursework covered.',
  'A Flutter movie review app using BLoC for state management and Dio for networking against a movie API.',
  '["Movie search + details", "User reviews", "BLoC state management", "Dio-based API layer"]',
  'Migrating mental models from Provider (used in an earlier assignment) to BLoC''s stream-based architecture.',
  'BLoC''s separation of events and state makes testing and reasoning about complex screens much easier once the initial learning curve is past.',
  '["Flutter", "BLoC", "Dio", "REST APIs"]',
  'https://github.com/YordanosBisrat',
  true, 5
);