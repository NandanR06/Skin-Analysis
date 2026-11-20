---
name: security-auditor
description: Security review for Expo/React Native apps. Check for hardcoded secrets, PII storage, unvalidated inputs, insecure dependencies, and exposed API keys.
---

# Security Auditor Skill

## Security Audit Checklist

### 1. Secrets & API Keys

- [ ] No hardcoded secrets in source files (`const API_KEY = "..."`)
- [ ] No secrets in `app.json` `extra` field (they're bundled into the app binary)
- [ ] Secrets accessed via `expo-constants` from EAS secrets or environment variables
- [ ] `.env` files are in `.gitignore`
- [ ] `eas.json` does not contain plaintext secrets

Scan for secrets:

```bash
# Search for suspicious patterns
Select-String -Path "src\**\*.ts","src\**\*.tsx" -Pattern "api_key|apiKey|secret|password|Bearer " -Recurse
```

### 2. Sensitive Data Storage

- [ ] **Never** store tokens, passwords, or PII in `AsyncStorage` (not encrypted)
- [ ] Use `expo-secure-store` for sensitive data (tokens, user credentials)
- [ ] Skin analysis results (non-PII cosmetic data) are acceptable in AsyncStorage
- [ ] No `console.log` statements that print user profile data or scan results to production

```ts
// ❌ Insecure
await AsyncStorage.setItem('auth_token', token);

// ✅ Secure
import * as SecureStore from 'expo-secure-store';
await SecureStore.setItemAsync('auth_token', token);
```

### 3. Input Validation

- [ ] All `useLocalSearchParams()` values are validated before use (they're strings)
- [ ] User text inputs are sanitized before display
- [ ] Image URIs from camera/gallery are validated before passing to processing

```ts
// ✅ Safe param handling
const { scanId } = useLocalSearchParams<{ scanId: string }>();
if (!scanId || typeof scanId !== 'string') {
  router.back();
  return null;
}
```

### 4. Network Security

- [ ] All API calls use HTTPS (never HTTP)
- [ ] No sensitive data in URL query parameters (use POST body)
- [ ] `expo-constants` used for base URLs (not hardcoded)

### 5. Camera & Permissions

- [ ] Camera permission is requested before access (not assumed)
- [ ] Images are processed on-device; no raw camera frames sent to external servers
- [ ] `expo-image-picker` and `expo-camera` permissions declared in `app.json`

### 6. Dependency Vulnerabilities

```bash
# Check for known vulnerabilities
npm audit

# Check Expo compatibility
npx expo-doctor

# Check for outdated packages
npm outdated
```

### 7. Code Quality Security

- [ ] No `eval()` or `Function()` with dynamic strings
- [ ] No `dangerouslySetInnerHTML` equivalent (web only, but flag if present)
- [ ] Error messages don't expose internal file paths or stack traces to users

### 8. Build Security (EAS)

- [ ] `eas.json` profiles use `"distribution": "store"` for production
- [ ] Signing credentials managed by EAS (not stored locally)
- [ ] `DEBUG` logging disabled in production builds

## Audit Report Template

When performing an audit, report findings as:

```
CRITICAL: Hardcoded API key found in src/api/client.ts line 12
HIGH:     Auth token stored in AsyncStorage instead of SecureStore
MEDIUM:   console.log prints user email in useProfileStore.ts line 45
LOW:      npm audit shows 2 moderate severity vulnerabilities in devDependencies
INFO:     Camera permissions correctly declared in app.json
```
