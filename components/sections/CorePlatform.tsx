"use client";

import { useRef, Fragment } from "react";
import { site } from "@/content/site";

/**
 * Core Platform — pinned scroll section (1200vh, inner sticky 100vh).
 *
 * Layout (verificado via screenshots da referência):
 *
 *   ┌─────────────────────────────────────────────────────────┐
 *   │ [4×4 + grid]        [SOBRE]    [subtitle 2 linhas]      │
 *   │                                                          │
 *   │ [01]                                       [BIG]         │
 *   │  │                                       [CATEGORY]      │
 *   │ [02]    [iso tray com 4 blocos 3D]                       │
 *   │  │                                                       │
 *   │ [03]                                                     │
 *   │  │                          [SYSTEM/X  PERFORMANCE/Y]    │
 *   │ [04]                                                     │
 *   └─────────────────────────────────────────────────────────┘
 *
 * Estado inicial: state v1 visível, v2-v4 ocultas via opacity:0
 * (motion no Passo 2 fará o cycle entre as 4 estados conforme scroll).
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
                {/* TITLE ROW (top 20vh) */}
                <div className="title-product">
                  <div className="block-title-product v1">
                    <div className="block-animation" aria-hidden>
                      {/* 4 columns × 4 rows (anim-v# = row index) */}
                      {[1, 2, 3, 4].map((col) => (
                        <div key={col} className="block-mins">
                          {[1, 2, 3, 4].map((row) => (
                            <div key={row} className={`medium-text anim-v${row}`}>
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
                  {/* v2: subtitle CYCLING (top right, 2 lines small-text) */}
                  <div className="block-title-product v2">
                    {corePlatform.items.map((item, i) => (
                      <div
                        key={item.number}
                        className={`subtitle-cycling animation-v${i + 1}`}
                      >
                        <div className="small-text align-right">
                          {item.subtitle_line1}
                        </div>
                        <div className="small-text align-right">
                          {item.subtitle_line2}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* MAIN CONTENT (3 cols) */}
                <div className="content-product">
                  {/* Col 1: vertical numbered circles */}
                  <div className="wrapper-content-product v1">
                    <div className="block-logo-circle-product">
                      {corePlatform.items.map((item, i) => (
                        <Fragment key={item.number}>
                          <div
                            className={`logo-circle-product v${i + 1}${i === 0 ? " active" : ""}`}
                          >
                            <div className={`small-text secondary v${i + 1}`}>
                              {item.number}
                            </div>
                          </div>
                          {i < corePlatform.items.length - 1 && (
                            <div className="circle-logo" aria-hidden />
                          )}
                        </Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Col 2: iso tray */}
                  <div className="wrapper-content-product v2">
                    <div className="wrapper-block-product">
                      <div className="block-image-product v1">
                        <div className="block-image-product img" aria-hidden />
                        <div className="icon-product v1" aria-hidden />
                      </div>
                      <div className="wrapper-block-image-product">
                        <div className="block-image-product v3">
                          <div className="block-image-product img" aria-hidden />
                          <div className="icon-product v3" aria-hidden />
                        </div>
                        <div className="block-image-product v2">
                          <div className="block-image-product img" aria-hidden />
                          <div className="icon-product v2" aria-hidden />
                        </div>
                      </div>
                      <div className="block-image-product v4">
                        <div className="block-image-product img" aria-hidden />
                        <div className="icon-product v4" aria-hidden />
                      </div>
                    </div>
                  </div>

                  {/* Col 3: big category + labels (cycling) */}
                  <div className="wrapper-content-product v3">
                    <div className="block-content-title-product">
                      {corePlatform.items.map((item, i) => (
                        <div
                          key={item.category}
                          className={`medium-big-text color-gradient animated-v${i + 1}`}
                        >
                          {item.category}
                        </div>
                      ))}
                    </div>

                    <div className="block-content-desc-products">
                      {(["system", "performance"] as const).map((key) => (
                        <div key={key} className="block-content-desc-product">
                          <div className="wrapper-content-desc-product">
                            {corePlatform.items.map((item, i) => (
                              <div
                                key={item.number}
                                className={`scramble v1 animated-v${i + 1}`}
                              >
                                <div className="label-name">
                                  {item.labels[key].name}
                                </div>
                                <div className="label-value">
                                  {item.labels[key].value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scroll trigger zones */}
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
