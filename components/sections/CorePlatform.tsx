"use client";

import { useRef } from "react";
import { BarChart3, Link2, RefreshCw, ShieldCheck } from "lucide-react";
import { site } from "@/content/site";

const productIcons = [BarChart3, Link2, RefreshCw, ShieldCheck] as const;

/**
 * Core Platform — pinned scroll section (height: 1200vh; inner wrapper sticky).
 * Estrutura espelhada do Quantara `section#product.tracks.product`:
 *
 *   tracks.product (1200vh)
 *   └── wrapper-sections (sticky, 100vh)
 *       └── wrapper-frame → main-container → wrapper-padding → wrapper-product
 *           ├── title-product (20vh)
 *           │   ├── block-title-product.v1 → block-animation (4 "+") + scramble "SOBRE"
 *           │   └── block-title-product.v2 → 2-line medium-big-text
 *           ├── content-product
 *           │   ├── wrapper-content-product.v1 → 4 logo-circle-product (01-04 + connectors)
 *           │   ├── wrapper-content-product.v2 → wrapper-block-product (4 iso blocks)
 *           │   └── wrapper-content-product.v3 → 4 cycling titles/descs
 *           └── trigger-wrapper-v1 → 4 trigger-contrast scroll zones
 *
 * Estado inicial: state v1 visível, estados v2-v4 com opacity:0
 * (motion via ScrollTrigger no Passo 2 cicla entre os 4 estados).
 */
export default function CorePlatform() {
  const { corePlatform } = site;
  const scopeRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={scopeRef}
      id="product"
      className="tracks product"
    >
      <div className="wrapper-sections">
        <div className="wrapper-frame">
          <div className="main-container w-container">
            <div className="wrapper-padding">
              <div className="wrapper-product">
                {/* Title row (20vh) */}
                <div className="title-product">
                  <div className="block-title-product v1">
                    <div className="block-animation" aria-hidden>
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="block-mins">
                          {[1, 2, 3, 4].map((j) => (
                            <div
                              key={j}
                              className={`medium-text anim-v${j}`}
                            >
                              +
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="wrapper-scramble-product">
                      <div className="scramble v1">{corePlatform.eyebrow}</div>
                    </div>
                  </div>
                  <div className="block-title-product v2">
                    <div className="medium-big-text v1">
                      {corePlatform.title_line1}
                    </div>
                    <div className="medium-big-text v2">
                      {corePlatform.title_line2}
                    </div>
                  </div>
                </div>

                {/* Main content (3 columns) */}
                <div className="content-product">
                  {/* Col 1: numbered circles + connectors */}
                  <div className="wrapper-content-product v1">
                    <div className="block-logo-circle-product">
                      {corePlatform.items.map((item, i) => (
                        <div key={item.number} className="contents-wrap">
                          <div className={`logo-circle-product v${i + 1}`}>
                            <div
                              className={`small-text secondary v${i + 1}`}
                            >
                              {item.number}
                            </div>
                          </div>
                          {i < corePlatform.items.length - 1 && (
                            <div className="circle-logo" aria-hidden />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Col 2: isometric blocks (4 blocks in diamond layout) */}
                  <div className="wrapper-content-product v2">
                    <div className="wrapper-block-product">
                      {/* Top block (v1) */}
                      <div className="block-image-product v1">
                        <div className="block-image-product img" aria-hidden />
                        <div className="icon-product v1" aria-hidden>
                          <BarChart3
                            className="h-full w-full"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>

                      {/* Middle row: v3 left + v2 right */}
                      <div className="wrapper-block-image-product">
                        <div className="block-image-product v3">
                          <div
                            className="block-image-product img"
                            aria-hidden
                          />
                          <div className="icon-product v3" aria-hidden>
                            <RefreshCw
                              className="h-full w-full"
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>
                        <div className="block-image-product v2">
                          <div
                            className="block-image-product img"
                            aria-hidden
                          />
                          <div className="icon-product v2" aria-hidden>
                            <Link2
                              className="h-full w-full"
                              strokeWidth={1.5}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Bottom block (v4) */}
                      <div className="block-image-product v4">
                        <div className="block-image-product img" aria-hidden />
                        <div className="icon-product v4" aria-hidden>
                          <ShieldCheck
                            className="h-full w-full"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Col 3: cycling titles + descriptions */}
                  <div className="wrapper-content-product v3">
                    <div className="wrapper-block-content-product">
                      <div className="block-content-product">
                        {corePlatform.items.map((item, i) => (
                          <div
                            key={item.label}
                            className={`small-text align-right animation-v${i + 1}`}
                          >
                            {item.label}
                          </div>
                        ))}
                      </div>
                      <div className="block-content-title-product">
                        {corePlatform.items.map((item, i) => (
                          <div
                            key={item.title}
                            className={`medium-big-text color-gradient animated-v${i + 1}`}
                          >
                            {item.title}
                          </div>
                        ))}
                      </div>
                      <div className="block-content-desc-products">
                        <div className="block-content-desc-product">
                          <div className="wrapper-content-desc-product">
                            {corePlatform.items.map((item, i) => (
                              <div
                                key={item.description}
                                className={`scramble v1 animated-v${i + 1}`}
                              >
                                {item.description}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scroll trigger zones (invisible) */}
                <div className="trigger-wrapper-v1" aria-hidden>
                  <div className="trigger-contrast v1" />
                  <div className="trigger-contrast v2" />
                  <div className="trigger-contrast v3" />
                  <div className="trigger-contrast v4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
