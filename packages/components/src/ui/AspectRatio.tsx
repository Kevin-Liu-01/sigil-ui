"use client";

import { type ComponentPropsWithoutRef } from "react";
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

export interface AspectRatioProps extends ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {}

export const AspectRatio = AspectRatioPrimitive.Root;
