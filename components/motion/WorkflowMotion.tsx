"use client";

import { type RefObject } from "react";
import { useWorkflowCycle } from "./useWorkflowCycle";
import { useArrowsLoop } from "./useArrowsLoop";

type Props = {
  scope: RefObject<HTMLElement>;
};

/**
 * Orquestra o motion do Workflow:
 *  - useWorkflowCycle: cycle scroll-tied entre 4 estados (block-flow + ícone
 *    + lift do block-image-workflow + "[0X]" no badge)
 *  - useArrowsLoop: as 3 setas ">" no badge piscam ciclicamente
 */
export default function WorkflowMotion({ scope }: Props) {
  useWorkflowCycle(scope);
  useArrowsLoop(scope);
  return null;
}
