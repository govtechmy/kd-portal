"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useFormatter } from "next-intl";
import * as React from "react";
import { DayPickerBase } from "react-day-picker";

export default function DatePicker({
  label,
  onChange,
  initialDate,
  disabled,
}: {
  label?: string;
  onChange?: (newDate: Date) => void;
  initialDate?: Date;
  disabled?: DayPickerBase["disabled"];
}) {
  const format = useFormatter();
  const [date, setDate] = React.useState<Date | undefined>(initialDate);

  const onSelect = (selectedDay: Date) => {
    setDate(selectedDay);
    if (onChange) onChange(selectedDay);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="secondary"
          className={cn("rounded-full", !date && "text-foreground")}
        >
          {label ? <span className="text-dim-500">{label}</span> : <></>}
          {date ? (
            <span className="font-medium">{format.dateTime(date)}</span>
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(_, selectedDay) => onSelect(selectedDay)}
          initialFocus
          disabled={disabled ? disabled : { after: new Date() }}
        />
      </PopoverContent>
    </Popover>
  );
}
