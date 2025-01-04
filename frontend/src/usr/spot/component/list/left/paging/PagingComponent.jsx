const PagingComponent = ({ currentPage, totalCount, onPageChange }) => {
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // 표시할 페이지 번호 계산 (최대 5개)
    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(1, currentPage - 2);
        let endPage = Math.min(totalPages, startPage + 4);

        // 페이지 범위 조정
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="w-full h-auto my-4">
            <ul className="p-0 space-x-1 flex justify-center list-none">
                {/* 이전 페이지 버튼 */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-full ${
                            currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'hover:bg-emerald-400 hover:text-white'
                        }`}
                    >
                        «
                    </button>
                </li>

                {/* 페이지 번호 */}
                {getPageNumbers().map((pageNum) => (
                    <li key={pageNum}>
                        <button
                            onClick={() => onPageChange(pageNum)}
                            className={`px-4 py-2 rounded-full ${
                                currentPage === pageNum
                                    ? 'bg-emerald-400 text-white'
                                    : 'hover:bg-emerald-400 hover:text-white'
                            }`}
                        >
                            {pageNum}
                        </button>
                    </li>
                ))}

                {/* 다음 페이지 버튼 */}
                <li>
                    <button
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-full ${
                            currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'hover:bg-emerald-400 hover:text-white'
                        }`}
                    >
                        »
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default PagingComponent;