const GARDEN_ASSET_IMAGES = import.meta.glob("../assets/*.{png,svg}", {
    eager: true,
    import: "default",
});

const GARDEN_ASSET_IMAGE_MAP = Object.fromEntries(
    Object.entries(GARDEN_ASSET_IMAGES).map(([path, src]) => {
        const filename = path.split("/").pop() || "";
        const id = filename.replace(/\.(png|svg)$/i, "");
        return [id, src];
    })
);

const BASE_GARDEN_ASSETS = [
    { id: "seed", name: "Seed", type: "plant", points: 0 },
    { id: "grass-shoot", name: "Grass Shoot", type: "plant", points: 50 },
    { id: "wildflower", name: "Wildflower", type: "plant", points: 100 },
    { id: "quokka", name: "Quokka", type: "animal", points: 200 },
    { id: "wattle-bloom", name: "Wattle Bloom", type: "plant", points: 300 },
    { id: "bottlebrush", name: "Bottlebrush", type: "plant", points: 400 },
    { id: "gum-tree", name: "Gum Tree", type: "plant", points: 500 },
    { id: "rainbow-lorikeet", name: "Rainbow Lorikeet", type: "animal", points: 700 },
    { id: "australian-landscape", name: "Australian Landscape", type: "landscape", points: 1100 },
    { id: "kangaroo", name: "Kangaroo", type: "animal", points: 1300 },
    { id: "living-garden", name: "Living Garden", type: "landscape", points: 1500 },
    { id: "koala", name: "Koala", type: "animal", points: 1900 },
];

export const GARDEN_ASSETS = BASE_GARDEN_ASSETS.map((asset) => ({
    ...asset,
    image: GARDEN_ASSET_IMAGE_MAP[asset.id] || null,
}));

export const GARDEN_TIPS = [
    "Each check-in earns 10 points.",
    "Each week streak earns an extra 10 points.",
];
