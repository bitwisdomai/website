# SEO Variants - Quick Start Guide

## What's New?

You can now add **multiple meta titles and descriptions** to a single page for A/B testing! 🎉

## Quick Setup (3 Steps)

### 1. Run the Demo Seed Script

```bash
cd server
npm run seed:seo-demo
```

This creates 4 demo pages (one for each template) with SEO variants already configured.

### 2. Start Your Servers

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

### 3. View the Demo Pages

Visit these URLs to see SEO variants in action:
- http://localhost:5173/landing-seo-demo
- http://localhost:5173/blog-seo-demo
- http://localhost:5173/legal-seo-demo
- http://localhost:5173/generic-seo-demo

**Tip:** Refresh each page multiple times and view the page source (`Ctrl+U`) to see different meta titles/descriptions!

## How to Use in Your Pages

### In the Admin Panel

1. **Edit any page** in the admin panel
2. **Import the SEO Variant Manager:**
   ```jsx
   import SeoVariantManager from '../../components/admin/SeoVariantManager';
   ```

3. **Add it to your page editor:**
   ```jsx
   <SeoVariantManager pageId={pageId} onUpdate={refetchPage} />
   ```

4. **Create variants:**
   - Click "Add Variant"
   - Fill in the meta title and description
   - Set weight (for weighted distribution)
   - Save!

5. **Configure settings:**
   - Enable SEO Variants
   - Choose distribution strategy:
     - **Random**: Randomly picks variants
     - **Weighted**: Based on weight values
     - **Sequential**: Round-robin (equal distribution)
     - **Time-based**: Changes by hour of day

6. **Monitor performance:**
   - View impressions, clicks, and CTR for each variant
   - Identify the best performing variant
   - Disable underperforming variants

## Distribution Strategies Explained

### Random
- Randomly selects from active variants
- Good for initial testing

### Weighted
- Higher weight = shown more often
- Good when you have a proven variant but want to test new ones
- Example: 70% proven, 30% experimental

### Sequential
- Rotates through variants evenly
- Ensures equal exposure for fair testing
- Good for A/B testing with equal sample sizes

### Time-based
- Selects variant based on hour of day (0-23)
- Good for testing time-specific messaging
- Example: "Professional" during business hours, "Side Project" evenings

## API Endpoints

All endpoints require authentication (except public page view):

```javascript
// Add SEO variant
POST /api/pages/:id/seo-variants
Body: { name, metaTitle, metaDescription, weight, ... }

// Update SEO variant
PUT /api/pages/:id/seo-variants/:variantId
Body: { metaTitle, metaDescription, isActive, ... }

// Delete SEO variant
DELETE /api/pages/:id/seo-variants/:variantId

// Update variant settings
PUT /api/pages/:id/seo-variant-settings
Body: { enabled, strategy }

// Get analytics
GET /api/pages/:id/seo-variant-analytics
```

## Example: Creating a Variant Programmatically

```javascript
import { pagesAPI } from './services/api';

// Add a new SEO variant
await pagesAPI.addSeoVariant(pageId, {
  name: 'Holiday Special',
  metaTitle: 'Holiday Sale - 50% Off Everything!',
  metaDescription: 'Limited time holiday sale. Save 50% on all products. Shop now!',
  metaKeywords: ['holiday sale', 'discount', 'special offer'],
  ogTitle: '50% Off Holiday Sale',
  ogDescription: 'Biggest sale of the year!',
  weight: 30,
  isActive: true
});

// Enable variants with weighted strategy
await pagesAPI.updateSeoVariantSettings(pageId, {
  enabled: true,
  strategy: 'weighted'
});
```

## Viewing Which Variant is Active

### In Browser Console:
```javascript
// The active variant name is stored in page._activeVariant
console.log(page._activeVariant); // e.g., "Variant A - Focus on Benefits"
```

### In Page Source:
1. Right-click page → "View Page Source" (or `Ctrl+U`)
2. Look at the `<title>` and `<meta name="description">` tags
3. Refresh and view source again to see it change!

## Database Schema

Each page now has:

```javascript
{
  // Original SEO (still works, acts as fallback)
  seo: {
    metaTitle: String,
    metaDescription: String,
    // ... other fields
  },

  // New: Multiple SEO variants
  seoVariants: [{
    name: String,              // e.g., "Variant A"
    isActive: Boolean,         // Can enable/disable
    weight: Number,            // For weighted distribution
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    impressions: Number,       // Auto-tracked
    clicks: Number             // For future click tracking
  }],

  // Variant configuration
  seoVariantSettings: {
    enabled: Boolean,          // Master on/off switch
    strategy: String,          // 'random' | 'weighted' | 'sequential' | 'time-based'
  }
}
```

## Best Practices

✅ **DO:**
- Test 2-3 variants at a time
- Make variants meaningfully different
- Run tests for 1-2 weeks minimum
- Wait for 100+ impressions before deciding
- Use Sequential strategy for fair A/B tests

❌ **DON'T:**
- Test too many variants at once
- Make only minor wording changes
- End tests too early
- Forget to monitor analytics
- Leave underperforming variants active forever

## Checking if Everything Works

### Test Checklist:

1. ✅ Run seed script: `npm run seed:seo-demo`
2. ✅ Visit demo page: http://localhost:5173/landing-seo-demo
3. ✅ View page source (`Ctrl+U`) and find the `<title>` tag
4. ✅ Refresh page 5-10 times
5. ✅ View source again - title should change occasionally
6. ✅ Login to admin and view the page analytics

If you see different titles when refreshing, it's working! 🎉

## Troubleshooting

**Not seeing different variants?**
- Check browser cache (hard refresh: `Ctrl+Shift+F5`)
- Verify `seoVariantSettings.enabled = true`
- Ensure variants are `isActive = true`
- Check multiple variants exist

**Variants not in admin panel?**
- Make sure you imported `SeoVariantManager` component
- Check pageId is passed correctly
- Verify backend routes are registered

**Analytics not updating?**
- Impressions increment on each page load
- Check MongoDB directly to verify
- Use `/api/pages/:id/seo-variant-analytics` endpoint

## Next Steps

1. **Run the demo** to see it in action
2. **Read the full guide**: `SEO_VARIANTS_GUIDE.md`
3. **Add to your page editor** using `SeoVariantManager` component
4. **Create your first A/B test!**

## Need Help?

- Full documentation: `SEO_VARIANTS_GUIDE.md`
- Check the demo pages for examples
- Review the seed script: `server/scripts/seedSeoVariants.js`
- Examine the component: `client/src/components/admin/SeoVariantManager.jsx`

Happy testing! 🚀
