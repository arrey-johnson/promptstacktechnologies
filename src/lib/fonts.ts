/**
 * Eurostile typography integration (next/font/local).
 *
 * TODO_ASSET: Licensed Eurostile webfont files are not yet present.
 * Place owner-supplied files under `src/assets/fonts/` (see README there),
 * then replace this module with the localFont configuration below.
 *
 * Do not download Eurostile from unofficial sources.
 * Do not commit unlicensed font binaries.
 */

export const eurostileVariableClassName = "";

/**
 * Prepared production configuration — enable when licensed files exist:
 *
 * import localFont from "next/font/local";
 *
 * export const eurostile = localFont({
 *   src: [
 *     {
 *       path: "../assets/fonts/Eurostile-Regular.woff2",
 *       weight: "400",
 *       style: "normal",
 *     },
 *     {
 *       path: "../assets/fonts/Eurostile-Medium.woff2",
 *       weight: "500",
 *       style: "normal",
 *     },
 *     {
 *       path: "../assets/fonts/Eurostile-Bold.woff2",
 *       weight: "700",
 *       style: "normal",
 *     },
 *   ],
 *   variable: "--font-eurostile",
 *   display: "swap",
 *   fallback: ["Arial", "sans-serif"],
 * });
 *
 * export const eurostileVariableClassName = eurostile.variable;
 */

/** Development / interim stack until licensed files are supplied. */
export const eurostileFallbackStack = "Eurostile, Arial, sans-serif";
