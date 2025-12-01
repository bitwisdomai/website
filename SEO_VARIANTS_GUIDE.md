# SEO Variants Feature - Complete Guide

## Overview

The SEO Variants feature allows you to create and test multiple versions of meta titles, descriptions, and Open Graph tags for a single page. This enables A/B testing to determine which SEO messaging performs best.

## Key Features

### 1. Multiple SEO Variants per Page
- Create unlimited variants with different meta titles and descriptions
- Each variant has its own complete set of SEO tags
- Track performance metrics (impressions, clicks, CTR) for each variant

### 2. Smart Distribution Strategies

#### Random (Default)
- Randomly selects from active variants
- Best for: Initial testing, equal distribution

#### Weighted
- Distributes based on weight values (1-100)
- Higher weight = shown more frequently
- Best for: Favoring a variant while still testing others

#### Sequential (Round-Robin)
- Rotates through variants evenly
- Ensures each variant gets equal exposure
- Best for: Fair testing with equal sample sizes

#### Time-Based
- Selects variant based on hour of day
- Distributes across 24 hours
- Best for: Testing time-of-day preferences

### 3. Performance Analytics
- Track impressions for each variant
- Monitor click-through rates
- Data-driven optimization decisions

## Implementation

### Backend (Already Implemented)

#### Page Model Schema
```javascript
{
  seo: { /* Primary/default SEO */ },
  seoVariants: [{
    name: String,
    isActive: Boolean,
    weight: Number,
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    impressions: Number,
    clicks: Number
  }],
  seoVariantSettings: {
    enabled: Boolean,
    strategy: String, // 'random' | 'weighted' | 'sequential' | 'time-based'
    defaultVariantId: ObjectId
  }
}
```

#### API Endpoints

**Manage SEO Variants:**
- `POST /api/pages/:id/seo-variants` - Add new variant
- `PUT /api/pages/:id/seo-variants/:variantId` - Update variant
- `DELETE /api/pages/:id/seo-variants/:variantId` - Delete variant
- `PUT /api/pages/:id/seo-variant-settings` - Update settings
- `GET /api/pages/:id/seo-variant-analytics` - Get analytics

**Public Endpoint:**
- `GET /api/pages/public/:slug` - Returns page with selected variant

### Frontend Usage

#### SeoVariantManager Component

Import and use in your page editor:

```jsx
import SeoVariantManager from '../components/admin/SeoVariantManager';

function PageEditor() {
  return (
    <div>
      {/* Other page editing UI */}

      <SeoVariantManager
        pageId={currentPage._id}
        onUpdate={() => refetchPage()}
      />
    </div>
  );
}
```

#### How It Works

1. **User visits page** → Backend selects variant based on strategy
2. **Frontend receives** → Page data + selected variant
3. **Helmet updates** → Meta tags rendered with variant's SEO
4. **Analytics tracked** → Impressions incremented automatically

## Demo Pages

Run the seed script to create demo pages for each template:

```bash
cd server
npm run seed:seo-demo
```

This creates 4 demo pages:
- `/landing-seo-demo` - Landing page with 3 weighted variants
- `/blog-seo-demo` - Blog post with 2 sequential variants
- `/legal-seo-demo` - Legal page with 2 time-based variants
- `/generic-seo-demo` - Generic page with random variant

## Usage Examples

### Example 1: Simple A/B Test

Test two different value propositions:

**Variant A - Feature Focused:**
```
Title: "Smart CMS Platform - Fast, Flexible & Powerful"
Description: "Build websites faster with our modern CMS. Features include drag-and-drop editor, SEO tools, and analytics."
```

**Variant B - Benefit Focused:**
```
Title: "Build Better Websites in Half the Time | YourCMS"
Description: "Join 10,000+ creators who cut development time by 50%. Start building beautiful websites today."
```

**Settings:**
- Strategy: Sequential
- Both variants active with weight: 1

### Example 2: Weighted Distribution

When you have a proven variant but want to test a new one:

**Variant A - Proven Winner (70%):**
```
Title: "Best CMS for Developers | YourCMS"
Weight: 70
```

**Variant B - New Test (30%):**
```
Title: "Developer-First CMS Platform | YourCMS"
Weight: 30
```

**Settings:**
- Strategy: Weighted
- Allows testing without sacrificing too much traffic

### Example 3: Time-Based Testing

Test different messaging for different times:

**Morning (Business Hours):**
```
Title: "Professional CMS Solutions for Businesses"
```

**Evening (After Hours):**
```
Title: "Build Your Side Project Website This Weekend"
```

**Settings:**
- Strategy: Time-based
- Automatically rotates based on hour of day

## Best Practices

### 1. Start Simple
- Begin with 2-3 variants maximum
- Test one element at a time (title OR description)
- Run tests for at least 1-2 weeks

### 2. Make Variants Different
- Ensure variants are meaningfully different
- Test different value propositions or angles
- Avoid minor wording changes

### 3. Use Appropriate Strategy
- **New pages**: Use Sequential for fair testing
- **Established pages**: Use Weighted to protect traffic
- **Clear winner**: Disable other variants, keep winner

### 4. Monitor Performance
- Check analytics weekly
- Look for statistical significance
- Consider external factors (seasonality, campaigns)

### 5. Iterate
- When you have a winner, make it the default
- Create new variants to test against the winner
- Continuous optimization cycle

## Analytics Interpretation

### Metrics Explained

**Impressions**: Number of times the variant was served
**Clicks**: Number of times users clicked through (if tracking enabled)
**CTR**: Click-through rate (Clicks / Impressions × 100)

### What to Look For

- **Minimum 100 impressions** before making decisions
- **Clear winner** (>10% improvement in CTR)
- **Statistical significance** (use online calculators)

### When to Make Changes

✅ **Make the change when:**
- Clear winner with 100+ impressions
- Improvement is meaningful (>10%)
- Results are consistent over time

❌ **Don't change if:**
- Low sample size (<100 impressions)
- Results are marginal (<5% difference)
- High variance week-to-week

## Troubleshooting

### Variants Not Showing

1. Check if variants are enabled: `seoVariantSettings.enabled = true`
2. Verify variants are active: `isActive = true`
3. Ensure page is published: `status = 'published'`

### Same Variant Always Shows

1. Check browser caching (hard refresh: Ctrl+Shift+R)
2. Verify multiple variants exist and are active
3. Check strategy setting is correct

### Analytics Not Tracking

1. Impressions should increment on each page load
2. Check MongoDB to verify counts are updating
3. Use the analytics endpoint to view current stats

## Integration with Page Editor

To add SEO Variant Manager to your page editor:

1. **Import the component:**
```jsx
import SeoVariantManager from '../../components/admin/SeoVariantManager';
```

2. **Add a tab or section:**
```jsx
<Tabs>
  <Tab label="Content">...</Tab>
  <Tab label="SEO">...</Tab>
  <Tab label="SEO Variants">
    <SeoVariantManager pageId={pageId} onUpdate={handleUpdate} />
  </Tab>
</Tabs>
```

3. **Refresh page data after updates:**
```jsx
const handleUpdate = async () => {
  await fetchPageData(); // Reload page to show changes
};
```

## API Usage Examples

### Create a Variant

```javascript
const response = await pagesAPI.addSeoVariant(pageId, {
  name: 'Summer Sale Variant',
  metaTitle: 'Summer Sale - 50% Off All Products',
  metaDescription: 'Limited time summer sale! Save 50% on all products. Shop now while supplies last.',
  metaKeywords: ['summer sale', 'discount', 'products'],
  ogTitle: 'Summer Sale - 50% Off',
  ogDescription: 'Biggest sale of the year!',
  ogImage: 'https://example.com/summer-sale.jpg',
  weight: 40,
  isActive: true
});
```

### Update Variant Settings

```javascript
await pagesAPI.updateSeoVariantSettings(pageId, {
  enabled: true,
  strategy: 'weighted'
});
```

### Get Analytics

```javascript
const analytics = await pagesAPI.getSeoVariantAnalytics(pageId);
console.log(analytics.data.data.analytics);
// [
//   { id: '...', name: 'Variant A', impressions: 150, clicks: 12, ctr: 8.00 },
//   { id: '...', name: 'Variant B', impressions: 145, clicks: 18, ctr: 12.41 }
// ]
```

## Advanced Features

### Custom Selection Logic

You can extend the backend controller to add custom selection strategies:

```javascript
// In pageController.js
case 'custom':
  selectedVariant = customSelectionLogic(activeVariants, req);
  break;
```

### External Analytics Integration

Track variant impressions in Google Analytics:

```javascript
// In DynamicPage.jsx
useEffect(() => {
  if (page?._activeVariant) {
    gtag('event', 'seo_variant_impression', {
      variant_name: page._activeVariant,
      page_slug: slug
    });
  }
}, [page]);
```

### Automated Winner Selection

Create a script to automatically promote winning variants:

```javascript
// Pseudo-code
const analytics = await getSeoVariantAnalytics(pageId);
const winner = analytics.find(v => v.ctr > threshold && v.impressions > minSample);

if (winner) {
  await updatePage(pageId, {
    seo: { ...variantToSeo(winner) },
    seoVariantSettings: { enabled: false }
  });
}
```

## FAQ

**Q: How many variants should I test?**
A: Start with 2-3. More variants = longer time to statistical significance.

**Q: How long should I run a test?**
A: Minimum 1-2 weeks, or until you have 100+ impressions per variant.

**Q: Can I change variants mid-test?**
A: Yes, but it invalidates previous data. Better to deactivate and create new ones.

**Q: Does this affect SEO negatively?**
A: No, search engines only see one variant per crawl. It's no different than updating your meta tags.

**Q: Can I test different keywords?**
A: Yes! Use metaKeywords field, though keywords have limited SEO value today.

**Q: How do I know which variant is showing?**
A: Check the page source (View Page Source) or use the browser console: `console.log(page._activeVariant)`

## Support & Contributing

For issues or feature requests, please create an issue in the repository.

Happy testing! 🚀
