import "./GardenView.css";
import { GARDEN_ASSETS } from "../../data/gardenAssets";

const GARDEN_TIPS = [
    "Each check-in earns 10 points.",
    "Each week streak earns an extra 10 points.",
];

export default function GardenView() {
    const currentPoints = 140;
    const sortedAssets = [...GARDEN_ASSETS].sort((a, b) => a.points - b.points);
    const nextAsset = sortedAssets.find((asset) => asset.points > currentPoints);
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

    const landscapeClass = unlockedLandscape
        ? `garden-landscape--${unlockedLandscape.id}`
        : "garden-landscape--base";

    return (
        <div className="user-dashboard-layout garden-view">
            <section className="garden-card garden-summary">
                <div className="garden-summary-header">
                    <div>
                        <p className="garden-eyebrow">Wellbeing Garden</p>
                        <h2 className="garden-title">Your current points</h2>
                    </div>
                    <div className="garden-points">
                        <span className="garden-points-number">{currentPoints}</span>
                        <span className="garden-points-label">points</span>
                    </div>
                </div>
                <div className="garden-progress">
                    <div className="garden-progress-bar">
                        <div
                            className="garden-progress-fill"
                            style={{ width: `${Math.min(progress * 100, 100)}%` }}
                        />
                    </div>
                    <div className="garden-progress-meta">
                        {nextAsset ? (
                            <>
                                <span>
                                    Next unlock: {nextAsset.name} ({nextAsset.points} pts)
                                </span>
                                <span>{nextAsset.points - currentPoints} pts to go</span>
                            </>
                        ) : (
                            <span>All assets unlocked.</span>
                        )}
                    </div>
                </div>
            </section>

            <section className="garden-card garden-canvas-card">
                <div className={`garden-canvas ${landscapeClass}`}>
                    <div className="garden-canvas-sky" />
                    <div className="garden-canvas-ground" />
                    <div className="garden-items">
                        {gardenItems.length === 0 ? (
                            <div className="garden-empty">
                                Your first seed is ready to grow.
                            </div>
                        ) : (
                            gardenItems.map((asset) => (
                                <div
                                    key={asset.id}
                                    className={`garden-item garden-item--${asset.type}`}
                                >
                                    <div className="garden-item-icon" />
                                    <span className="garden-item-name">{asset.name}</span>
                                </div>
                            ))
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
                                    <div className="garden-unlock-thumb" />
                                    <div className="garden-unlock-info">
                                        <p className="garden-unlock-name">{asset.name}</p>
                                        <p className="garden-unlock-type">{asset.type}</p>
                                        <p className="garden-unlock-points">
                                            {isUnlocked ? "Unlocked" : `${asset.points} pts`}
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
