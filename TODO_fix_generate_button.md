# TODO_fix_generate_button.md

- [ ] Fix Generate Image handler in app/page.tsx so loading states reset via a single source of truth.
- [ ] Ensure finally block always clears: setIsGenerating(false), setGenerationStatus(""), setPuterLoading(false) if exists.
- [ ] In current code, ensure setLoading(false) and setGenerationStatus(null) happen for both Puter success and fallback success.
- [ ] Remove/avoid nested try/finally patterns that miss Puter success.
- [ ] Keep UI design unchanged.
- [ ] Verify Puter success path clears loading + generation status.
- [ ] Verify Puter failure -> fallback path clears loading + generation status.
- [ ] Verify both failure -> clears loading + generation status and shows error.
- [ ] Run `npm.cmd run lint` and `npx.cmd tsc --noEmit` and ensure 0 errors/warnings.

