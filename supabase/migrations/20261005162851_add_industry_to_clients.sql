/*
# Add industry column to clients table

1. Changes
- Add `industry` column to the `clients` table (text, not null, defaults to 'dental').
  This allows the platform to serve any business type — dental, legal, medical, HVAC,
  plumbing, roofing, hotels, restaurants, real estate, SaaS, e-commerce, B2B, education,
  automotive, med spas, and more — with industry-specific query templates and competitors.
- The default 'dental' preserves existing rows.

2. Security
- No RLS policy changes. The existing owner-scoped policies on `clients` already cover
  the new column (UPDATE policy allows modifying all columns the role can update).
*/

ALTER TABLE clients ADD COLUMN IF NOT EXISTS industry text NOT NULL DEFAULT 'dental';
