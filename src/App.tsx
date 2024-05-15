import ReactPaginate from "react-paginate";
import "./styles/pagination.styles.css";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

function App() {
  const [comments, setComments] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const handlePageClick = (data: { selected: number }) => {
    const selected = data.selected + 1;
    getComments(selected);
  };

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async (page: number = 1, limit: number = 12) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${limit}`
    );
    const data = await response.json();
    const total = Number(response.headers.get("X-Total-Count")); // Convert total to a number
    setPageCount(Math.ceil(total / 12));
    setComments(data);
  };

  return (
    <div className="p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {comments.map((comment: any) => (
          <div
            key={comment.id}
            className="bg-white p-4 rounded shadow"
          >
            <h5 className="text-lg font-bold">{comment.name}</h5>
            <p className="text-gray-500">{comment.body}</p>
          </div>
        ))}
      </div>

      <ReactPaginate
        className="flex justify-center mt-5"
        previousLabel={<ArrowLeft size={14} />}
        nextLabel={<ArrowRight size={14} />}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"right-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"left-link"}
        breakLinkClassName={"break-link"}
        activeClassName={"active-link"}
      />
    </div>
  );
}

export default App;
