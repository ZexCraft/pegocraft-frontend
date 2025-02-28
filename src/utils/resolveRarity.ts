export default function resolveRarity(rarity: number) {
  if (rarity < 30) {
    return "common";
  } else if (rarity < 60) {
    return "Uncommon";
  } else if (rarity < 70) {
    return "Rare";
  } else if (rarity < 85) {
    return "Epic";
  } else if (rarity < 95) {
    return "Legendary";
  } else if (rarity < 100) {
    return "PegoStar";
  } else {
    return "Special Edition";
  }
}
