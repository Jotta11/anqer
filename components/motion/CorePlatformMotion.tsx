"use client";

import { type RefObject } from "react";
import { useCorePlatformCycle } from "./useCorePlatformCycle";
import { useIconScrollLift } from "./useIconScrollLift";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Orquestra o motion do Core Platform:
 *  - useCorePlatformCycle: cycle scroll-tied entre os 4 estados
 *    (subtitle, big category text, labels, círculo ativo, cor do ícone)
 *  - useIconScrollLift: ícone ativo sobe (y: -1.8vw), demais ficam pousados.
 *    Sincronizado com o cycle — quando o estado muda, o ícone "sai" e o
 *    próximo "sobe".
 */
export default function CorePlatformMotion({ scope }: Props) {
  useCorePlatformCycle(scope);
  useIconScrollLift(scope);
  return null;
}
