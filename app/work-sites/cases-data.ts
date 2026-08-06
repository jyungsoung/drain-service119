export type WorkCase={slug:string;title:string;area:string;service:string;date:string;summary:string;image:string;details:string[]};

// 새 시공현장은 아래 배열에 한 항목씩 추가하면 목록과 상세 페이지에 함께 표시됩니다.
export const workCases:WorkCase[]=[];
