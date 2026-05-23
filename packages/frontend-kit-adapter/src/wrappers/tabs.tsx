import type { TabsProps } from "../types";
import { Tabs as LazuTabs, TabsContent, TabsList, TabsTrigger } from "@maslazu/lazu-ui";

export function Tabs({ value, onValueChange, items }: TabsProps) {
  return (
    <LazuTabs value={value} onValueChange={onValueChange}>
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value} disabled={item.disabled}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </LazuTabs>
  );
}
