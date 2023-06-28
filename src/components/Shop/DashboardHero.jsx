import React, { useEffect, useState } from 'react'
import { AiFillShopping, AiOutlineArrowRight, AiOutlineCodeSandbox, AiOutlineMoneyCollect } from 'react-icons/ai'
import styles from '../../styles/style'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersOfShop } from '../../redux/actions/order'
import { getAllProductsShop } from '../../redux/actions/product'
import { Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'

const DashboardHero = () => {
    const dispatch = useDispatch();
    const { orders} = useSelector((state) => state.order);
    const { seller} = useSelector((state) => state.seller);
    const {products} = useSelector((state) => state.products);

    useEffect(()=>{
      dispatch(getAllOrdersOfShop(seller._id));
      dispatch(getAllProductsShop(seller._id));

    },[dispatch])

    const availableBalance = seller?.availableBalance.toFixed(2);

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 130,
          flex: 0.7,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 130,
          flex: 0.7,
        },
    
        {
          field: "total",
          headerName: "Total",
          type: "number",
          minWidth: 130,
          flex: 0.8,
        },
    
        {
          field: " ",
          flex: 1,
          minWidth: 150,
          headerName: "",
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <>
                <Link to={`/order/${params.id}`}>
                  <Button>
                    <AiOutlineArrowRight size={20} />
                  </Button>
                </Link>
              </>
            );
          },
        },
      ];

      const row = [];

      orders && orders.forEach((item) => {
        row.push({
            id: item._id,
            itemsQty: item.cart.length,
            total: "US$ " + item.totalPrice,
            status: item.status,
          });
      })
  return (
    <div className=' w-full p-8'>
        <h3 className=' text-[22px] font-Poppins pb-2'>Overview</h3>
        <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                    <AiOutlineMoneyCollect 
                     size={30}
                     className='mr-2'
                     fill='#00000085'
                    />
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                      Account Balance  <span>(with 10% service charge)</span>
                    </h3>
                </div>
                <h5 className=' pt-2 pl-[36px] text-[22px] font-[500]'>
                    ${availableBalance}
                </h5>
                <Link to="/dashboard-withdraw-money">
                    <h5 className=' pt-2 pl-2 text-[#e729e7] font-[600]'>Withdraw Money</h5>
                </Link>
            </div>
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                    <AiOutlineCodeSandbox 
                     size={30}
                     className='mr-2'
                     fill='#00000085'
                    />
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                      All Orders
                    </h3>
                </div>
                <h5 className=' pt-2 pl-[36px] text-[22px] font-[500]'>
                   {orders && orders.length}
                </h5>
                <Link to="/dashboard-orders">
                    <h5 className=' pt-2 pl-2 text-[#e729e7] font-[600]'>View Orders</h5>
                </Link>
            </div>
            <div className="w-full mb-4 800px:w-[30%] min-h-[20vh] bg-white shadow rounded px-2 py-5">
                <div className="flex items-center">
                    <AiFillShopping 
                     size={30}
                     className='mr-2'
                     fill='#00000085'
                    />
                    <h3 className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}>
                      All Products
                    </h3>
                </div>
                <h5 className=' pt-2 pl-[36px] text-[22px] font-[500]'>
                  {products && products.length}
                </h5>
                <Link to="/dashboard-products">
                    <h5 className=' pt-2 pl-2 text-[#e729e7] font-[600]'>View Products</h5>
                </Link>
            </div>
        </div>
        <br />
        <h3 className=' text-[22px] font-Poppins pb-2'>Latest Orders</h3>
     <div className="w-full min-h-[45vh] bg-white rounded shadow">
    
        <div className=" w-full mx-8 pt-1 mt-10 bg-white">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div>
     
     </div>
    </div>
  )
}

export default DashboardHero