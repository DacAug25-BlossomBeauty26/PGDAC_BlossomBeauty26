import React,{useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import {fetchAllOrdersAdmin, updateOrderStatusAdmin} from "../store/orderSlice";
const OrderManagement = ()=>{

  const dispatch = useDispatch();

  const {orders} = useSelector(state=>state.orders);

  useEffect(()=>{

    dispatch(fetchAllOrdersAdmin());

  },[]);

  return(

    <div>

      <h4>Order Management</h4>

      <table className="table">

        <tbody>

          {orders.map(order=>(

            <tr key={order.orderId}>

              <td>{order.orderId}</td>

              <td>

                <select
                  value={order.status}
                  onChange={(e)=>
                    dispatch(updateOrderStatusAdmin({
                      orderId:order.orderId,
                      status:e.target.value
                    }))
                  }
                >

                  <option>DISPATCHED</option>
                  <option>DELIVERED</option>
                  <option>CANCELLED</option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default OrderManagement;
