const GARDEN_ASSET_IMAGES = import.meta.glob("../assets/*.{png,svg}", {
    eager: true,
    import: "default",
});

export const GARDEN_ASSET_IMAGE_MAP = Object.fromEntries(
    Object.entries(GARDEN_ASSET_IMAGES).map(([path, src]) => {
        const filename = path.split("/").pop() || "";
        const id = filename.replace(/\.(png|svg)$/i, "");
        return [id, src];
    })
);

export const GARDEN_TIPS = [
    "Each check-in earns 10 points.",
    "Each week streak earns an extra 10 points.",
];
