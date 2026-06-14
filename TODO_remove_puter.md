# TODO_remove_puter.md

- [ ] Remove all Puter UI + state + helpers from app/page.tsx
  - [ ] Delete Puter model selector section and puter-specific labels
  - [ ] Delete PuterModule, getPuterModel(), extractImageUrl usage if only for Puter (keep if used elsewhere)
  - [ ] Replace Generate Image handler to call only /api/generate
  - [ ] Ensure loading/generation status resets in finally
  - [ ] Remove Puter-specific fallback logic and logs
- [ ] Uninstall @heyputer/puter.js from package.json / package-lock.json
- [ ] Run
  - [ ] npm.cmd run lint
  - [ ] npx.cmd tsc --noEmit
- [ ] Verify app/page.tsx has no Puter references

