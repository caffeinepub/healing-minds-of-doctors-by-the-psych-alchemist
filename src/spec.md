# Specification

## Summary
**Goal:** Allow Guided Meditation ambient sounds to play from full internet URLs as well as existing bundled local audio assets.

**Planned changes:**
- Update the Guided Meditation ambient sound selector/options to support entries that are full `https://` URLs in addition to existing local asset paths.
- Change Guided Meditation audio loading to use the selected option value directly as the audio source (local path or remote URL), including switching sources while already playing.
- Add clear, user-facing English error handling for remote audio load/play failures (no crash and no stuck “playing” state).
- Keep all other Guided Meditation behavior unchanged (timer, breathing visual, script, navigation) and do not change Enhanced Breathing background audio behavior.

**User-visible outcome:** In Guided Meditation, users can choose either a built-in ambient track or a remote `https://` audio URL and it will play immediately; switching sounds works during playback, and failures show a clear error without breaking the session.
