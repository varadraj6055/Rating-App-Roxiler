import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net-bs5'; // DataTables for Bootstrap 5

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState(null);
  const tableRef = useRef();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get('https://store-rate-app.onrender.com/api/stores', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });

        // Fetch user ratings for each store
        const storesWithUserRatings = await Promise.all(
          response.data.map(async (store) => {
            const userRating = await fetchUserRating(store._id);
            return { ...store, userRating };
          })
        );

        setStores(storesWithUserRatings);
        setLoading(false);

        // Initialize DataTable after data is set
        if ($.fn.dataTable.isDataTable(tableRef.current)) {
          $(tableRef.current).DataTable().destroy();
        }
        $(tableRef.current).DataTable();
      } catch (err) {
        setError('Error fetching stores. Please try again.');
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const fetchUserRating = async (storeId) => {
    try {
      const response = await axios.get(`https://store-rate-app.onrender.com/api/stores/${storeId}/rating`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Send the token for authentication
        },
      });
      return response.data.userRating || 'N/A'; // Use the API's userRating
    } catch (error) {
      console.error('Error fetching user rating:', error);
      return 'N/A';
    }
  };

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleRatingSubmit = async (storeId) => {
    try {
      const response = await axios.post(
        `https://store-rate-app.onrender.com/api/stores/${storeId}/rate`,
        { rating },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      // Get the updated user rating and average rating from the backend response
      const { userRating, averageRating } = response.data;

      // Update the store in the state with the new user rating and average rating
      const updatedStores = stores.map(store => 
        store._id === storeId ? { ...store, userRating, averageRating } : store
      );

      setStores(updatedStores); // Update the store list with the new ratings
      setRating(0);
      setSelectedStoreId(null);

      // Reinitialize the DataTable with the new data
      if ($.fn.dataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable();
    } catch (err) {
      setRatingError('Error submitting rating. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading stores...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Store Listings</h2>
      
      {/* Table using Bootstrap and DataTables */}
      <table ref={tableRef} className="table table-striped table-bordered darkTable">
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Average Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {stores.length === 0 ? (
            <tr>
              <td colSpan="5">No stores available.</td>
            </tr>
          ) : (
            stores.map((store) => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>
                  {store.averageRating !== undefined
                    ? store.averageRating.toFixed(2)
                    : 'No ratings yet'}
                </td>
                <td>{store.userRating || 'N/A'}</td>
                <td>
                  {selectedStoreId === store._id ? (
                    <div>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={handleRatingChange}
                        placeholder="Rate 1 to 5"
                      />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => handleRatingSubmit(store._id)}
                      >
                        Submit Rating
                      </button>
                      {ratingError && <div className="text-danger">{ratingError}</div>}
                    </div>
                  ) : (
                    <button
                      className="btn btn-secondary"
                      onClick={() => setSelectedStoreId(store._id)}
                    >
                      Rate this store
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;