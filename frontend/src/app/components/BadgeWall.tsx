import { Badge } from "../data/mockData";

interface BadgeWallProps {
  badges: Badge[];
}

export function BadgeWall({ badges }: BadgeWallProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">徽章展示墙</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
              badge.earned
                ? "bg-gradient-to-br from-yellow-100 to-yellow-200 shadow-md scale-100"
                : "bg-gray-100 opacity-50 grayscale"
            }`}
          >
            <div className="text-4xl mb-2">{badge.icon}</div>
            <p className="text-xs text-center font-medium text-gray-700">
              {badge.title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
