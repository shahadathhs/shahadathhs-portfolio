/** Pinned repos shown in the Projects deck (one per slide). */
export const PINNED_REPOS = ['adda', 'voice-to-text', 'systemix'] as const;

/** Curated highlights per project — shown as bullets on the project card. */
export const projectHighlights: Record<string, string[]> = {
  adda: [
    'Full-stack monorepo — FastAPI backend, React 19 + TypeScript frontend, mediamtx streaming server, single Docker Compose deploy',
    'Live streaming pipeline: RTMP ingest → HLS playback with per-community stream keys, publish-auth webhooks, and auto-recordings',
    'Real-time layer — WebSocket gateway with typed protocol, Redis pub/sub fan-out for multi-instance scaling, and presence tracking',
    'Complete auth suite: JWT, Google OAuth, passwordless OTP login (Redis-backed), 2FA, and RBAC roles',
  ],
  'voice-to-text': [
    'AI transcription service built on OpenAI Whisper — usable as a CLI tool or a FastAPI REST server',
    'Speaker diarization (SpeechBrain embeddings) labels who spoke what; non-English audio translates to English',
    'Fully local — audio never leaves the machine; pluggable Whisper backends (OpenAI or Hugging Face)',
    'One-command Docker deployment, Pydantic v2 validation, Ruff/MyPy/Bandit quality gates with CI',
  ],
  systemix: [
    'A "standard library" for modern Node.js — 7 packages published to npm and GitHub Packages',
    'Cryptographically secure generators: passwords with character guarantees, passphrases, and signed tokens (hex/base64) built on Node crypto',
    'Typed env loading and validation, shareable ESLint 10 flat configs, TypeScript bases, and a minimal test runner',
    'Turborepo + pnpm monorepo, tsup bundling, full type safety — built for both small projects and large monorepos',
  ],
};
