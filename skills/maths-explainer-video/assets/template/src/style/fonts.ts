import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Fonts ship with the project (public/fonts, SIL Open Font License), so every
// machine renders identical text. Inter covers the words and numbers; Noto
// Sans Math fills in symbols Inter lacks (√ π ≤ ≥ ≠ → ∠ △ …).
for (const weight of ["400", "700", "800", "900"]) {
  loadFont({
    family: "Inter",
    url: staticFile(`fonts/Inter-${weight}.woff2`),
    weight,
  });
}
loadFont({
  family: "Noto Sans Math",
  url: staticFile("fonts/NotoSansMath-400.woff2"),
  weight: "400",
});

export const fontFamily = "Inter, 'Noto Sans Math', sans-serif";
