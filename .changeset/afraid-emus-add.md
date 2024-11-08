---
'@osm-traffic-signs/converter': patch
---

Package: Improve handling of access restrictions with modifier_sign|s. They are considered additive whenever the existing value is somethign else than "no" (in which case they replace the no).
