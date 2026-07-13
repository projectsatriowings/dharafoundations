-- ═══════════════════════════════════
-- DHARA FOUNDATIONS — FULL DATABASE SCHEMA
-- Run this entire script once against your Neon database
-- via the Neon SQL Editor or psql
-- ═══════════════════════════════════

-- ─────────────────────────────────
-- EXTENSIONS
-- ─────────────────────────────────
CREATE EXTENSION IF NOT EXISTS "pgcrypto"; -- for gen_random_uuid()

-- ─────────────────────────────────
-- ADMIN USERS
-- ─────────────────────────────────
CREATE TABLE admin_users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_login_at TIMESTAMPTZ
);

-- ─────────────────────────────────
-- EVENTS
-- ─────────────────────────────────
CREATE TABLE events (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                TEXT NOT NULL UNIQUE,
  title               TEXT NOT NULL,
  event_date          DATE NOT NULL,
  event_time          TIME NOT NULL,
  location_name       TEXT NOT NULL,
  latitude            NUMERIC(10, 7),
  longitude           NUMERIC(10, 7),
  cover_image_url     TEXT NOT NULL,
  short_description   TEXT,
  full_description    TEXT,
  category            TEXT,
  show_register_btn   BOOLEAN NOT NULL DEFAULT TRUE,
  cta_label           TEXT NOT NULL DEFAULT 'Register Yourself',
  enable_social_share BOOLEAN NOT NULL DEFAULT FALSE,
  twitter_share_url   TEXT,
  facebook_share_url  TEXT,
  pinterest_share_url TEXT,
  instagram_share_url TEXT,
  status              TEXT NOT NULL DEFAULT 'draft'
                        CHECK (status IN ('draft', 'published')),
  meta_title          TEXT,
  meta_description    TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT valid_latitude  CHECK (latitude  IS NULL OR (latitude  >= -90  AND latitude  <= 90)),
  CONSTRAINT valid_longitude CHECK (longitude IS NULL OR (longitude >= -180 AND longitude <= 180))
);

CREATE TABLE event_gallery_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url   TEXT NOT NULL,
  caption     TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_gallery_event_id ON event_gallery_images(event_id);

CREATE TABLE event_videos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id    UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  video_url   TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_event_videos_event_id ON event_videos(event_id);
CREATE INDEX idx_events_status_date ON events(status, event_date DESC);

-- ─────────────────────────────────
-- NEWS & MEDIA
-- ─────────────────────────────────
CREATE TABLE news_articles (
  id                 UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug               TEXT NOT NULL UNIQUE,
  headline           TEXT NOT NULL,
  publish_date       DATE NOT NULL,
  read_time_minutes  INTEGER,
  excerpt            TEXT,
  body_content       TEXT,
  featured_image_url TEXT NOT NULL,
  is_external        BOOLEAN NOT NULL DEFAULT FALSE,
  external_url       TEXT,
  tags               TEXT[],
  status             TEXT NOT NULL DEFAULT 'draft'
                       CHECK (status IN ('draft', 'published')),
  meta_title         TEXT,
  meta_description   TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_news_status_date ON news_articles(status, publish_date DESC);

-- ─────────────────────────────────
-- GALLERY
-- ─────────────────────────────────
CREATE TABLE gallery_photos (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url   TEXT NOT NULL,
  caption     TEXT NOT NULL,
  category    TEXT NOT NULL
                CHECK (category IN (
                  'temple_heritage',
                  'community_welfare',
                  'events',
                  'women_empowerment',
                  'children_programs',
                  'other'
                )),
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_gallery_category ON gallery_photos(category);
CREATE INDEX idx_gallery_featured ON gallery_photos(is_featured);

-- ─────────────────────────────────
-- PROGRAMS & INITIATIVES
-- ─────────────────────────────────
CREATE TABLE programs (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title             TEXT NOT NULL,
  category          TEXT NOT NULL
                      CHECK (category IN ('temple_dharma', 'community_welfare')),
  icon_name         TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description  TEXT,
  display_order     INTEGER NOT NULL DEFAULT 0,
  status            TEXT NOT NULL DEFAULT 'draft'
                      CHECK (status IN ('draft', 'published')),
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────
-- FOUNDERS
-- ─────────────────────────────────
CREATE TABLE founders (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name     TEXT NOT NULL,
  designation   TEXT NOT NULL,
  short_bio     TEXT NOT NULL,
  full_bio      TEXT,
  photo_url     TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────
-- HERO SLIDES
-- ─────────────────────────────────
CREATE TABLE hero_slides (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_image_url TEXT NOT NULL,
  badge_text           TEXT,
  heading_line_1       TEXT NOT NULL,
  heading_line_2       TEXT,
  ghost_text           TEXT,
  status               TEXT NOT NULL DEFAULT 'active'
                         CHECK (status IN ('active', 'hidden')),
  sort_order           INTEGER NOT NULL DEFAULT 0,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────
-- HERO PREVIEW CARD IMAGES
-- ─────────────────────────────────
CREATE TABLE hero_preview_images (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url   TEXT NOT NULL,
  caption     TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────
-- HOMEPAGE STATS
-- ─────────────────────────────────
CREATE TABLE homepage_stats (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_value  TEXT NOT NULL,
  stat_label  TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

INSERT INTO homepage_stats (stat_value, stat_label, sort_order) VALUES
  ('25+',  'Years of Seva',     0),
  ('10k+', 'Beneficiaries',     1),
  ('50+',  'Temples Restored',  2);

-- ─────────────────────────────────
-- HOMEPAGE INTERACTIVE GALLERY
-- ─────────────────────────────────
CREATE TABLE homepage_interactive_gallery (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url   TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO homepage_interactive_gallery (title, description, image_url, sort_order) VALUES
  ('Spiritualism', 'Ceremony with spiritual leaders in saffron robes', '/images/gallery-1.png', 0),
  ('Temple Restoration', 'Traditional prayers & architectural renovation', '/images/gallery-2.png', 1),
  ('Community Welfare', 'Festive temple processions & rural support', '/images/gallery-3.png', 2),
  ('Sacred Heritage', 'Sacred ash and rudraksha devotional offerings', '/images/about.png', 3),
  ('Vedic Traditions', 'Timeless rituals preserving ancient wisdom', 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80', 4);

-- ─────────────────────────────────
-- SPONSOR TIERS
-- ─────────────────────────────────
CREATE TABLE sponsor_tiers (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_name      TEXT NOT NULL,
  price_label    TEXT NOT NULL,
  benefits       TEXT[] NOT NULL,
  is_highlighted BOOLEAN NOT NULL DEFAULT FALSE,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─────────────────────────────────
-- SITE SETTINGS (singleton)
-- ─────────────────────────────────
CREATE TABLE site_settings (
  id                    INTEGER PRIMARY KEY DEFAULT 1,
  phone                 TEXT NOT NULL DEFAULT '044-22236641',
  email_info            TEXT NOT NULL DEFAULT 'info@dharafoundations.in',
  email_president       TEXT NOT NULL DEFAULT 'president@dharafoundations.in',
  email_trustee         TEXT NOT NULL DEFAULT 'trustee@dharafoundations.in',
  email_general         TEXT NOT NULL DEFAULT 'dharafoundationsindia@gmail.com',
  address               TEXT NOT NULL DEFAULT 'No 44A, 3rd Street, Judge Colony, Tambaram Sanatorium, Chennai, Tamil Nadu - 600047',
  twitter_url           TEXT,
  facebook_url          TEXT,
  instagram_url         TEXT,
  youtube_url           TEXT,
  meta_title_suffix     TEXT NOT NULL DEFAULT '| Dhara Foundations',
  default_meta_desc     TEXT,
  maintenance_mode      BOOLEAN NOT NULL DEFAULT FALSE,
  hero_image_url        TEXT,
  intro_video_1_url     TEXT,
  intro_video_2_url     TEXT,
  updated_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  CONSTRAINT singleton CHECK (id = 1)
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT DO NOTHING;

-- ─────────────────────────────────
-- FORM SUBMISSIONS — CONTACT
-- ─────────────────────────────────
CREATE TABLE contact_submissions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  subject      TEXT NOT NULL,
  message      TEXT NOT NULL,
  status       TEXT NOT NULL DEFAULT 'new'
                 CHECK (status IN ('new', 'read', 'replied')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_submissions(status);
CREATE INDEX idx_contact_submitted ON contact_submissions(submitted_at DESC);

-- ─────────────────────────────────
-- FORM SUBMISSIONS — EVENT REGISTRATION
-- ─────────────────────────────────
CREATE TABLE event_registrations (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name      TEXT NOT NULL,
  email          TEXT NOT NULL,
  phone          TEXT NOT NULL,
  event_name     TEXT NOT NULL,
  event_id       UUID REFERENCES events(id) ON DELETE SET NULL,
  attendee_count INTEGER NOT NULL DEFAULT 1,
  message        TEXT,
  status         TEXT NOT NULL DEFAULT 'new'
                   CHECK (status IN ('new', 'read', 'confirmed', 'cancelled')),
  submitted_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_registrations_event_id ON event_registrations(event_id);
CREATE INDEX idx_registrations_status ON event_registrations(status);
CREATE INDEX idx_registrations_submitted ON event_registrations(submitted_at DESC);

-- ─────────────────────────────────
-- FORM SUBMISSIONS — SPONSOR ENQUIRY
-- ─────────────────────────────────
CREATE TABLE sponsor_enquiries (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_name      TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  tier_interest TEXT,
  message       TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'new'
                  CHECK (status IN ('new', 'in_discussion', 'confirmed', 'declined')),
  submitted_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sponsor_status ON sponsor_enquiries(status);
CREATE INDEX idx_sponsor_submitted ON sponsor_enquiries(submitted_at DESC);

-- ─────────────────────────────────
-- ACTIVITY LOG (for dashboard recent activity feed)
-- ─────────────────────────────────
CREATE TABLE activity_log (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action      TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_title TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_activity_created ON activity_log(created_at DESC);

-- ─────────────────────────────────
-- UPDATED_AT AUTO-TRIGGER
-- ─────────────────────────────────
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_news_updated_at
  BEFORE UPDATE ON news_articles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_programs_updated_at
  BEFORE UPDATE ON programs
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_founders_updated_at
  BEFORE UPDATE ON founders
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();
