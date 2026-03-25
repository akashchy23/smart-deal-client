import React, { use, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router';
import { Authcontext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const ProductsDetails = () => {
    const { _id: productID } = useLoaderData()
    const [bids,setBids]=useState([])
    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productID}`)
            .then(res => res.json())
            .then(data => {
                console.log('bids for this product', data)
                setBids(data)
            })
    }, [productID])
    const { user } = use(Authcontext)
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

            </div>
        </div>
    );
};

export default ProductsDetails;