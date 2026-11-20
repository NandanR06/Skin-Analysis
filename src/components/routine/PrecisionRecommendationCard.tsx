import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import Svg, { Rect, Circle, Defs, LinearGradient, Stop, Path } from 'react-native-svg';
import { AppText } from '@/components/ui';
import { ShoppingBagIcon, BookmarkIcon } from '@/components/ui/icons';
import { Spacing, Radii, Shadow } from '@/constants/theme';

export function PrecisionRecommendationCard() {
  const [saved, setSaved] = useState(false);

  const handleShop = () => {
    Alert.alert(
      'Formulation Added',
      'Bio-Cellular Matrix Eye Serum has been added to your regimen cart with member pricing applied ($38.00).',
      [{ text: 'Great', style: 'default' }],
    );
  };

  return (
    <View style={styles.section}>
      {/* ── Section Header ─────────────────────────────────────── */}
      <View style={styles.headerRow}>
        <AppText variant="h2" style={styles.sectionTitle}>
          Precision Recommendation
        </AppText>
        <AppText style={styles.scanRefText}>FROM 08:00 AM SCAN</AppText>
      </View>

      {/* ── Main Product Clinical Match Card ───────────────────── */}
      <View style={[styles.card, Shadow.sm]}>
        {/* Top Product Row */}
        <View style={styles.productRow}>
          {/* Serum Bottle Vector Graphic Thumbnail */}
          <View style={styles.thumbWrapper}>
            <SerumBottleGraphic />
            <View style={styles.fitPill}>
              <AppText style={styles.fitText}>88.2% FIT</AppText>
            </View>
          </View>

          {/* Product Details */}
          <View style={styles.productDetailsCol}>
            <AppText style={styles.targetedTag}>TARGETED CLINICAL NEED</AppText>
            <AppText style={styles.productTitle} numberOfLines={1}>
              Bio-Cellular Matrix Eye...
            </AppText>
            <AppText style={styles.productDesc} numberOfLines={2}>
              Multi-molecular hyaluronic complex paired with peptide matrix to...
            </AppText>

            {/* Pricing Row */}
            <View style={styles.pricingRow}>
              <AppText style={styles.priceMain}>$38.00</AppText>
              <AppText style={styles.priceOld}>$46.00</AppText>
              <View style={styles.memberDiscountPill}>
                <AppText style={styles.memberDiscountText}>Skin Member -15%</AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Ingredient Bio-Affinity Breakdown Subcard */}
        <View style={styles.affinitySubcard}>
          <View style={styles.affinityHeaderRow}>
            <AppText style={styles.affinityTitle}>INGREDIENT BIO-AFFINITY</AppText>
            <AppText style={styles.affinityRating}>Ultra Optimal</AppText>
          </View>

          {/* 1. Multi-Weight Hyaluronic Acid */}
          <View style={styles.affinityItem}>
            <View style={styles.affinityLabelRow}>
              <AppText style={styles.ingName}>Multi-Weight Hyaluronic Acid</AppText>
              <AppText style={styles.ingEffect}>High (Hydration +42%)</AppText>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: '88%', backgroundColor: '#0B132B' }]} />
            </View>
          </View>

          {/* 2. Copper Tripeptide-1 */}
          <View style={styles.affinityItem}>
            <View style={styles.affinityLabelRow}>
              <AppText style={styles.ingName}>Copper Tripeptide-1</AppText>
              <AppText style={styles.ingEffect}>Medium (Elasticity +29%)</AppText>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: '74%', backgroundColor: '#4F46E5' }]} />
            </View>
          </View>

          {/* 3. Centella Asiatica (Cica) */}
          <View style={styles.affinityItem}>
            <View style={styles.affinityLabelRow}>
              <AppText style={styles.ingName}>Centella Asiatica (Cica)</AppText>
              <AppText style={styles.ingEffect}>Optimal (Redness -35%)</AppText>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: '65%', backgroundColor: '#818CF8' }]} />
            </View>
          </View>
        </View>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Shop Recommended Formula"
            onPress={handleShop}
            style={({ pressed }) => [styles.shopBtn, pressed && { opacity: 0.9 }]}
          >
            <ShoppingBagIcon size={16} color="#FFFFFF" />
            <AppText style={styles.shopBtnText}>Shop Recommended Formula</AppText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Bookmark product"
            onPress={() => setSaved(s => !s)}
            style={({ pressed }) => [
              styles.bookmarkBtn,
              saved && styles.bookmarkBtnSaved,
              pressed && { opacity: 0.8 },
            ]}
          >
            <BookmarkIcon size={18} color={saved ? '#4F46E5' : '#0B132B'} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

// ─── Serum Bottle Vector Graphic ─────────────────────────────────────────────
function SerumBottleGraphic() {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 90 90">
      <Defs>
        <LinearGradient id="bottleGrad" x1="0" y1="0" x2="0" y2="90" gradientUnits="userSpaceOnUse">
          <Stop offset="0%" stopColor="#1E293B" />
          <Stop offset="50%" stopColor="#0B132B" />
          <Stop offset="100%" stopColor="#020617" />
        </LinearGradient>
      </Defs>
      <Rect width="90" height="90" rx="12" fill="url(#bottleGrad)" />
      {/* Dropper Pipette Top */}
      <Rect x="41" y="14" width="8" height="12" rx="3" fill="#64748B" />
      <Rect x="38" y="24" width="14" height="6" rx="2" fill="#E2E8F0" />
      {/* Dark Amber / Navy Glass Bottle */}
      <Rect
        x="32"
        y="30"
        width="26"
        height="42"
        rx="6"
        fill="#1E1B4B"
        stroke="#4F46E5"
        strokeWidth="1.2"
      />
      {/* Droplet glow */}
      <Circle cx="45" cy="52" r="4" fill="#38BDF8" opacity="0.8" />
      <Path d="M45 46L42 51H48L45 46Z" fill="#38BDF8" opacity="0.8" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: Spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0B132B',
    letterSpacing: -0.3,
  },
  scanRefText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 0.6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: Radii.xl,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#F1EFEA',
    gap: 12,
  },
  productRow: {
    flexDirection: 'row',
    gap: 12,
  },
  thumbWrapper: {
    position: 'relative',
    width: 86,
    height: 86,
    borderRadius: 12,
    overflow: 'hidden',
  },
  fitPill: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  fitText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#0B132B',
  },
  productDetailsCol: {
    flex: 1,
    gap: 3,
  },
  targetedTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#6366F1',
    letterSpacing: 0.5,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0B132B',
  },
  productDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  priceMain: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0B132B',
  },
  priceOld: {
    fontSize: 12,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  memberDiscountPill: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  memberDiscountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4F46E5',
  },
  affinitySubcard: {
    backgroundColor: '#FAF7F0',
    borderRadius: Radii.md,
    padding: 12,
    gap: 8,
  },
  affinityHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  affinityTitle: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#0B132B',
    letterSpacing: 0.6,
  },
  affinityRating: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#0B132B',
  },
  affinityItem: {
    gap: 4,
  },
  affinityLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingName: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#0B132B',
  },
  ingEffect: {
    fontSize: 11,
    color: '#64748B',
  },
  track: {
    width: '100%',
    height: 4.5,
    borderRadius: Radii.pill,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: Radii.pill,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 2,
  },
  shopBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0B132B',
    height: 46,
    borderRadius: Radii.md,
    gap: 6,
  },
  shopBtnText: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bookmarkBtn: {
    width: 46,
    height: 46,
    borderRadius: Radii.md,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkBtnSaved: {
    backgroundColor: '#EEF2FF',
    borderColor: '#818CF8',
  },
});
