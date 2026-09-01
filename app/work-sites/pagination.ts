import { workCases } from "./cases-data";

export const WORK_CASES_PER_PAGE = 200;

export function getWorkCasePageCount() {
  return Math.max(1, Math.ceil(workCases.length / WORK_CASES_PER_PAGE));
}

export function getWorkCasePageHref(page: number) {
  return page <= 1 ? "/work-sites" : `/work-sites/page/${page}`;
}

export function getWorkCasesPage(page: number) {
  const start = (page - 1) * WORK_CASES_PER_PAGE;
  return workCases.slice(start, start + WORK_CASES_PER_PAGE);
}

export type PaginationItem = number | "ellipsis-start" | "ellipsis-end";

export function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[] {
  if (totalPages <= 9) return Array.from({ length: totalPages }, (_, index) => index + 1);

  const pages = new Set([1, totalPages]);
  for (let page = currentPage - 2; page <= currentPage + 2; page += 1) {
    if (page > 1 && page < totalPages) pages.add(page);
  }

  const sortedPages = [...pages].sort((a, b) => a - b);
  const items: PaginationItem[] = [];
  sortedPages.forEach((page, index) => {
    const previous = sortedPages[index - 1];
    if (previous && page - previous > 1) items.push(previous === 1 ? "ellipsis-start" : "ellipsis-end");
    items.push(page);
  });
  return items;
}
