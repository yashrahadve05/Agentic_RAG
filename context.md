# Project Context: Advance RAG Monorepo (Athleia)

This document serves as the project memory and architecture index for incoming AI coding agents and developers. It defines the structure, frontend systems, service configurations, state models, database schema, and development workflow for the project.

---

## 📂 Project Structure

This project is organized as a Turborepo-managed monorepo. It contains the following core workspace folders:

### 1. Applications (`./apps`)
- **[web](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web)**: Next.js application (App Router) using React 19 and Tailwind CSS v4. Implements the public identity and landing page of **Athleia**.
- **[blog](file:///c:/Document%20Code/00%20Product/advance-rag/apps/blog)**: Currently an empty placeholder directory containing only a `.gitkeep` file.

### 2. Services (`./services`)
- **[auth-service](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service)**: Express.js REST API service built with TypeScript. Implements JWT authentication, OAuth2, 2FA, and user profile management using MongoDB/Mongoose.
- **[document-service](file:///c:/Document%20Code/00%20Product/advance-rag/services/document-service)**: Currently an empty placeholder directory containing only a `.gitkeep` file.

### 3. Packages (`./packages`)
- **[ui](file:///c:/Document%20Code/00%20Product/advance-rag/packages/ui)**: React 19 shared UI components (`Button`, `Card`, `Code`).
- **[eslint-config](file:///c:/Document%20Code/00%20Product/advance-rag/packages/eslint-config)**: Shared ESLint configuration guidelines.
- **[typescript-config](file:///c:/Document%20Code/00%20Product/advance-rag/packages/typescript-config)**: Shared TypeScript configurations for libraries, Next.js, and APIs.

---

## 🎨 Frontend Architecture (`apps/web`)

The landing page is designed to convey premium quality, trust, and industrial precision for Athleia (Industrial Knowledge Intelligence Platform).

### Core Technologies
- **Framework**: Next.js App Router (React 19, TypeScript)
- **Styling**: Tailwind CSS v4 with custom @theme variables in [globals.css](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/app/globals.css)
- **Icons**: Lucide React
- **Animations**: Framer Motion (staggered cards, drawing paths, and scroll reveals)

### Design System Decisions
- **Color Theme**: Dedicated Light Theme
  * **Primary (Deep Navy)**: `#0A1628` (grounds the design in industrial authority)
  * **Accent (Indigo)**: `#4F46E5` (signals intelligence and interactive focus)
  * **Success (Emerald)**: `#059669` (used for grounded metrics and security trust items)
  * **Surface**: `#F8FAFC` (very light gray background segments)
  * **Typography (Dark Slate)**: `#0F172A` (ensures optimal readable contrast)
- **Typography Scale**: Geist Sans (headings/body) and Geist Mono (number statistics).
- **UX & Accessibility**: 
  * High-contrast design (navy on white/gray) exceeding WCAG AA ratios.
  * Native CSS skip-to-content links.
  * Motion safeguards respecting user-defined `prefers-reduced-motion` settings.

### UI Component Inventory
1. **Layout / Primitives**:
   * [navbar.tsx](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/components/layout/navbar.tsx): Floating nav with backdrop blur and responsive mobile hamburger.
   * [footer.tsx](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/components/layout/footer.tsx): High-quality structured footer.
   * [button.tsx](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/components/ui/button.tsx): Polymorphic component rendering as `<a>` when `href` is present; supports primary, secondary, and ghost variants.
   * [badge.tsx](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/components/ui/badge.tsx): Pill tags.
   * [container.tsx](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/components/ui/container.tsx): Standardized responsive width constraints.
   * [section-heading.tsx](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/components/ui/section-heading.tsx): Reusable component with an uppercase indigo overline, bold title, and description.
2. **Sections**:
   * `Hero`: Core outcome statement with staggered entrance and interactive animation. Includes:
     * [knowledge-flow.tsx](file:///c:/Document%20Code/00%20Product/advance-rag/apps/web/components/sections/hero/knowledge-flow.tsx): Animated SVG rendering the transformation flow from raw documents to an interconnected knowledge graph and final grounded answer. Fully typed for `strictNullChecks`.
   * `Problem`: Emphasizes industrial statistical pain points (undocumented knowledge, lost time, financial drain).
   * `Transformation`: Side-by-side comparative panel illustrating before/after states (scattered silos vs. connected graphs).
   * `HowItWorks`: Step-by-step sequential breakdown of the pipeline: Ingest → Understand → Connect → Answer.
   * `ProductExperience`: Fully styled, code-rendered application UI preview demonstrating actual document reference lookups, tags, and citations.
   * `Capabilities`: Interactive grid highlighting 6 principal features.
   * `UseCases`: Highlight tabs/cards for industrial verticals: Oil & Gas, Power, Manufacturing, and Pharma.
   * `EnterpriseTrust`: SOC 2 Type II, SSO/SAML, Role-Based Access, and On-Premises capabilities list.
   * `CTA`: Clean end conversion point matching the primary theme.

### Authentication & Dashboard UI Architecture (`apps/web`)
The frontend implements a production-grade authentication UI integrated with `services/auth-service`.

1. **Route Groups**:
   * `(auth)`: Clean, centered layout without navbar/footer (`app/(auth)/layout.tsx`) for public authentication flows:
     * `/auth/login`: Email/password login with 2FA TOTP challenge modal support (`app/(auth)/auth/login/page.tsx`).
     * `/auth/register`: Account creation with validation (`app/(auth)/auth/register/page.tsx`).
     * `/auth/verify-email`: Token processing and email verification (`app/(auth)/auth/verify-email/page.tsx`).
     * `/auth/check-email`: Informational status screen (`app/(auth)/auth/check-email/page.tsx`).
     * `/auth/forgot-password` & `/auth/reset-password`: Password recovery flow (`app/(auth)/auth/forgot-password/page.tsx`).
     * `/auth/google/callback`: OAuth callback handler supporting code exchange and session refresh (`app/(auth)/auth/google/callback/page.tsx`).
   * `(dashboard)`: Protected enterprise intelligence workspace (`app/(dashboard)/layout.tsx`):
     * `/dashboard`: Account security status, active session monitoring, and interactive 2FA setup/verification (`app/(dashboard)/dashboard/page.tsx`).

2. **Auth Infrastructure & State Management**:
   * **Next.js Rewrites API Proxy (`next.config.js`)**: Proxies `/api/*` to `http://localhost:5000/*`, eliminating CORS complexity between frontend and backend while maintaining HTTP-only cookie security (`sameSite: "lax"`).
   * **In-Memory Token Storage (`lib/auth.ts`)**: Access tokens (`30m` expiry) are stored strictly in memory (not `localStorage` or `sessionStorage`) for maximum protection against XSS. Silent refresh attempts (`POST /api/auth/refresh`) restore sessions on page load using the HTTP-only refresh cookie (`7d` expiry).
   * **Authenticated API Client (`lib/api.ts`)**: Auto-injects `Authorization: Bearer <token>` headers, automatically retries on `401 Unauthorized` by rotating access tokens, and throws typed `ApiError` instances.
   * **Client Validation (`lib/validators.ts`)**: Exact Zod schema parity with `auth-service` validation rules.
   * **React Query Auth Provider (`providers/auth-provider.tsx`)**: Global auth context providing `user`, `isAuthenticated`, `isLoading`, and action methods (`login`, `logout`, `refreshUser`). Consumed via `useAuth()` (`hooks/use-auth.ts`).

3. **Auth & UI Primitives**:
   * **shadcn-style Primitives (`components/ui/*`)**: `Input` (with error state styling), `Label`, compound `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`), `Separator`, `Spinner`, and `Alert`.
   * **Auth Components (`components/auth/*`)**: Branded `AuthCard` wrapper with Framer Motion entry, `SocialLogin` Google OAuth button, `FormField` compound inputs, `PasswordInput` visibility toggle, and `TwoFactorInput` 6-digit OTP boxes with auto-focus and clipboard paste support.

---

## 🌐 Auth Service Architecture (`services/auth-service`)

The `auth-service` is the active core backend in this workspace.

### Core Technologies
- **Framework**: Express.js
- **Database**: MongoDB via Mongoose
- **Validation**: Zod (schema verification)
- **Hashing**: bcryptjs (for password hashes)
- **Token Security**: JSON Web Tokens (JWT) with token versioning for stateful invalidation.
- **Email Service**: Nodemailer (SMTP)
- **Two-Factor Auth (2FA)**: `otplib` (TOTP generation and verification)
- **OAuth 2.0**: Google Auth Library (`google-auth-library`)

---

## 🗄️ Database Schemas

### User Model (`User` schema in [user.model.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/models/user.model.ts))

The schema stores account info, role settings, 2FA settings, session validation versions, and password-reset lifecycles.

```typescript
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
        },
        twoFactorEnabled: {
            type: Boolean,
            default: false,
        },
        twoFactorSecret: {
            type: String,
            default: undefined,
        },
        tokenVersion: {
            type: Number,
            default: 0,
        },
        resetPasswordToken: {
            type: String,
            default: undefined,
        },
        resetPasswordExpires: {
            type: Date,
            default: undefined,
        },
    },
    {
        timestamps: true, // Auto-creates createdAt and updatedAt
    }
);
```

---

## 🔌 API Endpoints & Routes

All routes are mounted under their respective path prefixes in [app.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/app.ts).

### 1. Authentication Routes (`/auth/*` in [auth.routes.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/routes/auth.routes.ts))

- **`POST /auth/register`**: Registers a new user account. Validates request body using `registerSchema` (requires email, password of length >= 6, and name of length >= 3). Checks if email is in use, hashes the password, sends a JWT-based verification email via SMTP, and returns the new user.
- **`GET /auth/verify-email?token=<token>`**: Verifies the user's email using the registration token. If valid and not already verified, updates `isEmailVerified: true` in the database.
- **`POST /auth/login`**: Authenticates email and password. Checks if email verification is completed. If 2FA is enabled on the user account, verifies the TOTP code. Generates a short-lived Access Token (30-minute expiry) and sets a stateful Refresh Token in an HTTP-only, secure, `sameSite: "lax"` cookie (7-day expiry).
- **`POST /auth/refresh`**: Validates the refresh token cookie. Confirms database `tokenVersion` matches the token payload. If valid, issues a new Access Token and writes a new Refresh Token cookie to rotate sessions.
- **`POST /auth/logout`**: Clears the `refreshToken` cookie.
- **`POST /auth/forgot-password`**: Receives an email address. Generates a cryptographically secure random token, hashes it via SHA-256 to save on the user document (expires in 15 minutes), and sends a reset link to the email.
- **`POST /auth/reset-password`**: Validates the plaintext token against the stored SHA-256 hash. Updates the password hash, increments `tokenVersion` (invalidating all active login sessions), and clears reset fields.
- **`GET /auth/google`**: Generates and redirects to the Google OAuth consent page.
- **`GET /auth/google/callback`**: Receives OAuth redirect code, exchanges it for an ID token, verifies user email via Google verification, creates a user account if not already in database, and issues cookies/tokens.
- **`POST /auth/2fa/setup`** *(Protected)*: Generates a TOTP secret using `otplib`, sets `twoFactorEnabled: false` on the User document, and returns the OTP Auth URI + base secret key.
- **`POST /auth/2fa/verify`** *(Protected)*: Verifies the provided OTP code against the setup secret. If verified, updates `twoFactorEnabled: true`.

### 2. User Profile Routes (`/user/*` in [user.routes.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/routes/user.routes.ts))

- **`GET /user/me`** *(Protected)*: Returns the current authenticated user's session payload (`id`, `email`, `name`, `role`, `isEmailVerified`).

### 3. Administration Routes (`/admin/*` in [admin.routes.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/routes/admin.routes.ts))

- **`GET /admin/users`** *(Protected, Requires Admin)*: Returns a listing of all registered users sorted by creation date.

---

## 🔒 Security & Session Flow

1. **Authorization Middleware** ([auth.middleware.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/middleware/auth.middleware.ts)): Parses the `Authorization` header (`Bearer <token>`). Verifies the signature of the Access Token, checks the user in the database, and validates that `user.tokenVersion === payload.tokenVersion`.
2. **Role Middleware** ([role.middleware.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/middleware/role.middleware.ts)): Validates if the authenticated user possesses the specific role required (e.g. `admin`).
3. **Session Invalidation**: When a user changes their password or resets it, their database `tokenVersion` is incremented by 1. Since active Access/Refresh tokens contain the old version, they instantly fail validation, forcing a complete logout across all devices.

---

## 🛠️ Environment Configuration

The auth service parses and validates environment variables on startup in [env.ts](file:///c:/Document%20Code/00%20Product/advance-rag/services/auth-service/src/config/env.ts). Ensure the following variables are defined in the environment or a `.env` file inside `services/auth-service/`:

| Variable | Description | Required / Default |
| --- | --- | --- |
| `NODE_ENV` | Mode of operation (`development`, `production`, `test`) | Default: `development` |
| `PORT` | Local service port | Default: `5000` |
| `MONGO_URI` | Connection URI for the MongoDB instance | **Required** |
| `JWT_ACCESS_SECRET` | Secret key used to sign Access Tokens | **Required** |
| `JWT_REFRESH_SECRET`| Secret key used to sign Refresh Tokens | **Required** |
| `SMTP_HOST` | Host address of SMTP server | Optional |
| `SMTP_PORT` | SMTP port (e.g., `587` or `465`) | Optional |
| `SMTP_USER` | SMTP username | Optional |
| `SMTP_PASS` | SMTP password | Optional |
| `EMAIL_FROM` | Source email address for sending mail | Optional |
| `GOOGLE_CLIENT_ID`| Client ID for Google OAuth | Optional |
| `GOOGLE_CLIENT_SECRET`| Client Secret for Google OAuth | Optional |
| `GOOGLE_REDIRECT_URI`| Authorized Redirect URI for callback | Optional |
| `APP_URL` | Application base URL | Optional (Defaults to port-bound address) |

---

## 🚀 Commands & Development Scripts

Scripts are executed from the workspace root (or inside individual workspaces via filters):

- **Start Dev Servers**: `npm run dev` (Runs `turbo run dev` to watch and run services/apps)
- **Compile / Build Assets**: `npm run build` (Runs `turbo run build`)
- **Lint Code**: `npm run lint` (Runs `turbo run lint`)
- **Format Code**: `npm run format` (Format files with Prettier)
- **Check Types**: `npm run check-types` (Typecheck NextJS files and TypeScript packages)

---

## ⚠️ Important Developer Rules

1. **Context Maintenance**: Whenever you modify an existing feature, add a new route, update a configuration, or spin up a new service (such as completing the placeholder `apps/blog` or `services/document-service`), **you must immediately document the modifications inside this file (`context.md`)**.
2. **Environment Validation**: Always verify that any new configuration variable is registered and validated in the Zod schemas located in the service's `config/env.ts` file to maintain type safety and avoid unhandled startup failures.
3. **TypeScript Usage**: Every workspace package is fully typed. Do not bypass or ignore type safety warnings. Make sure to run `npm run check-types` before checking in changes.
