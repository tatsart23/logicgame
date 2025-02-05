import { useState, useRef, useEffect } from "react";

const useGolfLogic = () => {
  const [ball, setBall] = useState({ x: 100, y: 100, vx: 0, vy: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(null);
  const [dragEnd, setDragEnd] = useState(null);
  const [isMoving, setIsMoving] = useState(false);
  const requestRef = useRef();
  const svgRef = useRef(null);
  
  // Esteet (x, y, leveys, korkeus)
  const obstacles = [
    { x: 200, y: 50, width: 20, height: 100 },
    { x: 300, y: 150, width: 50, height: 20 }
  ];

  // Reiän sijainti
  const hole = { x: 450, y: 250, radius: 11 };

  // Muuntaa hiiren sijainnin suhteelliseksi SVG-alueeseen
  const getMousePos = (e) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  // Tarkistaa, osuuko pallo esteeseen
  const checkObstacleCollision = (newX, newY, vx, vy) => {
    for (let obstacle of obstacles) {
      if (
        newX + 5 > obstacle.x &&
        newX - 5 < obstacle.x + obstacle.width &&
        newY + 5 > obstacle.y &&
        newY - 5 < obstacle.y + obstacle.height
      ) {
        return { vx: -vx, vy: -vy }; // Kimpoaminen esteestä
      }
    }
    return { vx, vy };
  };

  // Tarkistaa, osuuko pallo reikään
  const checkHole = (newX, newY) => {
    const dx = newX - hole.x;
    const dy = newY - hole.y;
    return Math.sqrt(dx * dx + dy * dy) < hole.radius;
  };

  // Pallon liike ja törmäykset
  useEffect(() => {
    const update = () => {
      setBall((prev) => {
        let newX = prev.x + prev.vx;
        let newY = prev.y + prev.vy;
        let newVx = prev.vx * 0.98; // Friktio
        let newVy = prev.vy * 0.98;

        // Tarkistetaan osumat esteisiin
        ({ vx: newVx, vy: newVy } = checkObstacleCollision(newX, newY, newVx, newVy));

        // Seinätörmäykset
        if (newX <= 10 || newX >= 490) newVx = -newVx;
        if (newY <= 10 || newY >= 290) newVy = -newVy;

        // Tarkistetaan, osuuko pallo reikään
        if (checkHole(newX, newY)) {
          return { ...prev, x: hole.x, y: hole.y, vx: 0, vy: 0 };
        }

        return {
          ...prev,
          x: Math.max(10, Math.min(490, newX)),
          y: Math.max(10, Math.min(290, newY)),
          vx: Math.abs(newVx) < 0.1 ? 0 : newVx,
          vy: Math.abs(newVy) < 0.1 ? 0 : newVy,
        };
      });

      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  // Hiiren tapahtumat (sama kuin aiemmin)
  const handleMouseDown = (e) => {
    if (isMoving) return;
    const pos = getMousePos(e);
    setDragStart(pos);
    setDragEnd(pos);
    setIsDragging(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const pos = getMousePos(e);
    setDragEnd(pos);
  };

  const handleMouseUp = (e) => {
    if (e.button !== 0) return;
    if (!dragStart) return;

    const pos = getMousePos(e);
    setDragEnd(pos);

    const forceX = (dragStart.x - pos.x) * 0.2;
    const forceY = (dragStart.y - pos.y) * 0.2;
    const maxForce = 5;

    setBall((prev) => ({
      ...prev,
      vx: Math.max(Math.min(forceX, maxForce), -maxForce),
      vy: Math.max(Math.min(forceY, maxForce), -maxForce),
    }));

    setIsDragging(false);
    setDragStart(null);
    setDragEnd(null);

    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  return {
    ball,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    isDragging,
    dragStart,
    dragEnd,
    isMoving,
    svgRef,
    obstacles,
    hole,
  };
};

export default useGolfLogic;
