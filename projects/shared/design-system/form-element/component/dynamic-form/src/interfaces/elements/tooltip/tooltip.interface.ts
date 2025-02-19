import { TooltipPosition, TooltipTouchGestures } from "@angular/material/tooltip";

export interface Tooltip {
  content: string;
  position?: TooltipPosition;
  /** @see https://material.angular.io/components/tooltip/api */
  touchGesture?: TooltipTouchGestures;
}

export const defaultTooltipPosition: TooltipPosition = 'above';
export const defaultTooltipTouchGesture: TooltipTouchGestures = 'auto';
