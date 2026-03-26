import React, { use, useEffect, useState } from 'react';
import { Authcontext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const Mybids = () => {
    const { user } = use(Authcontext)
    const [bids, setBids] = useState([])
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setBids(data)
                })
        }
    }, [user?.email])

    const handleDeleteBid = (id) => {
        console.log(id)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed)
                fetch(`http://localhost:3000/bids/${id}`, {
                    method: 'DELETE',

                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('after deleted', data)
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your bid has been deleted.",
                                icon: "success"
                            });

                            // now in Ui instand change
                          const remainingBids = bids.filter(b=> b._id !== id)
                          setBids(remainingBids)
                        }

                    })

        })
    }
    return (
        <div>
            <h2>Bids: {bids.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL No:
                            </th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Bid price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            bids.map((bid, index) => (<tr key={bid._id}>
                                <th>{index + 1} </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>{bid.bid_price}</td>
                                <td>
                                    <div className='badge badge-warning'>
                                        {bid.status}
                                    </div>
                                </td>
                                <th>
                                    <button onClick={() => handleDeleteBid(bid._id)}
                                        className="btn btn-outline btn-xs">Remove Bid</button>
                                </th>
                            </tr>))
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Mybids;