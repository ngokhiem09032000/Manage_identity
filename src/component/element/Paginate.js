import React from 'react';
import ReactPaginate from 'react-paginate';

const Paginate = ({ onPageChange, pageCount, forcePage }) => {
    return (
        <div>
            <ReactPaginate
                breakLabel="..."
                nextLabel={
                    <div className='cursor-pointer border border-gray-500 rounded-full px-4 py-2 transition-transform duration-200 ease-in-out hover:bg-gray-200 text-sm'>
                        next
                    </div>
                }
                previousLabel={
                    <div className='cursor-pointer border border-gray-500 rounded-full px-4 py-2 transition-transform duration-200 ease-in-out hover:bg-gray-200 text-sm'>
                        previous
                    </div>
                }

                onPageChange={onPageChange}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                forcePage={forcePage}
                renderOnZeroPageCount={null}
                containerClassName="flex justify-center mt-6 space-x-2 text-sm"
                // Tạo 1 div bao quanh toàn bộ vùng click và chuyển cursor thành pointer
                pageClassName="px-0 py-2"
                pageLinkClassName="cursor-pointer w-full h-full text-gray-700 font-medium rounded-full border border-gray-500 px-4 py-2 hover:bg-gray-200"
                breakClassName="px-0 py-2"
                breakLinkClassName="cursor-pointer border border-gray-500 rounded-full px-4 py-2 hover:bg-gray-200"
                activeClassName="bg-gray-200 rounded-full"
            />
        </div>
    );
};

export default Paginate;