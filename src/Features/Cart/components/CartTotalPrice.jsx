import React from "react";
import { useSelector } from "react-redux";
import { formartPrice } from "utils/common";
import { Padding } from "../../../../node_modules/@mui/icons-material/index";
import { Box, Typography } from "../../../../node_modules/@mui/material/index";
import { cartTotalSelector } from "../selectors";

function CartTotalPrice(props) {
  const cartTotal = useSelector(cartTotalSelector);
  return (
    <>
      <Box
        component="div"
        sx={{
          display: "flex",
          padding: "20px 2px 40px 2px",
          justifyContent: "space-between",
          borderBottom: "1px solid #666666",
        }}
      >
        <Typography>Tạm tính</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "19px" }}>
          {" "}
          {formartPrice(cartTotal)}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "20px 2px 2px 2px",
        }}
      >
        <Typography>Thành tiền</Typography>
        <Typography sx={{ fontWeight: "bold", fontSize: "24px", color: "red" }}>
          {formartPrice(cartTotal)}
        </Typography>
      </Box>

      <Typography sx={{ color: "#666666",paddingLeft:"43%" }}>(Đã bao gồm VAT nếu có)</Typography>
    </>
  );
}

export default CartTotalPrice;
