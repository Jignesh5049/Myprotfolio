import React, { useEffect, useMemo, useRef, useState } from "react";

function ShapeGridBackground({
    direction = "diagonal",
    speed = 1,
    hoverFillColor = "#222",
    shape = "square",
    hoverTrailAmount = 0,
}) {
    const containerRef = useRef(null);
    const [gridSize, setGridSize] = useState({ cols: 0, rows: 0 });
    const [hoveredIndex, setHoveredIndex] = useState(-1);
    const [trail, setTrail] = useState([]);

    const tileSize = 34;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return undefined;

        const calculateGrid = () => {
            const rect = container.getBoundingClientRect();
            const cols = Math.ceil(rect.width / tileSize) + 2;
            const rows = Math.ceil(rect.height / tileSize) + 2;
            setGridSize({ cols, rows });
        };

        calculateGrid();
        const observer = new ResizeObserver(calculateGrid);
        observer.observe(container);

        return () => observer.disconnect();
    }, []);

    const tiles = useMemo(() => {
        const total = gridSize.cols * gridSize.rows;
        return Array.from({ length: total }, (_, i) => i);
    }, [gridSize.cols, gridSize.rows]);

    const handlePointerMove = (event) => {
        const container = containerRef.current;
        if (!container || gridSize.cols === 0) return;

        const rect = container.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const col = Math.min(gridSize.cols - 1, Math.max(0, Math.floor(x / tileSize)));
        const row = Math.min(gridSize.rows - 1, Math.max(0, Math.floor(y / tileSize)));
        const index = row * gridSize.cols + col;

        setHoveredIndex(index);

        if (hoverTrailAmount > 0) {
            setTrail((prev) => {
                const next = [index, ...prev.filter((value) => value !== index)];
                return next.slice(0, hoverTrailAmount);
            });
        }
    };

    const handlePointerLeave = () => {
        setHoveredIndex(-1);
        if (hoverTrailAmount > 0) {
            setTrail([]);
        }
    };

    const getDelay = (index) => {
        const row = Math.floor(index / gridSize.cols);
        const col = index % gridSize.cols;

        if (direction === "diagonal") return (row + col) * 0.02;
        if (direction === "right") return col * 0.03;
        if (direction === "left") return (gridSize.cols - col) * 0.03;
        if (direction === "up") return (gridSize.rows - row) * 0.03;
        if (direction === "down") return row * 0.03;
        return 0;
    };

    return (
        <div
            ref={containerRef}
            className="shape-grid-bg"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            aria-hidden="true"
        >
            <div
                className="shape-grid-bg-inner"
                style={{
                    animationDuration: `${Math.max(8, 16 / Math.max(0.2, speed))}s`,
                }}
            >
                {tiles.map((index) => {
                    const isHovered = index === hoveredIndex;
                    const trailIndex = trail.indexOf(index);
                    const isInTrail = trailIndex >= 0;
                    const trailOpacity = isInTrail && hoverTrailAmount > 0
                        ? (hoverTrailAmount - trailIndex) / (hoverTrailAmount + 1)
                        : 0;

                    return (
                        <span
                            key={index}
                            className={`shape-grid-tile ${shape === "square" ? "is-square" : "is-square"}`}
                            style={{
                                animationDelay: `${getDelay(index)}s`,
                                backgroundColor: isHovered
                                    ? hoverFillColor
                                    : isInTrail
                                        ? hoverFillColor
                                        : "transparent",
                                opacity: isHovered ? 0.95 : isInTrail ? Math.max(0.2, trailOpacity) : undefined,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default ShapeGridBackground;