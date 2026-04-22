import { defineConfig, createLogger, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readFile } from "node:fs/promises";
import path from "node:path";

const logger = createLogger();
const originalWarn = logger.warn;
logger.warn = (msg, options) => {
    if (
        msg.includes("Failed to load source map") &&
        msg.includes("@fintatech/fintachart")
    )
        return;
    originalWarn(msg, options);
};

// FintaChart ships HTML fragments (dialog bodies) under node_modules/@fintatech/fintachart/htmldialogs/.
// Vite's default HTML transform treats every .html response as a full document and prepends the HMR /
// React-Refresh client scripts. Those extra <script> nodes become the first children when the lib calls
// DomUtils.createElement(html), so dialog queries like querySelector("#tcdInstrumentSearchDialog") return
// null and modals / instrument search silently fail. Serve the raw file instead.
function rawFintaChartHtml(): Plugin {
    const prefix = "/node_modules/@fintatech/fintachart/htmldialogs/";
    return {
        name: "fintachart-raw-htmldialogs",
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                const url = req.url?.split("?")[0];
                if (!url || !url.startsWith(prefix) || !url.endsWith(".html"))
                    return next();
                try {
                    const filePath = path.join(server.config.root, url);
                    const body = await readFile(filePath, "utf-8");
                    res.setHeader("Content-Type", "text/html; charset=utf-8");
                    res.end(body);
                } catch (err) {
                    next(err);
                }
            });
        },
    };
}

export default defineConfig({
    customLogger: logger,
    plugins: [react(), rawFintaChartHtml()],
    server: {
        fs: {
            allow: [".", "node_modules/@fintatech/fintachart"],
        },
    },
    optimizeDeps: {
        exclude: ["@fintatech/fintachart"],
    },
});
