"use client";

import { Button } from "@/components/ui/button";
import DaterangePicker from "@/components/ui/daterange-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Filter() {
  const [value, setValue] = useState<string>();

  const handleValueChange = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger asChild>
          <Button>
            {/* <SelectValue>{}</SelectValue> */}
          </Button>
        </SelectTrigger>
        <SelectContent className="w-full" align="end">
          {/* {[].map(() => (
                <SelectItem
                  key={}
                  value={}
                  className={ === ? "font-medium" : ""}
                >
                  {}
                </SelectItem>
              ))} */}
        </SelectContent>
      </Select>
      <DaterangePicker className="w-fit" />
    </>
  );
}
