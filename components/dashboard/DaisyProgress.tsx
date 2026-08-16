import Image from "next/image";

const PETAL_COUNT = 8;

export function DaisyProgress({
  total,
  completed,
  variant,
  label,
  petalCount,
}: {
  total: number;
  completed: number;
  variant: "hero" | "compact" | "chapter";
  label?: string;
  petalCount?: number;
}) {
  const count =
    variant === "compact"
      ? Math.min(12, Math.max(1, Math.round(petalCount ?? PETAL_COUNT)))
      : PETAL_COUNT;
  const filled =
    variant === "compact"
      ? Math.min(count, completed)
      : total > 0
        ? Math.min(PETAL_COUNT, Math.round((completed / total) * PETAL_COUNT))
        : 0;
  const ariaLabel = `${completed} of ${total} questions completed`;

  const petals = Array.from({ length: count }, (_, i) => i < filled);

  return (
    <div
      className={`daisy-progress daisy-progress--${variant}`}
      role="progressbar"
      aria-valuenow={completed}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      <div
        className={
          variant === "compact"
            ? "daisy-progress__row"
            : "daisy-progress__petals"
        }
      >
        {petals.map((isFilled, i) => (
          <span
            key={i}
            className={`daisy-petal${isFilled ? " daisy-petal--filled" : ""}`}
          >
            <Image
              src={
                isFilled
                  ? "/assets/petal-filled.svg"
                  : "/assets/petal-empty.svg"
              }
              alt=""
              width={24}
              height={12}
            />
          </span>
        ))}
      </div>
      {label && (variant === "chapter" || variant === "hero") ? (
        <p className="daisy-progress__label">{label}</p>
      ) : null}
    </div>
  );
}
