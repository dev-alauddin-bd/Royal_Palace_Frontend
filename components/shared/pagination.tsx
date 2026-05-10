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
    <div className="flex justify-center flex-wrap gap-4 mt-16">
      {/* ===== Previous Page Button ===== */}
      <Button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="bg-royal-gold text-royal-blue hover:bg-royal-gold-dark hover:text-white rounded-none w-12 h-12"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      {/* ===== Page Number Buttons ===== */}
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        const isActive = page === pageNumber;

        return (
          <Button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`w-12 h-12 text-xs font-bold tracking-widest rounded-none transition-all duration-300 ${
              isActive
                ? 'bg-royal-gold text-royal-blue shadow-lg'
                : 'border border-royal-gold/20 text-royal-gold bg-transparent hover:border-royal-gold'
            }`}
          >
            {pageNumber}
          </Button>
        );
      })}

      {/* ===== Next Page Button ===== */}
      <Button
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="bg-royal-gold text-royal-blue hover:bg-royal-gold-dark hover:text-white rounded-none w-12 h-12"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Pagination;
