
# Security Review - IBRP Project

## Summary

The project is a marketing website with lead capture forms. The security scan identified **6 findings** (2 critical, 4 warnings). Here's a comprehensive analysis:

---

## Critical Issues (Require Immediate Action)

### 1. Lead Tables Are Publicly Readable (CRITICAL)
**Risk**: Anyone can query and extract all lead data (names, emails, company info) via the Supabase API.

| Table | Exposed Data |
|-------|-------------|
| `newsletter_leads` | name, email, profile |
| `contato_empresas_leads` | name, email, company, job title, message |
| `curso_gestao_leads` | name, email |
| `curso_pics_leads` | name, email |

**Fix**: Add RESTRICTIVE SELECT policies that deny all reads, or restrict to authenticated admin roles only.

### 2. INSERT Policies Are Misconfigured (CRITICAL)
**Risk**: Form submissions are being blocked. The policies are defined as `RESTRICTIVE` instead of `PERMISSIVE`.

**Evidence**: All policies show "Permissive: No" in the schema.

**Fix**: Recreate INSERT policies as PERMISSIVE type.

---

## Moderate Issues

### 3. Input Validation - No Length Limits
**Files**: `NewsletterSignup.tsx`, `ContatoSection.tsx`, `CursoGestaoRiscos.tsx`, `CursoTerapeutasPICS.tsx`

**Current state**:
- Only `mensagem` field has `maxLength={1000}`
- Email/name fields have no client-side length limits
- No Zod schema validation

**Recommendation**: Add `maxLength` attributes and Zod validation for all inputs.

### 4. XSS Risk - dangerouslySetInnerHTML
**File**: `BlogArticle.tsx` (line 214)

```tsx
<div dangerouslySetInnerHTML={{ __html: article.body }} />
```

**Risk**: If Sanity CMS is compromised or allows user input, malicious scripts could execute.

**Mitigation**: The content comes from a controlled CMS (Sanity), but consider adding DOMPurify sanitization for defense-in-depth.

---

## Low/Informational Issues

### 5. Session Storage for Access Control
**Files**: `CursoGestaoRiscos.tsx`, `CursoTerapeutasPICS.tsx`, `AulaExperimentalPICS.tsx`

```tsx
sessionStorage.setItem("aula-experimental-pics-access", "true");
```

**Context**: This gates access to a promotional video page. Since the video is publicly available on YouTube and there's no sensitive content, this is acceptable for its purpose (encouraging form completion).

### 6. External Links Have Proper Attributes
All external links correctly use `rel="noopener noreferrer"` and `target="_blank"`.

### 7. Supabase Keys
The anon key is appropriately public (designed for client-side use). No service role keys are exposed in the frontend.

---

## Recommended Implementation Plan

```text
┌─────────────────────────────────────────────────────────┐
│  PRIORITY 1 (Database - Migration Required)            │
├─────────────────────────────────────────────────────────┤
│  1. Fix INSERT policies: Change from RESTRICTIVE       │
│     to PERMISSIVE for all 4 lead tables                │
│                                                         │
│  2. Add SELECT policies: Block public reads            │
│     (deny all or require admin role)                   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  PRIORITY 2 (Code Changes)                             │
├─────────────────────────────────────────────────────────┤
│  3. Add input maxLength attributes to all form fields  │
│                                                         │
│  4. Add Zod validation schemas for form submissions    │
│                                                         │
│  5. Add DOMPurify for blog article body rendering      │
└─────────────────────────────────────────────────────────┘
```

---

## Technical Details for Database Migration

The migration will:
1. Drop existing RESTRICTIVE INSERT policies
2. Create new PERMISSIVE INSERT policies with rate limiting considerations
3. Ensure no SELECT/UPDATE/DELETE access for anonymous users

For input validation, the code changes will add:
- `maxLength` props on Input/Textarea components
- Zod schemas with proper string length limits (e.g., name: 100 chars, email: 255 chars)
- Trim whitespace before submission

---

## What's Already Secure

- HTTPS enforced via Supabase/Lovable infrastructure
- CORS handled by Supabase
- No sensitive secrets in frontend code
- Skip-to-content link for accessibility
- rel="noopener noreferrer" on all external links
- Email validation via HTML5 `type="email"`
