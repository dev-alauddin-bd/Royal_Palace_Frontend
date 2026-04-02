// ====================================================
// 🧾 Pagination Component - Navigation for paginated content with previous, page numbers, next buttons
// ====================================================

import React from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface IPaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, setPage }: IPaginationProps) => {
  return (
    <div className="flex justify-center flex-wrap gap-2 mt-10">
      {/* ===== Previous Page Button ===== */}
      <Button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="bg-[#bf9310] text-white hover:bg-[#a87e0d]"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* ===== Page Number Buttons ===== */}
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        const isActive = page === pageNumber;

        return (
          <Button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={
              isActive
                ? 'bg-[#bf9310] text-white hover:bg-[#a87e0d]'
                : 'border border-[#bf9310] text-[#bf9310] bg-white hover:bg-[#fce9b9]'
            }
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* ===== Next Page Button ===== */}
      <Button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="bg-[#bf9310] text-white hover:bg-[#a87e0d]"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default Pagination;
