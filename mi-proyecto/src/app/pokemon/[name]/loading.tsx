"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function LoadingPokemon() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        backgroundColor: "#0f172a",
        color: "#e2e8f0",
      }}
    >
      <Skeleton circle width={120} height={120} />
      <Skeleton width={100} height={20} style={{ marginTop: 20 }} />
      <Skeleton width={80} height={16} style={{ marginTop: 8 }} />
      <Skeleton width={80} height={16} style={{ marginTop: 4 }} />
    </div>
  );
}
