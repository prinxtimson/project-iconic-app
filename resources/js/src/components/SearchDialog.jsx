import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const SearchDialog = ({ searchResult, handleOnClose }) => {
    const closeBtnRef = useRef(null);

    return (
        <div
            className="modal fade"
            id="searchModal"
            tabIndex="-1"
            aria-labelledby="searchModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="searchModalLabel">
                            Search Result
                        </h1>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={handleOnClose}
                            ref={closeBtnRef}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <ul className="">
                            {searchResult.pages?.length === 0 &&
                                searchResult.users?.length === 0 &&
                                searchResult.reports?.length === 0 && (
                                    <li>
                                        <p className="px-3">
                                            No search result found
                                        </p>
                                    </li>
                                )}
                            {searchResult.users?.length > 0 && (
                                <li>
                                    <div className="py-2 border-bottom">
                                        <h3>Users</h3>
                                    </div>
                                    <ul>
                                        {searchResult.users?.map(
                                            (result, index) => (
                                                <li key={index} className="">
                                                    <div className="">
                                                        <Link
                                                            to={`#`}
                                                            onClick={() =>
                                                                closeBtnRef.current.click()
                                                            }
                                                        >
                                                            <h4>
                                                                {result.name}
                                                            </h4>
                                                        </Link>
                                                        <p>{result.email}</p>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            )}

                            {searchResult.reports?.length > 0 && (
                                <li>
                                    <div className="py-2 border-bottom">
                                        <h3>Reports</h3>
                                    </div>
                                    <ul>
                                        {searchResult.reports?.map(
                                            (result, index) => (
                                                <li key={index} className="">
                                                    <div className="">
                                                        <Link
                                                            to={`#`}
                                                            onClick={() =>
                                                                closeBtnRef.current.click()
                                                            }
                                                        >
                                                            <h4>
                                                                {result.name}
                                                            </h4>
                                                        </Link>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            )}
                            {searchResult.pages?.length > 0 && (
                                <li>
                                    <div className="py-2 border-bottom">
                                        <h3>Page</h3>
                                    </div>
                                    <ul>
                                        {searchResult.pages?.map(
                                            (result, index) => (
                                                <li key={index} className="">
                                                    <div className="">
                                                        <Link
                                                            to={result.link}
                                                            onClick={() =>
                                                                closeBtnRef.current.click()
                                                            }
                                                        >
                                                            <h4>
                                                                {result.name}
                                                            </h4>
                                                        </Link>
                                                        <p>{result.content}</p>
                                                    </div>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchDialog;
