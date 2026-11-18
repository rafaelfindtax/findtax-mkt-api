-- Up
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_provider_provider_status_enum') THEN
    CREATE TYPE app_provider_provider_status_enum AS ENUM ('ATIVO', 'INATIVO', 'PENDENTE', 'BLOQUEADO');
  END IF;
END $$;

ALTER TABLE public.app_provider
ADD COLUMN IF NOT EXISTS provider_status app_provider_provider_status_enum NOT NULL DEFAULT 'ATIVO';

-- Down
-- ALTER TABLE public.app_provider DROP COLUMN IF EXISTS provider_status;
-- DROP TYPE IF EXISTS app_provider_provider_status_enum;
