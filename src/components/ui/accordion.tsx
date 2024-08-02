import ChevronDown from "@/icons/chevron-down";
import { cn } from "@/lib/utils";
import * as AccordionPrimitives from "@radix-ui/react-accordion";
import React from "react";

const Accordion = AccordionPrimitives.Root;

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Item>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitives.Item
    className={cn("mt-px overflow-hidden first:mt-0", className)}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </AccordionPrimitives.Item>
));

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitives.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitives.Header className="flex">
    <AccordionPrimitives.Trigger
      className={cn(
        "group flex h-[45px] flex-1 cursor-pointer items-center justify-between bg-white px-5 leading-none outline-none",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
      <ChevronDown
        className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
        aria-hidden
      />
    </AccordionPrimitives.Trigger>
  </AccordionPrimitives.Header>
));

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitives.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitives.Content>
>(({ children, className, ...props }, forwardedRef) => (
  <AccordionPrimitives.Content
    className={cn(
      "data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-base",
      className,
    )}
    {...props}
    ref={forwardedRef}
  >
    <div className="p-3">{children}</div>
  </AccordionPrimitives.Content>
));

export { Accordion, AccordionContent, AccordionTrigger, AccordionItem };
