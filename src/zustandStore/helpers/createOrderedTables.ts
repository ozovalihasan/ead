import { TablesType } from "@/zustandStore"

export const createOrderedTables = (tables: TablesType) => {
  return Object.keys(tables)
}