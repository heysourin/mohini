# Design Guidelines: Skin Color Analysis Application

## Design Approach Documentation

**Selected Approach:** Reference-Based with beauty industry inspiration
**Primary References:** Beauty/cosmetics apps like Sephora Virtual Artist, ULTA Beauty, and Fenty Beauty
**Design Principles:** Clean, professional aesthetic that builds trust in AI analysis while celebrating natural beauty diversity

## Core Design Elements

### Color Palette
**Light Mode:**
- Primary: 15 25% 15% (Deep charcoal for trust and professionalism)
- Secondary: 25 15% 85% (Warm cream for elegance)
- Accent: 320 45% 65% (Soft rose for beauty context)
- Background: 30 10% 98% (Warm white)
- Surface: 30 8% 95% (Light warm gray)

**Dark Mode:**
- Primary: 30 10% 90% (Warm white text)
- Secondary: 25 15% 25% (Dark warm gray)
- Accent: 320 35% 75% (Lighter rose for contrast)
- Background: 15 15% 8% (Rich dark background)
- Surface: 20 12% 12% (Elevated dark surfaces)

### Typography
- **Primary:** Inter or Poppins from Google Fonts
- **Headings:** 600-700 weight, generous line-height (1.2-1.3)
- **Body:** 400-500 weight, readable sizes (16px base)
- **UI Elements:** 500 weight for buttons, 400 for labels

### Layout System
**Spacing:** Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm
- Small gaps: p-4, m-6
- Medium sections: py-12, px-8
- Large containers: max-w-4xl, mx-auto

### Component Library

**Core Components:**
- **Upload Area:** Large, dotted border zone with camera icon, drag-and-drop styling
- **Image Preview:** Rounded corners (rounded-xl), subtle shadow, max width constraints
- **Color Palette Display:** Grid of color swatches with hex codes, smooth hover transitions
- **Analysis Cards:** Clean white/dark surfaces with subtle borders and proper padding
- **Action Buttons:** Rounded buttons (rounded-lg) with appropriate sizing for touch targets

**Navigation:** Minimal header with app logo and optional menu
**Forms:** Clean input styling with focus states matching accent colors
**Data Display:** Color swatches in organized grids, typography hierarchy for palette information

### Key Sections & Layout

1. **Header:** Simple branding, minimal navigation
2. **Upload Section:** Prominent drag-and-drop area with clear instructions
3. **Preview Section:** Clean image display with analysis status
4. **Results Section:** Color palette grid with names, hex codes, and usage suggestions
5. **Footer:** Simple, unobtrusive with minimal links

### Visual Treatment

**Photography Focus:** Interface designed to showcase uploaded photos prominently without competing visually
**Color Confidence:** Palette displays emphasize the recommended colors as heroes
**Professional Trust:** Clean, medical/beauty industry aesthetic that inspires confidence in AI analysis
**Accessibility:** High contrast ratios, clear visual hierarchy, touch-friendly targets

### Animations
**Minimal and Purposeful:**
- Subtle fade-in for analysis results
- Smooth color transitions on hover
- Loading states during API processing
- Gentle image upload animations

### Images
**No large hero images** - the user's uploaded photo becomes the visual centerpiece
**Icon Usage:** Camera/upload icons, color wheel graphics, minimal decorative elements
**Placeholder States:** Elegant empty states with relevant iconography

This design celebrates the diversity of skin tones while providing a professional, trustworthy interface for AI-powered beauty recommendations.