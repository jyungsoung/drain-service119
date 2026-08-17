"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const neighborhoods = [
  ["미사동", 37.5606, 127.1924],
  ["망월동", 37.5667, 127.1856],
  ["풍산동", 37.5498, 127.2042],
  ["덕풍동", 37.5396, 127.1986],
  ["신장동", 37.5383, 127.2147],
  ["창우동", 37.5393, 127.2271],
  ["천현동", 37.5199, 127.2173],
  ["감북동", 37.5136, 127.1618],
  ["감일동", 37.5078, 127.1607],
  ["위례동", 37.4777, 127.1488],
  ["초이동", 37.5372, 127.1712],
  ["춘궁동", 37.5212, 127.1939],
] as const;

export default function HanamMap() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let map: import("leaflet").Map | undefined;

    async function loadMap() {
      if (!mapElement.current) return;
      const L = await import("leaflet");
      if (disposed || !mapElement.current) return;

      map = L.map(mapElement.current, {
        center: [37.525, 127.19],
        zoom: 12,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      const bounds: [number, number][] = [];
      neighborhoods.forEach(([name, lat, lng]) => {
        bounds.push([lat, lng]);
        const icon = L.divIcon({
          className: "hanamMarkerWrap",
          html: `<span class="hanamMarker" aria-hidden="true"></span><b>${name}</b>`,
          iconSize: [72, 46],
          iconAnchor: [36, 41],
          popupAnchor: [0, -40],
        });
        L.marker([lat, lng], { icon, title: `${name} 출동지역` })
          .addTo(map!)
          .bindPopup(`<div class="mapPopup"><strong>${name} 배관 출동 상담</strong><span>싱크대·하수구·변기 막힘 / 고압세척</span><a href="tel:16681321">1668-1321 전화하기</a></div>`);
      });

      map.fitBounds(bounds, { padding: [34, 34], maxZoom: 13 });
    }

    loadMap();
    return () => {
      disposed = true;
      map?.remove();
    };
  }, []);

  return (
    <div className="mapShell">
      <div ref={mapElement} className="areaMap realMap" aria-label="하남시 주요 출동지역 지도" />
      <p className="mapGuide">지도의 핀을 누르면 해당 동의 출동 상담 정보를 확인할 수 있습니다.</p>
    </div>
  );
}
