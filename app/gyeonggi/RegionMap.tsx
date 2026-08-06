"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

type Props = { label: string; center: [number, number]; zoom?: number };

export default function RegionMap({ label, center, zoom = 14 }: Props) {
  const element = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let map: import("leaflet").Map | undefined;

    async function loadMap() {
      if (!element.current) return;
      const L = await import("leaflet");
      if (disposed || !element.current) return;

      map = L.map(element.current, {
        center,
        zoom,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const icon = L.divIcon({
        className: "regionMarkerWrap",
        html: `<span class="regionMarkerDot" aria-hidden="true"></span><b>${label}</b>`,
        iconSize: [118, 52],
        iconAnchor: [59, 46],
        popupAnchor: [0, -44],
      });

      L.marker(center, { icon, title: `${label} 배관 상담 지역` })
        .addTo(map)
        .bindPopup(`<div class="mapPopup"><strong>${label} 배관 상담</strong><span>싱크대·변기·하수구막힘 / 고압세척</span><a href="tel:16681321">1668-1321 전화하기</a></div>`)
        .openPopup();
    }

    loadMap();
    return () => { disposed = true; map?.remove(); };
  }, [center, label, zoom]);

  return <div className="regionMapShell"><div ref={element} className="regionLocalMap" aria-label={`${label} 위치 지도`} /><p>지도는 {label}의 행정구역 중심 위치를 표시합니다. 실제 출동 가능 시간은 전화로 안내합니다.</p></div>;
}
