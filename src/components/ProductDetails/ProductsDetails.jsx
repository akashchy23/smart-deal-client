import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Authcontext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const ProductsDetails = () => {
    const { _id: productID } = useLoaderData()
    const { user,loading } = use(Authcontext)
    const [bids, setBids] = useState([])
    useEffect(() => {
        // if(!user?.accessToken) return
        if(!user) return;
        fetch(`http://localhost:3000/products/bids/${productID}`,{
           headers:{
                    authorization: `Bearer ${user?.accessToken}`
                }
        })
            .then(res => res.json())
            .then(data => {
                console.log('bids for this product', data)
                setBids(data)
            })
    }, [productID,user])
    
    const bidmodalRef = useRef(null)
    // console.log(product)
    const handleopenBidModal = () => {
        bidmodalRef.current.showModal()
    }
    const handlebidSubmit = (e) => {
        e.preventDefault()
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(productID, name, email, bid)

        const newBid = {
            product: productID,
            buyer_name: name,
            buyer_email: email,
            bid_price: parseInt(bid),
            status: "pending"
        }
        console.log(newBid)

        fetch('http://localhost:3000/bids', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newBid)
        })
            .then(res => res.json())
            .then(data => {
                console.log('after placing the bid', data)
                if (data.insertedId) {
                    bidmodalRef.current.close()

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // add new bid in state mean add instant in ui of web
                    newBid._id = data.insertedId
                    const newBids = [...bids,newBid].sort(
                    (a, b) => a.bid_price - b.bid_price)
                    setBids(newBids)
                }
            })
    }
    return (
        <div>
            {/* product info */}
            <div>

            </div>
            <div>
                <button onClick={handleopenBidModal} className="btn btn-gradient">I want to buy this product</button>

                <dialog ref={bidmodalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">Press ESC key or click the button below to close</p>
                        <form onSubmit={handlebidSubmit}>
                            <fieldset className="fieldset">
                                <label className="label">Name</label>
                                <input type="email" name='name' className="input" readOnly defaultValue={user?.displayName
                                } />
                                <label className="label">Email</label>
                                <input type="email" name='email' className="input" defaultValue={user?.email} />
                                <label className="label">Bids</label>
                                <input type="text" name='bid' className="input" placeholder='Put your bids here' />

                                <button className="btn btn-neutral mt-4">Submit</button>
                            </fieldset>
                        </form>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            {/* bids for product */}
            <div>
                <h1 className='text-5xl'>Bids for this product: <span className='text-primary'>{bids.length}</span></h1>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>SL No. </th>
                                <th>Buyer Name </th>
                                <th>Buyer Email</th>
                                <th>Bid price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                           loading? <p>Loading........</p>
                            :  bids.map((bid,index)=><tr>
                                <th> {index+1}</th>
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
                                            <div className="font-bold">{bid.buyer_name}</div>
                                            <div className="text-sm opacity-50">{bid.buyer_email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {bid.buyer_email}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                </td>
                                <td>{bid.bid_price}</td>
                                <th>
                                    <button className="btn btn-ghost btn-xs">{bid.status}</button>
                                </th>
                            </tr>)
                            }
                          
                           
                           
                          
                        </tbody>
                       
                    </table>
                </div>

            </div>
        </div>
    );
};

export default ProductsDetails;