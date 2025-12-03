# ClimaX Assets & Resources

## 📁 Asset Organization

```
public/
├── api-mocks/              # Mock API responses for development
│   ├── projects.json       # Carbon credit project listings
│   ├── users.json          # User profile data
│   ├── transactions.json   # Transaction history
│   └── audits.json         # Audit records and MRV data
├── images/                 # Project images (placeholder)
│   └── projects/
├── certificates/           # Verification certificates (placeholder)
├── docs/                   # Project documentation (placeholder)
└── robots.txt             # SEO crawler instructions

src/
└── assets/
    └── hero-illustration.jpg  # Homepage hero image
```

## 🎨 Placeholder Assets Needed

### Icons (Lucide React - Already Included)
All icons are provided via the `lucide-react` package. No additional icon files needed.

Common icons used:
- `Home`, `ShoppingBag`, `PlusCircle`, `Wallet`, `User` (navigation)
- `CheckCircle2`, `Clock`, `Award` (status badges)
- `MapPin`, `Calendar`, `Search` (marketplace)
- `Download`, `Upload`, `FileText` (documents)

### Hero Illustration
**Location:** `src/assets/hero-illustration.jpg`
**Current:** Placeholder image
**Recommended dimensions:** 1920x1080px
**Format:** JPG or WebP
**Description:** Modern, clean illustration representing carbon credits, sustainability, and green technology. Should feature:
- Solar panels, wind turbines, or trees
- Abstract representation of carbon credit certificates
- Indian context (if possible)
- Colors matching design system (teal, lime green)

### Project Images
**Location:** `public/images/projects/`
**Naming convention:** `PRJ-{ID}-{descriptor}.jpg`
**Recommended dimensions:** 800x600px (4:3 aspect ratio)
**Format:** JPG optimized for web

Examples needed:
- `PRJ-001-hero.jpg` - Rooftop solar panels
- `PRJ-002-hero.jpg` - Biogas facility
- `PRJ-003-hero.jpg` - Forest/afforestation
- `PRJ-004-hero.jpg` - Waste-to-energy plant

### Certificates
**Location:** `public/certificates/`
**Format:** PDF
**Naming:** `PRJ-{ID}.pdf` or `retirement-TXN-{ID}.pdf`

Sample certificate should include:
- Project name and ID
- Number of credits
- Verification standard logo (Gold Standard, Verra, etc.)
- Serial numbers
- QR code for verification
- Digital signature

### User Avatars
**Location:** `public/avatars/`
**Dimensions:** 256x256px
**Format:** JPG or PNG
**Naming:** `user-{ID}.jpg`

Use placeholder avatar service in development:
```tsx
<img 
  src={`https://ui-avatars.com/api/?name=${userName}&size=256&background=1A7F7F&color=fff`}
  alt={`${userName}'s avatar`}
/>
```

## 🖼️ Image Optimization Guidelines

### Formats
- **Photos:** JPG (quality 80-85)
- **Graphics/logos:** PNG or SVG
- **Modern browsers:** WebP (provide JPG fallback)

### Responsive Images
```tsx
<img
  src="/images/project-hero.jpg"
  srcSet="
    /images/project-hero-400.jpg 400w,
    /images/project-hero-800.jpg 800w,
    /images/project-hero-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
  alt="Solar panel installation on commercial building"
/>
```

### Lazy Loading
```tsx
<img 
  src="/images/project.jpg"
  loading="lazy"
  alt="Project description"
/>
```

## 📊 Mock Data Files

### projects.json
Complete carbon credit project listings with:
- Project details (title, type, location)
- Seller information
- Credits available
- Pricing
- Verification status
- Impact metrics
- Documents

### users.json
User profile data including:
- Personal information
- Organization details
- Wallet balance
- Payment methods
- Stats and preferences

### transactions.json
Transaction history with:
- Buy/sell/retire/topup/withdraw records
- Amounts and quantities
- Status tracking
- Payment references

### audits.json
Audit and verification data:
- MRV checklist items
- Auditor information
- Comments and threads
- Documents
- Status tracking

## 🔗 External Resources

### Fonts
- **Primary:** Inter (Google Fonts)
- Already loaded via CDN or npm package

### Design Assets from Figma (if applicable)
Export requirements:
- SVG for icons and logos
- PNG @2x for raster graphics
- Maintain color values from design system

## 📋 Asset Checklist for Production

Before launch, ensure:
- [ ] All placeholder images replaced with real photos
- [ ] Images optimized (compressed, correct format)
- [ ] Alt text provided for all images
- [ ] Certificates generated with proper branding
- [ ] Favicon and app icons created (16x16, 32x32, 180x180, 192x192)
- [ ] Social media preview images (og:image, twitter:image)
- [ ] Legal documents uploaded (Terms, Privacy Policy)
- [ ] Verification logos from standards bodies (with permission)

## 🎯 SEO Assets

### Favicon
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" href="/favicon.png" />
```

### Social Media Cards
**Open Graph (Facebook, LinkedIn)**
- Dimensions: 1200x630px
- Format: JPG or PNG
```html
<meta property="og:image" content="/og-image.jpg" />
```

**Twitter Card**
- Dimensions: 1200x600px
- Format: JPG or PNG
```html
<meta name="twitter:image" content="/twitter-card.jpg" />
```

### App Icons (PWA)
- 192x192px
- 512x512px
- Format: PNG

## 📦 Asset Delivery

### CDN Recommendations
For production, consider:
- Cloudflare Images
- AWS S3 + CloudFront
- Vercel Image Optimization
- Cloudinary

### Image CDN Example
```tsx
const getCDNUrl = (path: string, width?: number) => {
  const baseUrl = process.env.VITE_CDN_URL || '';
  if (width) {
    return `${baseUrl}/${path}?w=${width}&q=80&fm=webp`;
  }
  return `${baseUrl}/${path}`;
};
```

## 🔐 Asset Security

### Sensitive Documents
- Store certificates and legal docs in secure storage
- Use signed URLs for private documents
- Implement access control

### User-Uploaded Content
- Validate file types
- Scan for malware
- Limit file sizes
- Store in separate bucket from public assets

## 🌍 Internationalization Assets

For Hindi and other languages:
- Create separate asset directories: `/images/en/`, `/images/hi/`
- Translate image text overlays
- Provide localized certificates and documents

---

## 🚀 Quick Start for Designers

To add new assets:

1. **Export from design tool** at correct dimensions
2. **Optimize images:**
   ```bash
   # Using ImageMagick
   magick convert input.png -quality 85 -resize 800x600 output.jpg
   
   # Using online tool
   # TinyPNG.com or Squoosh.app
   ```
3. **Place in correct directory**
4. **Update alt text** in component
5. **Test responsive behavior**

## 📞 Asset Support

For questions about:
- Image specifications: Check DEVELOPER_HANDOFF.md
- Accessibility requirements: Check ACCESSIBILITY_GUIDELINES.md
- Color values: Check src/index.css design system tokens
