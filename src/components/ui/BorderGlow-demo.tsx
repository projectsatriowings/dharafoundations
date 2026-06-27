import BorderGlow from "./BorderGlow";

export function BorderGlowDemo() {
  return (
    <div className="p-8 flex justify-center items-center min-h-[400px]">
      <BorderGlow
        edgeSensitivity={30}
        glowColor="36 90 55"
        backgroundColor="#00322B"
        borderRadius={36}
        glowRadius={40}
        glowIntensity={1.2}
        coneSpread={25}
        animated={true}
        colors={["#FFD27F", "#f49b33", "#8a5000"]}
      >
        <div style={{ padding: "3em", textAlign: "center", color: "#FFFFFF" }}>
          <h2 className="text-3xl font-bold mb-2">Divine Heritage</h2>
          <p className="text-saffron-glow">Hover near the edges to see our theme border glow.</p>
        </div>
      </BorderGlow>
    </div>
  );
}
