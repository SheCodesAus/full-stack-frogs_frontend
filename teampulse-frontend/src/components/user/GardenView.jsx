import "./GardenView.css";
import { GARDEN_ASSETS, GARDEN_TIPS } from "../../assets/gardenAssets";

const hashString = (value) => {
    let hash = 7;
    for (let i = 0; i < value.length; i += 1) {
        hash = (hash * 31 + value.charCodeAt(i)) % 100000;
    }
    return hash;
};

const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

const getAssetPlacement = (id) => {
    const seed = hashString(id);
    return {
        left: 8 + seededRandom(seed) * 84,
        top: 45 + seededRandom(seed + 1) * 30,
        scale: 0.75 + seededRandom(seed + 2) * 0.45,
        rotation: -6 + seededRandom(seed + 3) * 12,
        delay: seededRandom(seed + 4) * 2.5,
    };
};

export default function GardenView({ currentPoints = 0 }) {
    const sortedAssets = [...GARDEN_ASSETS].sort((a, b) => a.points - b.points);
    const nextAsset = sortedAssets.find((asset) => asset.points > currentPoints);
    // Use the latest unlocked asset as the progress baseline (reverse so find hits the highest match).
    const previousAsset =
        [...sortedAssets].reverse().find((asset) => asset.points <= currentPoints) ||
        sortedAssets[0];
    const progress = nextAsset
        ? (currentPoints - previousAsset.points) /
          Math.max(1, nextAsset.points - previousAsset.points)
        : 1;

    const unlockedAssets = sortedAssets.filter(
        (asset) => asset.points <= currentPoints
    );
    const unlockedLandscape = [...unlockedAssets]
        .filter((asset) => asset.type === "landscape")
        .sort((a, b) => b.points - a.points)[0];
    const gardenItems = unlockedAssets.filter(
        (asset) => asset.type === "plant" || asset.type === "animal"
    );
    const visibleGardenItems = gardenItems.filter((asset) => asset.image);

    const landscapeClass = unlockedLandscape
        ? `garden-landscape--${unlockedLandscape.id}`
        : "garden-landscape--base";

    return (
        <div className="user-dashboard-layout garden-view">
            <section className="garden-card garden-summary">
                <div className="garden-summary-header">
                    <div className="garden-summary-text">
                        <p className="garden-eyebrow">Wellbeing Garden</p>
                        <h2 className="garden-title">Growth Balance</h2>
                        <div className="garden-points">
                            <span className="garden-points-number">{currentPoints}</span>
                            <span className="garden-points-label">points</span>
                        </div>
                    </div>
                </div>
                <div className="garden-progress">
                    <div className="garden-progress-bar-row">
                        <div className="garden-progress-bar">
                            <div
                                className="garden-progress-fill"
                                style={{ width: `${Math.min(progress * 100, 100)}%` }}
                            />
                        </div>
                        {nextAsset ? (
                            <div className="garden-next-unlock garden-next-unlock--floating">
                                {nextAsset.image ? (
                                    <img
                                        className="garden-next-unlock-thumb"
                                        src={nextAsset.image}
                                        alt={nextAsset.name}
                                        loading="lazy"
                                        draggable="false"
                                    />
                                ) : null}
                                <div className="garden-next-unlock-info">
                                    <span className="garden-next-unlock-label">
                                        Next unlock
                                    </span>
                                    <span className="garden-next-unlock-name">
                                        {nextAsset.name}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="garden-next-unlock garden-next-unlock--complete garden-next-unlock--floating">
                                All assets unlocked.
                            </div>
                        )}
                    </div>
                    {nextAsset ? (
                        <>
                            <div className="garden-progress-meta">
                                {/* <span className="garden-progress-start">
                                    {previousAsset.points} pts
                                </span> */}
                                <span className="garden-progress-center">
                                    {nextAsset.points - currentPoints} pts to go
                                </span>
                                <span className="garden-progress-end">
                                    {nextAsset.points} pts
                                </span>
                            </div>
                        </>
                    ) : (
                        <div className="garden-progress-meta">
                            <div className="garden-next-unlock garden-next-unlock--complete">
                                All assets unlocked.
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="garden-card garden-canvas-card">
                <div className={`garden-canvas ${landscapeClass}`}>
                    <div className="garden-canvas-sky" />
                    <div className="garden-canvas-ground" />
                    <div className="garden-items">
                        {visibleGardenItems.length === 0 ? (
                            <div className="garden-empty">
                                Your first seed is ready to grow.
                            </div>
                        ) : (
                            visibleGardenItems.map((asset) => {
                                const placement = getAssetPlacement(asset.id);
                                return (
                                    <img
                                        key={asset.id}
                                        src={asset.image}
                                        alt={asset.name}
                                        className={`garden-item-asset garden-item-asset--${asset.type}`}
                                        loading="lazy"
                                        draggable="false"
                                        style={{
                                            left: `${placement.left}%`,
                                            top: `${placement.top}%`,
                                            "--scale": placement.scale,
                                            "--rotation": `${placement.rotation}deg`,
                                            animationDelay: `${placement.delay}s`,
                                        }}
                                    />
                                );
                            })
                        )}
                    </div>
                </div>

                <div className="garden-unlocks">
                    <h3 className="garden-section-title">Upcoming unlocks</h3>
                    <div className="garden-unlock-grid">
                        {sortedAssets.map((asset) => {
                            const isUnlocked = asset.points <= currentPoints;
                            return (
                                <div
                                    key={asset.id}
                                    className={`garden-unlock-card ${
                                        isUnlocked ? "garden-unlock-card--unlocked" : ""
                                    }`}
                                >
                                    {asset.image ? (
                                        <img
                                            className="garden-unlock-thumb"
                                            src={asset.image}
                                            alt={asset.name}
                                            loading="lazy"
                                            draggable="false"
                                        />
                                    ) : (
                                        <div
                                            className="garden-unlock-thumb"
                                            aria-hidden="true"
                                        />
                                    )}
                                    <div className="garden-unlock-info">
                                        <p className="garden-unlock-name">
                                            {asset.name}
                                        </p>
                                        <p className="garden-unlock-type">
                                            {asset.type}
                                        </p>
                                        <p className="garden-unlock-points">
                                            {asset.points} pts
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="garden-card garden-tips">
                <h3 className="garden-section-title">Gardening tips</h3>
                <ul className="garden-tip-list">
                    {GARDEN_TIPS.map((tip) => (
                        <li key={tip} className="garden-tip">
                            {tip}
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
