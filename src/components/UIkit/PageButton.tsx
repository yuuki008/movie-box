import React from 'react'
import '../../assets/pageButton.css';

interface Props {
    changePage: (page: number) => void,
    page: number,
    total_pages: number,
}

const PageButton: React.FC<Props> = ({changePage, page, total_pages}) => {
    const Page = page.toString()
    const prevPage = (page - 1) <= 0 ? 1 : (page - 1);
    const nextPage = (page + 1) > total_pages ? total_pages : (parseInt(Page, 10) + parseInt('1', 10));
    return (
        <div className="pagination">
          <button
            type="button"
            title="Previous 20 movies"
            onClick={() => changePage(prevPage)}
          >
            Prev
          </button>
          <div>
            {page}
            <span> / </span>
            {total_pages}
          </div>
          <button
            type="button"
            title="Next 20 movies"
            onClick={() => changePage(nextPage)}
          >
            Next
          </button>
        </div>
    )
}

export default PageButton
