// The adventure map: a winding path of stage nodes.
export default function StageMap({ stages, unlockedCount, completed, onSelect }) {
  return (
    <div className="stage-map">
      <h2 className="map-title">🗺️ Your Adventure Map</h2>
      <div className="map-path">
        {stages.map((stage, i) => {
          const isUnlocked = i < unlockedCount
          const isDone = completed.includes(stage.id)
          return (
            <div key={stage.id} className="map-node-wrap">
              <button
                className={`map-node ${isDone ? 'map-done' : isUnlocked ? 'map-open' : 'map-locked'}`}
                style={isUnlocked ? { '--node-color': stage.color } : undefined}
                onClick={() => isUnlocked && onSelect(i)}
                disabled={!isUnlocked}
                aria-label={`Stage ${i + 1}: ${stage.title}${isDone ? ' (completed)' : isUnlocked ? '' : ' (locked)'}`}
              >
                <span className="map-emoji">{isUnlocked ? stage.emoji : '🔒'}</span>
                {isDone && <span className="map-check">✓</span>}
              </button>
              <div className="map-label">
                <span className="map-stage-num">Stage {i + 1}</span>
                {stage.title}
              </div>
              {i < stages.length - 1 && <div className={`map-connector ${i < unlockedCount - 1 || completed.includes(stage.id) ? 'map-connector-lit' : ''}`} />}
            </div>
          )
        })}
      </div>
    </div>
  )
}
