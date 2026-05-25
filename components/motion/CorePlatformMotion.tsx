"use client";

import { type RefObject } from "react";
import { useCorePlatformCycle } from "./useCorePlatformCycle";
import { useIconBobbing } from "./useIconBobbing";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Orquestra o motion do Core Platform:
 *  - useCorePlatformCycle: cycle scroll-tied entre os 4 estados
 *    (subtitle, big category text, labels, círculo ativo, ícone color)
 *  - useIconBobbing: flutuação Y senoidal infinita dos 4 ícones
 */
export default function CorePlatformMotion({ scope }: Props) {
  useCorePlatformCycle(scope);
  useIconBobbing(scope);
  return null;
}
