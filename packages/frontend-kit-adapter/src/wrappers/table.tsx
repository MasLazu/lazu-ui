import type {
  TableCellProps,
  TableHeadCellProps,
  TableProps,
  TableRowProps,
  TableSectionProps,
} from "../types";
import {
  Table as LazuTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@maslazu/lazu-ui";
import { forwardRef } from "react";

const Root = forwardRef<HTMLTableElement, TableProps>(function Root(props, ref) {
  return <LazuTable ref={ref} {...props} />;
});

const Header = forwardRef<HTMLTableSectionElement, TableSectionProps>(function Header(props, ref) {
  return <TableHeader ref={ref} {...props} />;
});

const Body = forwardRef<HTMLTableSectionElement, TableSectionProps>(function Body(props, ref) {
  return <TableBody ref={ref} {...props} />;
});

const Row = forwardRef<HTMLTableRowElement, TableRowProps>(function Row(props, ref) {
  return <TableRow ref={ref} {...props} />;
});

const Head = forwardRef<HTMLTableCellElement, TableHeadCellProps>(function Head(props, ref) {
  return <TableHead ref={ref} {...props} />;
});

const Cell = forwardRef<HTMLTableCellElement, TableCellProps>(function Cell(props, ref) {
  return <TableCell ref={ref} {...props} />;
});

export const Table = { Root, Header, Body, Row, Head, Cell };
